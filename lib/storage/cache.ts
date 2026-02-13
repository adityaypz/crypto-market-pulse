import fs from 'fs';
import path from 'path';

const CACHE_FILE = path.join(process.cwd(), 'data', 'cache.json');
const CACHE_TTL = 30 * 60 * 1000; // 30 minutes in milliseconds

export interface CacheData {
    updatedAt: string;
    marketState: "risk on" | "neutral" | "risk off";
    marketWhy: string;
    btcChange: number;
    altMedian: number;
    breadth: number;
    volatilityLabel: "low" | "normal" | "elevated";
    volatilityValue: number;
    themesTop: Array<{ theme: string; count: number }>;
    assetsTop: Array<{ asset: string; count: number }>;
    headlinesSample: Array<{ title: string; source: string; time: string }>;
}

interface CacheEntry {
    timestamp: number;
    lastSuccessfulUpdate: number;
    data: CacheData;
}

/**
 * Read cached data if it exists and is still valid
 * Returns stale cache if fresh data unavailable (stale-ok)
 */
export async function readCache(allowStale = false): Promise<CacheData & { isStale?: boolean; lastSuccessfulUpdate?: string } | null> {
    try {
        if (!fs.existsSync(CACHE_FILE)) {
            return null;
        }

        const fileContent = fs.readFileSync(CACHE_FILE, 'utf-8');
        const cacheEntry: CacheEntry = JSON.parse(fileContent);

        const now = Date.now();
        const age = now - cacheEntry.timestamp;

        if (age > CACHE_TTL) {
            console.log('[Cache] Expired, age:', Math.round(age / 1000), 'seconds');

            // Return stale cache if allowed
            if (allowStale) {
                console.log('[Cache] Serving stale cache');
                return {
                    ...cacheEntry.data,
                    isStale: true,
                    lastSuccessfulUpdate: new Date(cacheEntry.lastSuccessfulUpdate).toISOString(),
                };
            }

            return null;
        }

        console.log('[Cache] Hit, age:', Math.round(age / 1000), 'seconds');
        return cacheEntry.data;
    } catch (error) {
        console.error('[Cache] Read error:', error);
        return null;
    }
}

/**
 * Write data to cache
 */
export async function writeCache(data: CacheData): Promise<void> {
    try {
        const cacheDir = path.dirname(CACHE_FILE);

        // Create directory if it doesn't exist
        if (!fs.existsSync(cacheDir)) {
            fs.mkdirSync(cacheDir, { recursive: true });
        }

        const cacheEntry: CacheEntry = {
            timestamp: Date.now(),
            lastSuccessfulUpdate: Date.now(),
            data,
        };

        fs.writeFileSync(CACHE_FILE, JSON.stringify(cacheEntry, null, 2), 'utf-8');
        console.log('[Cache] Written successfully');
    } catch (error) {
        console.error('[Cache] Write error:', error);
    }
}

/**
 * Clear the cache
 */
export async function clearCache(): Promise<void> {
    try {
        if (fs.existsSync(CACHE_FILE)) {
            fs.unlinkSync(CACHE_FILE);
            console.log('[Cache] Cleared');
        }
    } catch (error) {
        console.error('[Cache] Clear error:', error);
    }
}

