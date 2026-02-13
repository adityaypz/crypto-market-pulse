interface RegimeStripProps {
    history?: Array<{
        date: string;
        marketState: 'risk on' | 'neutral' | 'risk off';
    }>;
}

export default function RegimeStrip({ history = [] }: RegimeStripProps) {
    if (!history || history.length === 0) {
        return null;
    }

    const stateColors = {
        'risk on': 'bg-emerald-900/40',
        'neutral': 'bg-amber-900/40',
        'risk off': 'bg-red-900/40',
    };

    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    };

    return (
        <div className="section-sm">
            <h3 className="text-sm font-medium text-zinc-400 mb-3">7-Day Regime</h3>

            {/* Minimal horizontal strip */}
            <div className="flex gap-1">
                {history.map((day) => (
                    <div
                        key={day.date}
                        className={`flex-1 h-8 rounded ${stateColors[day.marketState]} group relative cursor-default`}
                        title={`${formatDate(day.date)} · ${day.marketState}`}
                    >
                        {/* Tooltip on hover */}
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-zinc-900 text-xs text-zinc-300 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                            {formatDate(day.date)} · {day.marketState}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
