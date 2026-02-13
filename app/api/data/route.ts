import { scrapeMarketData } from '../../../lib/sources/market';
import { fetchRSSHeadlines, generateFallbackHeadlines } from '../../../lib/sources/rss';
import { analyzeThemes } from '../../../lib/logic/themes';
import { detectAssetMentions } from '../../../lib/logic/assets';
import { detectMarketRegime } from '../../../lib/logic/regime';
import { calculateVolatility } from '../../../lib/logic/volatility';
import { readCache, writeCache } from '../../../lib/storage/cache';
import { saveSnapshot, getYesterdaySnapshot } from '../../../lib/storage/history';
import { calculateThemeDeltas, calculateAssetDeltas, calculateMarketStateDelta } from '../../../lib/logic/deltas';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const refresh = searchParams.get('refresh') === 'true';

        // Check cache first
        if (!refresh) {
            const cached = await readCache();
            if (cached) {
                return Response.json(cached);
            }
        }

        console.log('[API] Fetching fresh data...');

        try {
            // Fetch data in parallel with timeout
            const timeoutMs = 15000; // 15 second timeout

            const marketDataPromise = Promise.race([
                scrapeMarketData(),
                new Promise((_, reject) =>
                    setTimeout(() => reject(new Error('Market data timeout')), timeoutMs)
                )
            ]);

            const headlinesPromise = Promise.race([
                fetchRSSHeadlines(),
                new Promise((_, reject) =>
                    setTimeout(() => reject(new Error('RSS timeout')), timeoutMs)
                )
            ]).catch(err => {
                console.error('[API] RSS fetch failed, using fallback:', err);
                return generateFallbackHeadlines();
            });

            const [marketData, rssResult] = await Promise.all([
                marketDataPromise,
                headlinesPromise,
            ]) as any;

            const headlines = rssResult.headlines;
            const originalCount = rssResult.originalCount;

            // Analyze data
            const regime = detectMarketRegime(marketData.coins);
            const volatility = calculateVolatility(marketData.coins);
            const themes = analyzeThemes(headlines);
            const assets = detectAssetMentions(headlines);

            // Get yesterday's snapshot for deltas
            const yesterdaySnapshot = getYesterdaySnapshot();

            // Calculate deltas
            const themeDeltas = calculateThemeDeltas(themes, yesterdaySnapshot);
            const assetDeltas = calculateAssetDeltas(assets, yesterdaySnapshot);
            const marketStateDelta = calculateMarketStateDelta(regime.state, yesterdaySnapshot);

            // Count unique sources
            const uniqueSources = new Set(headlines.map((h: any) => h.source)).size;

            // Build response with watchlist
            const data = {
                updatedAt: new Date().toISOString(),
                isStale: false,
                marketState: regime.state,
                marketWhy: regime.why,
                marketStateDelta,
                btcChange: regime.btcChange,
                altMedian: regime.altMedian,
                breadth: regime.breadth,
                volatilityLabel: volatility.label,
                volatilityValue: volatility.value,
                themesTop: themeDeltas,
                assetsTop: assetDeltas,
                watchlist: marketData.watchlist.map((coin: any) => ({
                    symbol: coin.symbol,
                    name: coin.name,
                    change24h: coin.change24h,
                    price: coin.price,
                })),
                headlinesSample: headlines.slice(0, 5),
                credibility: {
                    headlinesAnalyzed: headlines.length,
                    uniqueSources,
                    deduplicated: headlines.length,
                    originalCount: originalCount,
                },
            };

            // Save today's snapshot
            const today = new Date().toISOString().split('T')[0];
            saveSnapshot({
                date: today,
                marketState: regime.state,
                btcChange: regime.btcChange,
                altMedian: regime.altMedian,
                breadth: regime.breadth,
                volatilityValue: volatility.value,
                themes: themes.reduce((acc, t) => ({ ...acc, [t.theme]: t.count }), {}),
                assets: assets.reduce((acc, a) => ({ ...acc, [a.asset]: a.count }), {}),
                headlineCount: headlines.length,
            });

            // Cache the result
            await writeCache(data);

            return Response.json(data);

        } catch (fetchError) {
            console.error('[API] Fetch error, attempting stale cache:', fetchError);

            // Try to serve stale cache
            const staleCache = await readCache(true);
            if (staleCache) {
                console.log('[API] Serving stale cache');
                return Response.json(staleCache);
            }

            throw fetchError;
        }

    } catch (error) {
        console.error('[API] Error:', error);

        return Response.json(
            { error: 'Failed to fetch market data' },
            { status: 500 }
        );
    }
}
