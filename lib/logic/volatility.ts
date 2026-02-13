import { CoinData } from '../sources/market';

export type VolatilityLabel = "low" | "normal" | "elevated";

export interface VolatilityMood {
    label: VolatilityLabel;
    value: number;
}

/**
 * Calculate volatility mood based on median absolute 24h % change
 * Low: <2%
 * Normal: 2-4%
 * Elevated: >4%
 */
export function calculateVolatility(coins: CoinData[]): VolatilityMood {
    if (coins.length === 0) {
        return {
            label: "normal",
            value: 0,
        };
    }

    // Calculate absolute changes
    const absoluteChanges = coins
        .map(c => Math.abs(c.change24h))
        .sort((a, b) => a - b);

    // Get median
    const median = absoluteChanges[Math.floor(absoluteChanges.length / 2)];

    // Determine label
    let label: VolatilityLabel;
    if (median < 2) {
        label = "low";
    } else if (median <= 4) {
        label = "normal";
    } else {
        label = "elevated";
    }

    return {
        label,
        value: median,
    };
}
