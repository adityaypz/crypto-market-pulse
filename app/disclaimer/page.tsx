export default function DisclaimerPage() {
    return (
        <main className="min-h-screen px-6 py-12 md:px-12 md:py-16 lg:px-16 lg:py-20">
            <div className="max-w-3xl mx-auto">
                <h1 className="mb-8">
                    Disclaimer
                </h1>

                <div className="space-y-6 text-sm text-zinc-400 leading-relaxed">
                    <p className="text-zinc-300 font-medium">
                        By using this site, you acknowledge and agree to the following.
                    </p>

                    <div>
                        <h3 className="text-zinc-200 font-medium mb-2">Not Financial Advice</h3>
                        <p>
                            The information provided on Crypto Market Pulse is for informational and educational purposes only. It does not constitute financial advice, investment advice, trading advice, or any other sort of advice.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-zinc-200 font-medium mb-2">No Guarantees</h3>
                        <p>
                            We make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability of the information, products, services, or related graphics contained on this dashboard.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-zinc-200 font-medium mb-2">Use at Your Own Risk</h3>
                        <p>
                            Any reliance you place on such information is strictly at your own risk. Cryptocurrency markets are highly volatile and speculative. You should conduct your own research and consult with qualified financial advisors before making any investment decisions.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-zinc-200 font-medium mb-2">Data Accuracy</h3>
                        <p>
                            While we strive to provide accurate and up-to-date information, data may be delayed, incomplete, or contain errors. Market conditions can change rapidly, and past performance is not indicative of future results.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-zinc-200 font-medium mb-2">Third-Party Sources</h3>
                        <p>
                            This dashboard aggregates data from third-party sources including CoinGecko, CoinDesk, Decrypt, and The Block. We are not responsible for the accuracy or reliability of information from these sources.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-zinc-200 font-medium mb-2">Limitation of Liability</h3>
                        <p>
                            In no event will we be liable for any loss or damage including without limitation, indirect or consequential loss or damage, or any loss or damage whatsoever arising from loss of data or profits arising out of, or in connection with, the use of this dashboard.
                        </p>
                    </div>

                    <p className="text-xs text-zinc-600 mt-8 pt-6 border-t border-zinc-900">
                        Last updated: February 13, 2026
                    </p>
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
