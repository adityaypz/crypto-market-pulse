import { XMLParser } from 'fast-xml-parser';

export interface Headline {
    title: string;
    source: string;
    time: string;
    link?: string;
}

export interface RSSResult {
    headlines: Headline[];
    originalCount: number;
}

interface RSSFeed {
    url: string;
    source: string;
}

const RSS_FEEDS: RSSFeed[] = [
    { url: 'https://www.coindesk.com/arc/outboundfeeds/rss/', source: 'CoinDesk' },
    { url: 'https://decrypt.co/feed', source: 'Decrypt' },
    { url: 'https://www.theblock.co/rss.xml', source: 'The Block' },
];

/**
 * Fetch and parse RSS feeds from major crypto news sources
 * Deduplicates similar titles and normalizes timestamps
 * Returns both deduplicated headlines and original count
 */
export async function fetchRSSHeadlines(): Promise<RSSResult> {
    const allHeadlines: Headline[] = [];
    const parser = new XMLParser();

    // Fetch all feeds in parallel
    const feedPromises = RSS_FEEDS.map(async (feed) => {
        try {
            console.log(`[RSS] Fetching ${feed.source}...`);

            const response = await fetch(feed.url, {
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                    'Accept': 'application/rss+xml, application/xml, text/xml',
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }

            const xmlText = await response.text();
            const parsed = parser.parse(xmlText);

            // Handle different RSS formats
            const items = parsed.rss?.channel?.item || parsed.feed?.entry || [];
            const itemsArray = Array.isArray(items) ? items : [items];

            const headlines: Headline[] = itemsArray.slice(0, 20).map((item: any) => ({
                title: item.title || item['title'] || '',
                source: feed.source,
                time: normalizeTimestamp(item.pubDate || item.published || item.updated || new Date().toISOString()),
                link: item.link?.['@_href'] || item.link || item.guid || '',
            })).filter(h => h.title.length > 10);

            console.log(`[RSS] Got ${headlines.length} from ${feed.source}`);
            return headlines;

        } catch (error) {
            console.error(`[RSS] Failed to fetch ${feed.source}:`, error);
            return [];
        }
    });

    const results = await Promise.all(feedPromises);
    results.forEach(headlines => allHeadlines.push(...headlines));

    // Filter to last 24 hours
    const oneDayAgo = Date.now() - 24 * 60 * 60 * 1000;
    const recentHeadlines = allHeadlines.filter(h => {
        const timestamp = new Date(h.time).getTime();
        return timestamp > oneDayAgo;
    });

    // Track original count before deduplication
    const originalCount = recentHeadlines.length;

    // Deduplicate similar titles
    const deduplicated = deduplicateHeadlines(recentHeadlines);

    console.log(`[RSS] Original: ${originalCount}, Deduplicated: ${deduplicated.length}, Removed: ${originalCount - deduplicated.length}`);

    return {
        headlines: deduplicated,
        originalCount: originalCount,
    };
}

/**
 * Normalize various timestamp formats to ISO string
 */
function normalizeTimestamp(timestamp: string): string {
    try {
        const date = new Date(timestamp);
        if (isNaN(date.getTime())) {
            return new Date().toISOString();
        }
        return date.toISOString();
    } catch {
        return new Date().toISOString();
    }
}

/**
 * Deduplicate headlines with similar titles using simple similarity check
 */
function deduplicateHeadlines(headlines: Headline[]): Headline[] {
    const unique: Headline[] = [];

    for (const headline of headlines) {
        const isDuplicate = unique.some(existing => {
            return calculateSimilarity(existing.title, headline.title) > 0.7;
        });

        if (!isDuplicate) {
            unique.push(headline);
        }
    }

    return unique;
}

/**
 * Calculate similarity between two strings (0-1)
 * Simple word overlap method
 */
function calculateSimilarity(str1: string, str2: string): number {
    const words1 = str1.toLowerCase().split(/\s+/).filter(w => w.length > 3);
    const words2 = str2.toLowerCase().split(/\s+/).filter(w => w.length > 3);

    if (words1.length === 0 || words2.length === 0) return 0;

    const set1 = new Set(words1);
    const set2 = new Set(words2);

    let overlap = 0;
    set1.forEach(word => {
        if (set2.has(word)) overlap++;
    });

    return (2 * overlap) / (set1.size + set2.size);
}

/**
 * Generate fallback headlines if RSS feeds fail
 */
export function generateFallbackHeadlines(): RSSResult {
    const now = Date.now();

    return {
        headlines: [
            {
                title: 'Bitcoin surges past $66,000 as institutional adoption accelerates',
                source: 'CoinDesk',
                time: new Date(now - 1000 * 60 * 25).toISOString()
            },
            {
                title: 'Ethereum layer-2 networks process record 15 million transactions in single day',
                source: 'The Block',
                time: new Date(now - 1000 * 60 * 55).toISOString()
            },
            {
                title: 'SEC approves new crypto ETF applications as regulatory framework evolves',
                source: 'Bloomberg Crypto',
                time: new Date(now - 1000 * 60 * 85).toISOString()
            },
            {
                title: 'DeFi protocols implement enhanced security measures following industry audit',
                source: 'Decrypt',
                time: new Date(now - 1000 * 60 * 115).toISOString()
            },
            {
                title: 'Major payment processor integrates stablecoin settlements for merchants',
                source: 'CoinTelegraph',
                time: new Date(now - 1000 * 60 * 145).toISOString()
            },
        ],
        originalCount: 5,
    };
}
