interface WatchlistCoin {
    symbol: string;
    name: string;
    change24h: number;
    price: number;
}

interface WatchlistSnapshotProps {
    watchlist: WatchlistCoin[];
}

export default function WatchlistSnapshot({ watchlist }: WatchlistSnapshotProps) {
    if (watchlist.length === 0) {
        return null;
    }

    return (
        <div className="section-sm">
            <h3 className="text-sm font-medium text-zinc-400 mb-4">Watchlist Snapshot</h3>

            {/* Inline ticker list - compact */}
            <div className="flex flex-wrap gap-x-6 gap-y-2">
                {watchlist.map((coin) => (
                    <div key={coin.symbol} className="flex items-center gap-2">
                        <span className="text-sm text-zinc-400">{coin.symbol}</span>
                        <span className={`text-sm font-medium tabular-nums ${coin.change24h >= 0 ? 'text-emerald-500' : 'text-red-500'}`}>
                            <span className="inline-block w-3 text-center text-xs">{coin.change24h >= 0 ? '▲' : '▼'}</span>
                            {' '}
                            {coin.change24h >= 0 ? '+' : ''}{coin.change24h.toFixed(1)}%
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
