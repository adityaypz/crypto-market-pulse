export default function SourcesPage() {
    return (
        <main className="min-h-screen px-6 py-12 md:px-12 md:py-16 lg:px-16 lg:py-20">
            <div className="max-w-3xl mx-auto">
                <h1 className="mb-8">
                    Data Sources
                </h1>

                <div className="space-y-8">
                    {/* Market Data */}
                    <div>
                        <h2 className="text-lg font-medium text-zinc-300 mb-4">Market Data</h2>
                        <div className="space-y-3 text-sm">
                            <div>
                                <h3 className="text-zinc-300 font-medium mb-1">CoinGecko Public API</h3>
                                <p className="text-zinc-500 mb-2">
                                    Real-time price data and 24-hour changes for top cryptocurrencies by market cap.
                                </p>
                                <a
                                    href="https://www.coingecko.com/api/documentation"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-xs accent-text hover:opacity-80 transition-opacity"
                                >
                                    coingecko.com/api/documentation
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* News & Narratives */}
                    <div className="pt-6 border-t border-zinc-900">
                        <h2 className="text-lg font-medium text-zinc-300 mb-4">News & Narratives</h2>
                        <div className="space-y-4 text-sm">
                            <div>
                                <h3 className="text-zinc-300 font-medium mb-1">CoinDesk RSS</h3>
                                <p className="text-zinc-500 mb-2">
                                    Latest crypto news and analysis from CoinDesk.
                                </p>
                                <a
                                    href="https://www.coindesk.com/arc/outboundfeeds/rss/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-xs accent-text hover:opacity-80 transition-opacity"
                                >
                                    coindesk.com/arc/outboundfeeds/rss
                                </a>
                            </div>

                            <div>
                                <h3 className="text-zinc-300 font-medium mb-1">Decrypt RSS</h3>
                                <p className="text-zinc-500 mb-2">
                                    Crypto news and features from Decrypt.
                                </p>
                                <a
                                    href="https://decrypt.co/feed"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-xs accent-text hover:opacity-80 transition-opacity"
                                >
                                    decrypt.co/feed
                                </a>
                            </div>

                            <div>
                                <h3 className="text-zinc-300 font-medium mb-1">The Block RSS</h3>
                                <p className="text-zinc-500 mb-2">
                                    Breaking news and research from The Block.
                                </p>
                                <a
                                    href="https://www.theblock.co/rss.xml"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-xs accent-text hover:opacity-80 transition-opacity"
                                >
                                    theblock.co/rss.xml
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Data Processing */}
                    <div className="pt-6 border-t border-zinc-900">
                        <h2 className="text-lg font-medium text-zinc-300 mb-4">Data Processing</h2>
                        <div className="text-sm text-zinc-400 space-y-3">
                            <p>
                                <strong className="text-zinc-300">Deduplication:</strong> Headlines are deduplicated using fuzzy title matching (70% similarity threshold) to avoid counting the same story multiple times.
                            </p>
                            <p>
                                <strong className="text-zinc-300">Theme Detection:</strong> Keyword-based analysis identifies dominant narratives (regulation, security, ETF, AI, L2/ZK, RWA, meme, adoption, funding).
                            </p>
                            <p>
                                <strong className="text-zinc-300">Asset Mentions:</strong> Dictionary-based matching tracks mentions of major cryptocurrencies in headlines.
                            </p>
                            <p>
                                <strong className="text-zinc-300">Market Regime:</strong> Calculated using BTC performance, median altcoin change, and breadth (% of coins green).
                            </p>
                            <p>
                                <strong className="text-zinc-300">Volatility:</strong> Median absolute 24-hour change across tracked assets.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="mt-12">
                    <a href="/" className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors">
                        ← Back to Dashboard
                    </a>
                </div>

                {/* Footer - consistent with main page */}
                <footer className="mt-16 pt-8 border-t border-zinc-900">
                    <div className="text-center space-y-2">
                        <p className="text-xs text-zinc-600">
                            informational only · not financial advice · data from public sources
                        </p>
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
