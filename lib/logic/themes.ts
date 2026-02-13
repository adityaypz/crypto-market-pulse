import { Headline } from '../sources/rss';

export interface NarrativeTheme {
    theme: string;
    count: number;
}

// Updated theme keywords for v1.1 (excluding asset names)
const THEME_KEYWORDS: Record<string, string[]> = {
    'Regulation': ['regulation', 'sec', 'regulatory', 'compliance', 'legal', 'lawsuit', 'enforcement', 'government', 'policy'],
    'Security': ['hack', 'exploit', 'breach', 'vulnerability', 'attack', 'stolen', 'security', 'scam', 'rug pull', 'audit'],
    'ETF': ['etf', 'exchange traded', 'blackrock', 'grayscale', 'spot etf', 'bitcoin etf'],
    'AI': ['ai', 'artificial intelligence', 'machine learning', 'chatgpt', 'llm', 'neural', 'agent'],
    'L2/ZK': ['layer 2', 'l2', 'scaling', 'rollup', 'optimism', 'arbitrum', 'zk', 'zero knowledge', 'zksync'],
    'RWA': ['rwa', 'real world asset', 'tokenization', 'tokenized', 'treasury', 'bonds'],
    'Meme': ['meme', 'meme coin', 'viral', 'community driven'],
    'Adoption': ['adoption', 'mainstream', 'institutional', 'payment', 'merchant', 'integration'],
    'Funding': ['funding', 'raise', 'investment', 'venture', 'series', 'million', 'billion', 'valuation'],
};

/**
 * Analyze headlines and extract narrative themes
 * Returns top 5 themes by frequency (excludes asset mentions)
 */
export function analyzeThemes(headlines: Headline[]): NarrativeTheme[] {
    const themeCounts = new Map<string, number>();

    // Initialize all themes with 0
    Object.keys(THEME_KEYWORDS).forEach(theme => {
        themeCounts.set(theme, 0);
    });

    // Count theme occurrences
    headlines.forEach(headline => {
        const titleLower = headline.title.toLowerCase();

        Object.entries(THEME_KEYWORDS).forEach(([theme, keywords]) => {
            const hasKeyword = keywords.some(keyword => titleLower.includes(keyword));
            if (hasKeyword) {
                themeCounts.set(theme, (themeCounts.get(theme) || 0) + 1);
            }
        });
    });

    // Convert to array and sort by count
    const themes: NarrativeTheme[] = Array.from(themeCounts.entries())
        .map(([theme, count]) => ({ theme, count }))
        .filter(t => t.count > 0)
        .sort((a, b) => b.count - a.count);

    // Return top 5
    return themes.slice(0, 5);
}

/**
 * Check if a specific theme is in top N
 */
export function isThemeInTop(themes: NarrativeTheme[], themeName: string, topN: number = 3): boolean {
    const topThemes = themes.slice(0, topN);
    return topThemes.some(t => t.theme.toLowerCase() === themeName.toLowerCase());
}
