# Crypto Market Pulse 📊

A lightweight, real-time crypto market intelligence dashboard built with Next.js. Provides instant market insights without requiring API keys—all data sourced from public APIs.

![Next.js](https://img.shields.io/badge/Next.js-15-black) ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue) ![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38bdf8)

## ✨ Features

- **Market Regime Detection** - Analyzes market state (Risk On/Neutral/Risk Off) using BTC performance, altcoin breadth, and median changes
- **Volatility Tracking** - Real-time volatility measurement with visual indicators
- **Narrative Pulse** - Identifies trending themes from crypto news headlines
- **Asset Mentions** - Tracks which cryptocurrencies are dominating the conversation
- **Daily Brief** - AI-generated market summary with key insights
- **7-Day Regime History** - Visual timeline of market state changes
- **Smart Caching** - 5-minute cache to optimize performance
- **Premium UI** - Editorial-inspired design with subtle micro-interactions

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/adityaypz/crypto-market-pulse.git

# Navigate to project directory
cd crypto-market-pulse

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
crypto-market-pulse/
├── app/
│   ├── api/
│   │   ├── data/route.ts          # Main data aggregation endpoint
│   │   └── history/route.ts       # 7-day regime history
│   ├── about/page.tsx             # About page
│   ├── disclaimer/page.tsx        # Legal disclaimer
│   ├── sources/page.tsx           # Data sources info
│   ├── page.tsx                   # Main dashboard
│   ├── layout.tsx                 # Root layout
│   └── globals.css                # Global styles
├── components/
│   ├── MarketStateCard.tsx        # Market regime display
│   ├── VolatilityCard.tsx         # Volatility indicator
│   ├── ThemesCard.tsx             # Trending themes
│   ├── AssetsCard.tsx             # Asset mentions
│   ├── DailyBrief.tsx             # Market summary
│   ├── RegimeStrip.tsx            # 7-day history
│   ├── WatchlistSnapshot.tsx      # Watchlist tickers
│   └── AlertBadges.tsx            # Alert indicators
├── lib/
│   ├── sources/
│   │   ├── market.ts              # CoinGecko data fetcher
│   │   └── rss.ts                 # RSS news aggregator
│   ├── logic/
│   │   ├── regime.ts              # Market state analysis
│   │   ├── volatility.ts          # Volatility calculation
│   │   ├── themes.ts              # Theme detection
│   │   ├── assets.ts              # Asset mention tracking
│   │   └── deltas.ts              # Change tracking
│   └── storage/
│       ├── cache.ts               # Cache management
│       └── history.ts             # Historical data
└── data/
    ├── cache.json                 # Auto-generated cache
    └── history.json               # 7-day regime history
```

## 🔧 How It Works

### Data Sources

- **Market Data**: [CoinGecko Public API](https://www.coingecko.com/api/documentation)
  - Top 100 cryptocurrencies by market cap
  - Real-time price data and 24h changes
  
- **News Headlines**: RSS feeds from:
  - [CoinDesk](https://www.coindesk.com)
  - [Decrypt](https://decrypt.co)
  - [The Block](https://www.theblock.co)

### Analysis Pipeline

1. **Market Regime**
   - Analyzes BTC performance vs altcoin median
   - Calculates market breadth (% of coins green)
   - Determines Risk On/Neutral/Risk Off state

2. **Volatility**
   - Median absolute 24h change across top 100
   - Categorized as: Low (<2%), Normal (2-4%), Elevated (>4%)

3. **Themes & Assets**
   - Keyword-based analysis of headlines
   - Deduplication using fuzzy matching (70% threshold)
   - Tracks mentions of major narratives and cryptocurrencies

4. **Daily Brief**
   - Auto-generated summary based on market conditions
   - Two modes: Crypto Twitter style or Analyst style

### Caching Strategy

- **TTL**: 5 minutes
- **Storage**: Local JSON file (`/data/cache.json`)
- **Invalidation**: Automatic on expiry or manual refresh
- **Fallback**: Graceful degradation if data fetch fails

## 🎨 Design Philosophy

- **Editorial First** - Clean typography, generous whitespace, minimal borders
- **Premium Polish** - Subtle hover states, micro-animations, smooth transitions
- **Accessibility** - Keyboard navigation, focus states, semantic HTML
- **Mobile Optimized** - Responsive design, touch-friendly interactions
- **Performance** - GPU-accelerated animations, optimized bundle size

## 📊 API Endpoints

### GET `/api/data`

Returns current market snapshot:

```typescript
{
  marketState: "risk on" | "neutral" | "risk off",
  marketWhy: string,
  btcChange: number,
  altMedian: number,
  breadth: number,
  volatilityValue: number,
  volatilityLabel: "low" | "normal" | "elevated",
  themesTop: Array<{ theme: string, count: number, delta: number }>,
  assetsTop: Array<{ asset: string, count: number, delta: number }>,
  headlinesSample: Array<{ title: string, source: string, time: string }>,
  watchlist: Array<{ symbol: string, price: number, change24h: number }>,
  updatedAt: string,
  isStale: boolean
}
```

### GET `/api/history`

Returns 7-day regime history for timeline visualization.

## 🚢 Deployment

### Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/adityaypz/crypto-market-pulse)

1. Push to GitHub
2. Import repository in Vercel
3. Deploy (auto-detects Next.js)

No environment variables required—all data from public sources.

### Other Platforms

Works on any platform supporting Next.js:
- Netlify
- Railway
- Render
- Self-hosted with Docker

## 📝 License

MIT License - feel free to use for personal or commercial projects.

## ⚠️ Disclaimer

This dashboard is for **informational purposes only**. It does not constitute financial advice, investment advice, or trading advice. Cryptocurrency markets are highly volatile and speculative. Always do your own research and consult with qualified financial advisors before making investment decisions.

## 🤝 Contributing

Contributions welcome! Feel free to:
- Report bugs
- Suggest features
- Submit pull requests
- Improve documentation

## 📧 Contact

Created by [@adityaypz](https://github.com/adityaypz)

---

**Built with ❤️ using Next.js, TypeScript, and Tailwind CSS**
