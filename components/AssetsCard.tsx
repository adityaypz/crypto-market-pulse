import { AssetDelta } from '@/lib/logic/deltas';

interface AssetsCardProps {
    assets: AssetDelta[];
}

export default function AssetsCard({ assets }: AssetsCardProps) {
    if (assets.length === 0) {
        return (
            <div>
                <h3 className="text-sm font-medium text-zinc-400 mb-4">Asset Mentions</h3>
                <p className="text-sm text-zinc-500">No asset mentions detected</p>
            </div>
        );
    }

    return (
        <div>
            <h3 className="text-sm font-medium text-zinc-400 mb-4">Asset Mentions</h3>

            {/* Editorial list - clean with hover */}
            <div className="space-y-3">
                {assets.map((asset, index) => (
                    <div key={asset.asset} className="asset-item flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <span className="text-xs font-medium text-zinc-600 tabular-nums w-6">
                                {asset.count}
                            </span>
                            <span className={`text-sm ${index === 0 ? 'accent-text font-medium' : 'text-zinc-300'}`}>
                                {asset.asset}
                            </span>
                        </div>
                        {asset.delta !== 0 && (
                            <span className={`text-xs font-medium tabular-nums ${asset.delta > 0 ? 'text-emerald-500' : 'text-red-500'}`}>
                                {asset.delta > 0 ? '+' : ''}{asset.delta}
                            </span>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
