export interface CoinData {
    symbol: string;
    name: string;
    price: number;
    change24h: number;
}

export interface MarketRegime {
    state: 'risk on' | 'neutral' | 'risk off';
    why: string;
    btcChange: number;
    altMedian: number;
    breadth: number;
}

/**
 * Detect market regime with enhanced breadth calculation
 * Now uses top 100 coins for better accuracy
 */
export function detectMarketRegime(coins: CoinData[]): MarketRegime {
    // Find BTC
    const btc = coins.find(c => c.symbol === 'BTC');
    const btcChange = btc?.change24h || 0;

    // Get all non-BTC coins (alts)
    const alts = coins.filter(c => c.symbol !== 'BTC');

    // Calculate median alt change
    const altChanges = alts.map(c => c.change24h).sort((a, b) => a - b);
    const altMedian = altChanges.length > 0
        ? altChanges[Math.floor(altChanges.length / 2)]
        : 0;

    // Calculate breadth: % of coins with positive 24h change
    const positiveCoins = coins.filter(c => c.change24h > 0).length;
    const breadth = coins.length > 0 ? (positiveCoins / coins.length) * 100 : 50;

    // Determine regime
    let state: 'risk on' | 'neutral' | 'risk off';
    let why: string;

    if (btcChange > 2 && altMedian > 3 && breadth > 60) {
        state = 'risk on';
        why = `Strong rally across the board. BTC up ${btcChange.toFixed(1)}%, alts median +${altMedian.toFixed(1)}%, and ${breadth.toFixed(0)}% of coins are green. Market is in full risk-on mode.`;
    } else if (btcChange > 1 && altMedian > 1 && breadth > 55) {
        state = 'risk on';
        why = `Broad-based gains with BTC +${btcChange.toFixed(1)}% and alts median +${altMedian.toFixed(1)}%. ${breadth.toFixed(0)}% breadth shows healthy participation.`;
    } else if (btcChange < -2 && altMedian < -3 && breadth < 40) {
        state = 'risk off';
        why = `Heavy selling pressure. BTC down ${Math.abs(btcChange).toFixed(1)}%, alts median ${altMedian.toFixed(1)}%, only ${breadth.toFixed(0)}% of coins holding green. Risk-off environment.`;
    } else if (btcChange < -1 && altMedian < -1 && breadth < 45) {
        state = 'risk off';
        why = `Weakness across markets with BTC ${btcChange.toFixed(1)}% and alts median ${altMedian.toFixed(1)}%. ${breadth.toFixed(0)}% breadth indicates broad selling.`;
    } else if (Math.abs(btcChange) < 1 && Math.abs(altMedian) < 1) {
        state = 'neutral';
        why = `Quiet session with BTC ${btcChange >= 0 ? '+' : ''}${btcChange.toFixed(1)}% and alts median ${altMedian >= 0 ? '+' : ''}${altMedian.toFixed(1)}%. ${breadth.toFixed(0)}% breadth shows mixed action.`;
    } else if (btcChange > 0 && altMedian < 0) {
        state = 'neutral';
        why = `BTC up ${btcChange.toFixed(1)}% but alts lagging at ${altMedian.toFixed(1)}%. ${breadth.toFixed(0)}% breadth shows selective strength—capital rotating to BTC.`;
    } else if (btcChange < 0 && altMedian > 0) {
        state = 'neutral';
        why = `BTC down ${Math.abs(btcChange).toFixed(1)}% while alts show resilience at +${altMedian.toFixed(1)}%. ${breadth.toFixed(0)}% breadth indicates rotation into alts.`;
    } else {
        state = 'neutral';
        why = `Mixed signals with BTC ${btcChange >= 0 ? '+' : ''}${btcChange.toFixed(1)}%, alts median ${altMedian >= 0 ? '+' : ''}${altMedian.toFixed(1)}%, and ${breadth.toFixed(0)}% breadth. Market searching for direction.`;
    }

    return {
        state,
        why,
        btcChange,
        altMedian,
        breadth,
    };
}
