# Crypto Market Pulse Dashboard

A Next.js dashboard that provides real-time crypto market insights without requiring API keys. Data is collected via web scraping from public sources.

## Features

- **Market State Detection**: Analyzes market regime (risk on/neutral/risk off) using 7d market changes and BTC dominance
- **Volatility Mood**: Calculates median absolute 24h price changes and categorizes as low/normal/elevated
- **Narrative Pulse**: Scrapes crypto news headlines and identifies trending themes using keyword mapping
- **Daily Brief**: Generates a concise market summary with conditional notes based on market conditions
- **Smart Caching**: 30-minute TTL cache to minimize scraping requests
- **Refresh on Demand**: Bypass cache and fetch fresh data with a single click

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Scraping**: Playwright (for JavaScript-rendered content) + Cheerio
- **Data Sources**: CoinGecko (market data), CryptoPanic (news headlines)

## Setup Instructions

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Navigate to the project directory:
```bash
cd "c:\Users\aadit\Downloads\crypto market pulse"
```

2. Install dependencies (already done):
```bash
npm install
```

3. Install Playwright browsers (already done):
```bash
npx playwright install chromium
```

### Running Locally

Start the development server:
```bash
npm run dev
```

The dashboard will be available at:
- **Local**: http://localhost:3000
- **Network**: http://192.168.1.10:3000

### Building for Production

```bash
npm run build
npm start
```

## Project Structure

```
crypto-market-pulse/
├── app/
│   ├── api/data/route.ts       # API endpoint for dashboard data
│   ├── page.tsx                # Main dashboard page
│   ├── layout.tsx              # Root layout
│   └── globals.css             # Global styles
├── lib/
│   ├── sources/
│   │   ├── market.ts           # Market data scraper (CoinGecko)
│   │   └── news.ts             # News scraper (CryptoPanic)
│   ├── logic/
│   │   ├── narratives.ts       # Theme detection and analysis
│   │   ├── regime.ts           # Market state detection
│   │   └── volatility.ts       # Volatility calculation
│   └── storage/
│       └── cache.ts            # Cache management
├── components/
│   ├── MarketStateCard.tsx     # Market regime display
│   ├── VolatilityCard.tsx      # Volatility mood display
│   ├── NarrativePulseCard.tsx  # Top themes display
│   └── DailyBrief.tsx          # Market summary
└── data/
    └── cache.json              # Auto-generated cache file
```

## How It Works

### Data Collection

1. **Market Data**: Playwright scrapes CoinGecko's homepage to extract:
   - Top 50 coins with 24h % changes
   - BTC dominance and 7d changes
   - Total market cap 7d change

2. **News Headlines**: Playwright scrapes CryptoPanic to extract:
   - Recent headlines from the last 24 hours
   - Source and timestamp information

### Analysis

1. **Market Regime**: 
   - Preferred: Uses 7d market change + BTC dominance change
   - Fallback: Compares BTC 24h % vs median alt 24h %
   - Returns: "risk on", "neutral", or "risk off" with explanation

2. **Volatility Mood**:
   - Calculates median absolute 24h % change
   - Labels: low (<2%), normal (2-4%), elevated (>4%)

3. **Narrative Pulse**:
   - Maps headlines to themes using keyword dictionary
   - Counts frequency in last 24h
   - Returns top 5 themes

### Caching

- Cache stored in `/data/cache.json`
- TTL: 30 minutes
- Automatic cache invalidation on expiry
- Manual refresh bypasses cache

## Usage

1. **Initial Load**: Dashboard fetches and caches data automatically
2. **Cached Loads**: Subsequent visits within 30 minutes use cached data
3. **Manual Refresh**: Click "Refresh" button to bypass cache and fetch fresh data
4. **Error Handling**: Dashboard displays partial data if scraping fails

## Notes

- **Rate Limiting**: Be mindful of scraping frequency to avoid being blocked
- **Data Accuracy**: Scraped data depends on source website structure
- **Maintenance**: May require updates if source websites change their HTML structure
- **Production Deployment**: For production, consider using a database-backed cache instead of local JSON file

## Troubleshooting

### Scraping Fails
- Check if source websites (CoinGecko, CryptoPanic) are accessible
- Verify Playwright browsers are installed: `npx playwright install chromium`
- Check console logs for detailed error messages

### Cache Issues
- Delete `/data/cache.json` to clear cache manually
- Ensure write permissions for `/data` directory

### Build Errors
- Run `npm install` to ensure all dependencies are installed
- Check TypeScript errors: `npm run lint`
