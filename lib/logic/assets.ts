import { Headline } from '../sources/rss';

export interface AssetMention {
    asset: string;
    count: number;
}

// Asset dictionary with tickers and full names
// Now includes watchlist assets and common name variations
const ASSET_DICTIONARY: Record<string, string[]> = {
    'BTC': ['btc', 'bitcoin'],
    'ETH': ['eth', 'ethereum', 'ether'],
    'SOL': ['sol', 'solana'],
    'BNB': ['bnb', 'binance coin', 'binance'],
    'XRP': ['xrp', 'ripple'],
    'ADA': ['ada', 'cardano'],
    'AVAX': ['avax', 'avalanche'],
    'DOT': ['dot', 'polkadot'],
    'MATIC': ['matic', 'polygon'],
    'LINK': ['link', 'chainlink'],
    'UNI': ['uni', 'uniswap'],
    'ATOM': ['atom', 'cosmos'],
    'LTC': ['ltc', 'litecoin'],
    'ARB': ['arb', 'arbitrum'],
    'OP': ['op', 'optimism'],
    'DOGE': ['doge', 'dogecoin'],
    'SHIB': ['shib', 'shiba', 'shiba inu'],
    'PEPE': ['pepe'],
    'APT': ['apt', 'aptos'],
    'SUI': ['sui'],
    'TON': ['ton', 'toncoin', 'the open network'],
    'HYPE': ['hype', 'hyperliquid'],
    'NEAR': ['near', 'near protocol'],
    'FTM': ['ftm', 'fantom'],
    'ALGO': ['algo', 'algorand'],
    'VET': ['vet', 'vechain'],
    'ICP': ['icp', 'internet computer'],
    'FIL': ['fil', 'filecoin'],
    'AAVE': ['aave'],
    'MKR': ['mkr', 'maker'],
};

/**
 * Detect and count asset mentions in headlines
 * Returns top 5 most mentioned assets
 * Now detects both tickers AND full names (e.g., "ripple" → XRP)
 */
export function detectAssetMentions(headlines: Headline[]): AssetMention[] {
    const assetCounts = new Map<string, number>();

    // Initialize counts
    Object.keys(ASSET_DICTIONARY).forEach(asset => {
        assetCounts.set(asset, 0);
    });

    // Count mentions in each headline
    headlines.forEach(headline => {
        const titleLower = headline.title.toLowerCase();

        Object.entries(ASSET_DICTIONARY).forEach(([ticker, keywords]) => {
            const hasMatch = keywords.some(keyword => {
                // Use word boundaries to avoid false matches
                const regex = new RegExp(`\\b${keyword}\\b`, 'i');
                return regex.test(titleLower);
            });

            if (hasMatch) {
                assetCounts.set(ticker, (assetCounts.get(ticker) || 0) + 1);
            }
        });
    });

    // Convert to array and sort by count
    const assetMentions: AssetMention[] = Array.from(assetCounts.entries())
        .map(([asset, count]) => ({ asset, count }))
        .filter(a => a.count > 0)
        .sort((a, b) => b.count - a.count);

    // Return top 5
    return assetMentions.slice(0, 5);
}
