import fs from 'fs';
import path from 'path';

const HISTORY_FILE = path.join(process.cwd(), 'data', 'history.json');
const MAX_SNAPSHOTS = 7; // Keep last 7 days

export interface DailySnapshot {
    date: string; // YYYY-MM-DD
    marketState: 'risk on' | 'neutral' | 'risk off';
    btcChange: number;
    altMedian: number;
    breadth: number;
    volatilityValue: number;
    themes: Record<string, number>; // theme -> count
    assets: Record<string, number>; // asset -> count
    headlineCount: number;
}

interface HistoryData {
    snapshots: DailySnapshot[];
}

/**
 * Read history from file
 */
export function readHistory(): HistoryData {
    try {
        if (!fs.existsSync(HISTORY_FILE)) {
            return { snapshots: [] };
        }

        const fileContent = fs.readFileSync(HISTORY_FILE, 'utf-8');
        return JSON.parse(fileContent);
    } catch (error) {
        console.error('[History] Read error:', error);
        return { snapshots: [] };
    }
}

/**
 * Write history to file
 */
export function writeHistory(data: HistoryData): void {
    try {
        const historyDir = path.dirname(HISTORY_FILE);

        if (!fs.existsSync(historyDir)) {
            fs.mkdirSync(historyDir, { recursive: true });
        }

        fs.writeFileSync(HISTORY_FILE, JSON.stringify(data, null, 2), 'utf-8');
        console.log('[History] Written successfully');
    } catch (error) {
        console.error('[History] Write error:', error);
    }
}

/**
 * Add or update today's snapshot
 */
export function saveSnapshot(snapshot: DailySnapshot): void {
    const history = readHistory();
    const today = snapshot.date;

    // Remove existing snapshot for today if it exists
    history.snapshots = history.snapshots.filter(s => s.date !== today);

    // Add new snapshot
    history.snapshots.push(snapshot);

    // Sort by date descending
    history.snapshots.sort((a, b) => b.date.localeCompare(a.date));

    // Keep only last N days
    history.snapshots = history.snapshots.slice(0, MAX_SNAPSHOTS);

    writeHistory(history);
}

/**
 * Get snapshot for a specific date
 */
export function getSnapshot(date: string): DailySnapshot | null {
    const history = readHistory();
    return history.snapshots.find(s => s.date === date) || null;
}

/**
 * Get yesterday's snapshot
 */
export function getYesterdaySnapshot(): DailySnapshot | null {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const dateStr = yesterday.toISOString().split('T')[0];
    return getSnapshot(dateStr);
}

/**
 * Get all snapshots (sorted newest first)
 */
export function getAllSnapshots(): DailySnapshot[] {
    const history = readHistory();
    return history.snapshots;
}
