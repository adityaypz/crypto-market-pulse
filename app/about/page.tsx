export default function AboutPage() {
    return (
        <main className="min-h-screen px-6 py-12 md:px-12 md:py-16 lg:px-16 lg:py-20">
            <div className="max-w-3xl mx-auto">
                <h1 className="mb-8">
                    About Crypto Market Pulse
                </h1>

                <div className="space-y-4 text-base text-zinc-300 leading-relaxed">
                    <p>
                        Crypto Market Pulse is a lightweight market intelligence dashboard that synthesizes real-time data from public crypto markets and news sources.
                    </p>

                    <p>
                        We analyze market breadth, volatility patterns, and narrative themes to provide a clear snapshot of current market conditions—without requiring API keys or subscriptions.
                    </p>

                    <p>
                        Designed for traders, analysts, and researchers who need fast, reliable context on market regime shifts.
                    </p>

                    <p className="text-sm text-zinc-500 mt-8 pt-6 border-t border-zinc-900">
                        This tool is informational only and does not constitute financial advice. Always do your own research.
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
                        </div>
                    </div>
                </footer>
            </div>
        </main>
    );
}
