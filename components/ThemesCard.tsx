import { ThemeDelta } from '@/lib/logic/deltas';

interface ThemesCardProps {
    themes: ThemeDelta[];
    credibility?: {
        headlinesAnalyzed: number;
        uniqueSources: number;
        deduplicated: number;
        originalCount: number;
    };
}

export default function ThemesCard({ themes, credibility }: ThemesCardProps) {
    if (themes.length === 0) {
        return (
            <div>
                <h3 className="text-sm font-medium text-zinc-400 mb-4">Themes (24h)</h3>
                <p className="text-sm text-zinc-500">No themes detected</p>
            </div>
        );
    }

    return (
        <div>
            {/* Context line - subtle */}
            {credibility && (
                <div className="text-xs text-zinc-600 mb-4">
                    headlines fetched: {credibility.originalCount}
                    {' · '}
                    duplicates removed: {credibility.originalCount - credibility.deduplicated}
                    {' · '}
                    analyzed: {credibility.deduplicated}
                </div>
            )}

            <h3 className="text-sm font-medium text-zinc-400 mb-4">Themes (24h)</h3>

            {/* Editorial list - clean with hover */}
            <div className="space-y-3">
                {themes.map((theme, index) => (
                    <div key={theme.theme} className="theme-item flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <span className="text-xs font-medium text-zinc-600 tabular-nums w-6">
                                {theme.count}
                            </span>
                            <span className={`text-sm ${index === 0 ? 'accent-text font-medium' : 'text-zinc-300'}`}>
                                {theme.theme}
                            </span>
                        </div>
                        {theme.delta !== 0 && (
                            <span className={`text-xs font-medium tabular-nums ${theme.delta > 0 ? 'text-emerald-500' : 'text-red-500'}`}>
                                {theme.delta > 0 ? '+' : ''}{theme.delta}
                            </span>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
