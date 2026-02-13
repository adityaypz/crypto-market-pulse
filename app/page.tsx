'use client';

import { useState, useEffect } from 'react';
import MarketStateCard from '@/components/MarketStateCard';
import VolatilityCard from '@/components/VolatilityCard';
import ThemesCard from '@/components/ThemesCard';
import AssetsCard from '@/components/AssetsCard';
import DailyBrief from '@/components/DailyBrief';
import RegimeStrip from '@/components/RegimeStrip';
import AlertBadges from '@/components/AlertBadges';
import WatchlistSnapshot from '@/components/WatchlistSnapshot';
import { ThemeDelta, AssetDelta, MarketStateDelta } from '@/lib/logic/deltas';

interface MarketData {
    updatedAt: string;
    isStale?: boolean;
    lastSuccessfulUpdate?: string;
    marketState: 'risk on' | 'neutral' | 'risk off';
    marketWhy: string;
    marketStateDelta: MarketStateDelta;
    btcChange: number;
    altMedian: number;
    breadth: number;
    volatilityLabel: 'low' | 'normal' | 'elevated';
    volatilityValue: number;
    themesTop: ThemeDelta[];
    assetsTop: AssetDelta[];
    watchlist: Array<{
        symbol: string;
        name: string;
        change24h: number;
        price: number;
    }>;
    headlinesSample: Array<{ title: string; source: string; time: string }>;
    credibility: {
        headlinesAnalyzed: number;
        uniqueSources: number;
        deduplicated: number;
        originalCount: number;
    };
}

export default function Home() {
    const [data, setData] = useState<MarketData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = async (refresh = false) => {
        try {
            setLoading(true);
            setError(null);

            const url = refresh ? '/api/data?refresh=true' : '/api/data';
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }

            const result = await response.json();
            setData(result);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    if (loading && !data) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="loading text-4xl mb-4">⟳</div>
                    <p className="text-zinc-400">Loading market data...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <p className="text-red-400 mb-4">Error: {error}</p>
                    <button onClick={() => fetchData()} className="btn-primary">
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    if (!data) return null;

    return (
        <main className="min-h-screen px-6 py-12 md:px-12 md:py-16 lg:px-16 lg:py-20 fade-in">
            <div className="max-w-6xl mx-auto">
                {/* HERO SECTION - Editorial style */}
                <header className="mb-16">
                    <div className="flex items-start justify-between mb-8">
                        <div>
                            <h1 className="mb-3">
                                Crypto Market Pulse
                            </h1>
                            <p className="text-base text-zinc-500">
                                Real-time market regime and narrative tracking
                            </p>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="text-right">
                                <div className="text-xs text-zinc-600">Last updated</div>
                                <div className="text-sm text-zinc-400 tabular-nums">
                                    {new Date(data.updatedAt).toLocaleTimeString('en-US', {
                                        hour: '2-digit',
                                        minute: '2-digit',
                                        hour12: false,
                                    })}
                                </div>
                            </div>
                            <button
                                onClick={() => fetchData(true)}
                                disabled={loading}
                                className="btn-secondary"
                            >
                                {loading ? '⟳' : '↻'}
                            </button>
                        </div>
                    </div>

                    {/* Stale warning - minimal */}
                    {data.isStale && data.lastSuccessfulUpdate && (
                        <div className="mb-6 px-4 py-2 border-l-2 border-amber-600 bg-amber-900/10">
                            <p className="text-sm text-amber-500">
                                ⚠ Data may be stale · Last update:{' '}
                                {new Date(data.lastSuccessfulUpdate).toLocaleString('en-US', {
                                    month: 'short',
                                    day: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit',
                                })}
                            </p>
                        </div>
                    )}

                    {/* Alert Badges - increased spacing */}
                    <div className="mt-6">
                        <AlertBadges
                            themes={data.themesTop}
                            volatilityValue={data.volatilityValue}
                            breadth={data.breadth}
                        />
                    </div>

                    {/* 7-Day Regime Strip */}
                    <div className="mt-8">
                        <RegimeStrip />
                    </div>
                </header>

                {/* Separator */}
                <div className="separator" />

                {/* MARKET REGIME - Primary section */}
                <MarketStateCard
                    state={data.marketState}
                    why={data.marketWhy}
                    btcChange={data.btcChange}
                    altMedian={data.altMedian}
                    breadth={data.breadth}
                    stateDelta={data.marketStateDelta}
                />

                {/* VOLATILITY - Secondary strip */}
                <VolatilityCard
                    label={data.volatilityLabel}
                    value={data.volatilityValue}
                />

                {/* Separator */}
                <div className="separator" />

                {/* THEMES + ASSETS - Editorial two-column */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 section">
                    <ThemesCard
                        themes={data.themesTop}
                        credibility={data.credibility}
                    />
                    <AssetsCard assets={data.assetsTop} />
                </div>

                {/* WATCHLIST SNAPSHOT - Inline tickers */}
                {data.watchlist && data.watchlist.length > 0 && (
                    <WatchlistSnapshot watchlist={data.watchlist} />
                )}

                {/* Separator */}
                <div className="separator" />

                {/* DAILY BRIEF - Newsletter style */}
                <DailyBrief
                    ctBrief={generateCTBrief(data)}
                    analystBrief={generateAnalystBrief(data)}
                    updatedAt={data.updatedAt}
                    isStale={!!data.isStale}
                />

                {/* HEADLINES - Clean list with improved spacing */}
                {data.headlinesSample && data.headlinesSample.length > 0 && (
                    <div className="section">
                        <h3 className="text-sm font-medium text-zinc-400 mb-4">Recent Headlines</h3>
                        <div className="space-y-4">
                            {data.headlinesSample.map((headline, index) => (
                                <div key={index} className="border-l-2 border-zinc-800 pl-3 py-1">
                                    <p className="text-sm text-zinc-300 leading-relaxed">
                                        {headline.title}
                                    </p>
                                    <div className="mt-1 text-xs text-zinc-700">
                                        {headline.source} · {new Date(headline.time).toLocaleTimeString('en-US', {
                                            hour: 'numeric',
                                            minute: '2-digit',
                                        })}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}


                {/* FOOTER - Minimal with increased spacing */}
                <footer className="mt-20 pt-8 border-t border-zinc-900">
                    <div className="text-center space-y-2">
                        {/* Line 1: Micro legal text */}
                        <p className="text-xs text-zinc-600">
                            informational only · not financial advice · data from public sources
                        </p>

                        {/* Line 2: Copyright and links */}
                        <div className="flex items-center justify-center gap-2 text-xs text-zinc-500">
                            <span>© 2026 moon</span>
                            <span>·</span>
                            <a href="/about" className="hover:text-zinc-300 transition-colors">
                                about
                            </a>
                            <span>·</span>
                            <a href="/sources" className="hover:text-zinc-300 transition-colors">
                                sources
                            </a>
                            <span>·</span>
                            <a href="/disclaimer" className="hover:text-zinc-300 transition-colors">
                                disclaimer
                            </a>
                            <span>·</span>
                            <a href="https://twitter.com/vncturn" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-300 transition-colors">
                                @vncturn
                            </a>
                        </div>
                    </div>
                </footer>
            </div>
        </main>
    );
}

// Helper functions for brief generation
function generateCTBrief(data: MarketData): string {
    const stateEmoji = {
        'risk on': '🟢',
        'neutral': '🟡',
        'risk off': '🔴',
    };

    const topTheme = data.themesTop[0]?.theme.toLowerCase() || 'n/a';

    return `${stateEmoji[data.marketState]} ${data.marketState.toUpperCase()}

${data.marketWhy}

top narrative: ${topTheme} · volatility: ${data.volatilityLabel}

BTC ${data.btcChange >= 0 ? '+' : ''}${data.btcChange.toFixed(2)}% · Alts ${data.altMedian >= 0 ? '+' : ''}${data.altMedian.toFixed(2)}% · ${data.breadth.toFixed(0)}% breadth`;
}

function generateAnalystBrief(data: MarketData): string {
    const topTheme = data.themesTop[0]?.theme.toLowerCase() || 'mixed signals';
    const topAsset = data.assetsTop[0]?.asset || 'BTC';

    return `Market regime: ${data.marketState}

${data.marketWhy}

Narrative focus has shifted to ${topTheme}, with ${topAsset} dominating headlines.

top narrative: ${topTheme} · volatility: ${data.volatilityLabel} at ${data.volatilityValue.toFixed(1)}%

Market breadth at ${data.breadth.toFixed(0)}% suggests ${data.breadth > 55 ? 'broad participation' : data.breadth < 45 ? 'selective weakness' : 'mixed conditions'}.`;
}
