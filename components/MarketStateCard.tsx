import { MarketStateDelta } from '@/lib/logic/deltas';

interface MarketStateCardProps {
    state: 'risk on' | 'neutral' | 'risk off';
    why: string;
    btcChange: number;
    altMedian: number;
    breadth: number;
    stateDelta?: MarketStateDelta;
}

export default function MarketStateCard({
    state,
    why,
    btcChange,
    altMedian,
    breadth,
    stateDelta,
}: MarketStateCardProps) {
    // Use accent color for all state labels to reduce visual competition
    const stateColor = 'accent-text';

    const stateLabels = {
        'risk on': 'Risk On',
        'neutral': 'Neutral',
        'risk off': 'Risk Off',
    };

    // Format state change indicator
    const getStateChangeIndicator = () => {
        if (!stateDelta || !stateDelta.previous) {
            return <span className="text-zinc-600 text-sm font-normal">unchanged</span>;
        }
        if (!stateDelta.changed) {
            return <span className="text-zinc-600 text-sm font-normal">unchanged</span>;
        }

        const stateOrder = { 'risk off': 0, 'neutral': 1, 'risk on': 2 };
        const currentOrder = stateOrder[stateDelta.current as keyof typeof stateOrder];
        const previousOrder = stateOrder[stateDelta.previous as keyof typeof stateOrder];
        const arrow = currentOrder > previousOrder ? '↑' : '↓';

        return (
            <span className="text-zinc-500 text-sm font-normal">
                {arrow} from {stateDelta.previous}
            </span>
        );
    };

    return (
        <div className="section">
            {/* Market State - Dominant with accent color */}
            <div className="mb-6">
                <div className="flex items-baseline gap-3 mb-3">
                    <h2 className={`text-5xl font-semibold ${stateColor}`}>
                        {stateLabels[state]}
                    </h2>
                    {getStateChangeIndicator()}
                </div>
                <p className="text-base text-zinc-400 leading-relaxed max-w-3xl">
                    {why}
                </p>
            </div>

            {/* Supporting Stats - Inline horizontal */}
            <div className="flex items-center gap-8 text-sm">
                <div>
                    <span className="text-zinc-500">BTC 24h</span>
                    <span className={`ml-2 font-medium tabular-nums ${btcChange >= 0 ? 'text-emerald-500' : 'text-red-500'}`}>
                        {btcChange >= 0 ? '+' : ''}{btcChange.toFixed(2)}%
                    </span>
                </div>

                <div>
                    <span className="text-zinc-500">Alt Median</span>
                    <span className={`ml-2 font-medium tabular-nums ${Math.abs(altMedian) < 0.01 ? 'text-zinc-400' :
                        altMedian >= 0 ? 'text-emerald-500' : 'text-red-500'
                        }`}>
                        {altMedian >= 0 ? '+' : ''}{altMedian.toFixed(2)}%
                    </span>
                </div>

                <div>
                    <span className="text-zinc-500">Breadth</span>
                    <span className="ml-2 font-medium tabular-nums text-zinc-300">
                        {breadth.toFixed(0)}%
                    </span>
                </div>
            </div>
        </div>
    );
}
