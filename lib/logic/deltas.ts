import { DailySnapshot } from '../storage/history';

export interface ThemeDelta {
    theme: string;
    count: number;
    delta: number;
}

export interface AssetDelta {
    asset: string;
    count: number;
    delta: number;
}

export interface MarketStateDelta {
    current: 'risk on' | 'neutral' | 'risk off';
    previous: 'risk on' | 'neutral' | 'risk off' | null;
    changed: boolean;
}

/**
 * Calculate theme deltas between today and yesterday
 */
export function calculateThemeDeltas(
    todayThemes: Array<{ theme: string; count: number }>,
    yesterdaySnapshot: DailySnapshot | null
): ThemeDelta[] {
    if (!yesterdaySnapshot) {
        return todayThemes.map(t => ({ ...t, delta: 0 }));
    }

    return todayThemes.map(theme => {
        const yesterdayCount = yesterdaySnapshot.themes[theme.theme] || 0;
        const delta = theme.count - yesterdayCount;

        return {
            theme: theme.theme,
            count: theme.count,
            delta,
        };
    });
}

/**
 * Calculate asset deltas between today and yesterday
 */
export function calculateAssetDeltas(
    todayAssets: Array<{ asset: string; count: number }>,
    yesterdaySnapshot: DailySnapshot | null
): AssetDelta[] {
    if (!yesterdaySnapshot) {
        return todayAssets.map(a => ({ ...a, delta: 0 }));
    }

    return todayAssets.map(asset => {
        const yesterdayCount = yesterdaySnapshot.assets[asset.asset] || 0;
        const delta = asset.count - yesterdayCount;

        return {
            asset: asset.asset,
            count: asset.count,
            delta,
        };
    });
}

/**
 * Calculate market state delta
 */
export function calculateMarketStateDelta(
    currentState: 'risk on' | 'neutral' | 'risk off',
    yesterdaySnapshot: DailySnapshot | null
): MarketStateDelta {
    if (!yesterdaySnapshot) {
        return {
            current: currentState,
            previous: null,
            changed: false,
        };
    }

    return {
        current: currentState,
        previous: yesterdaySnapshot.marketState,
        changed: currentState !== yesterdaySnapshot.marketState,
    };
}

/**
 * Format market state change text
 */
export function formatMarketStateChange(delta: MarketStateDelta): string {
    if (!delta.changed || !delta.previous) {
        return `${delta.current} (unchanged)`;
    }

    return `${delta.current} (from ${delta.previous})`;
}
