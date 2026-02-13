'use client';

import { useState } from 'react';

interface DailyBriefProps {
    ctBrief: string;
    analystBrief: string;
    updatedAt: string;
    isStale: boolean;
}

export default function DailyBrief({ ctBrief, analystBrief, updatedAt, isStale }: DailyBriefProps) {
    const [view, setView] = useState<'ct' | 'analyst'>('ct');

    const formatTime = (isoString: string) => {
        const date = new Date(isoString);
        return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
    };

    return (
        <div className="section">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-zinc-400">Daily Brief</h3>

                {/* Toggle - minimal */}
                <div className="flex gap-2">
                    <button
                        onClick={() => setView('ct')}
                        className={`px-3 py-1 text-xs font-medium rounded transition-colors ${view === 'ct'
                            ? 'bg-zinc-800 text-zinc-200'
                            : 'text-zinc-500 hover:text-zinc-300'
                            }`}
                    >
                        CT
                    </button>
                    <button
                        onClick={() => setView('analyst')}
                        className={`px-3 py-1 text-xs font-medium rounded transition-colors ${view === 'analyst'
                            ? 'bg-zinc-800 text-zinc-200'
                            : 'text-zinc-500 hover:text-zinc-300'
                            }`}
                    >
                        Analyst
                    </button>
                </div>
            </div>

            {/* Newsletter-style block */}
            <div className="border-l-2 border-zinc-800 pl-4 py-2">
                <p className="text-base text-zinc-300 leading-relaxed whitespace-pre-line">
                    {view === 'ct' ? ctBrief : analystBrief}
                </p>
            </div>

            {/* Metadata footer - subtle with disclaimer */}
            <div className="mt-3 text-xs space-y-1">
                <div className="text-zinc-600">
                    {isStale ? (
                        <span className="text-amber-600">⚠ Data may be stale</span>
                    ) : (
                        <span>generated automatically · last updated {formatTime(updatedAt)}</span>
                    )}
                </div>
                <div className="text-zinc-700">
                    for informational purposes only
                </div>
            </div>
        </div>
    );
}
