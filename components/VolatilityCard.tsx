interface VolatilityCardProps {
    label: 'low' | 'normal' | 'elevated';
    value: number;
}

export default function VolatilityCard({ label, value }: VolatilityCardProps) {
    const labelText = {
        'low': 'Low Volatility',
        'normal': 'Normal Volatility',
        'elevated': 'Elevated Volatility',
    };

    // Map volatility to progress (0-10 scale)
    const progress = Math.min((value / 10) * 100, 100);

    return (
        <div className="section-sm">
            <div className="flex items-center justify-between mb-2">
                <div className="flex items-baseline gap-3">
                    <h3 className="text-sm font-medium text-zinc-400">Volatility</h3>
                    <span className="text-sm text-zinc-400">{labelText[label]}</span>
                </div>
                <span className="text-sm font-normal tabular-nums text-zinc-500">
                    {value.toFixed(1)}%
                </span>
            </div>

            {/* Subtle progress bar with reduced opacity */}
            <div className="progress-bar opacity-40">
                <div
                    className={`progress-fill ${label === 'elevated' ? 'highlight' : ''}`}
                    style={{ width: `${progress}%` }}
                />
            </div>
        </div>
    );
}
