// Quick test script to verify the new API-based data sources work
import { scrapeMarketData } from './lib/sources/market';
import { scrapeNewsHeadlines } from './lib/sources/news';

async function test() {
    console.log('Testing market data API...');
    const marketData = await scrapeMarketData();
    console.log(`✓ Got ${marketData.coins.length} coins`);
    console.log(`✓ BTC Dominance: ${marketData.btcDominance.toFixed(2)}%`);
    console.log(`✓ Sample coin: ${marketData.coins[0].symbol} at $${marketData.coins[0].price.toFixed(2)} (${marketData.coins[0].change24h > 0 ? '+' : ''}${marketData.coins[0].change24h.toFixed(2)}%)`);

    console.log('\nTesting news API...');
    const headlines = await scrapeNewsHeadlines();
    console.log(`✓ Got ${headlines.length} headlines`);
    console.log(`✓ Sample: "${headlines[0].title.substring(0, 60)}..." from ${headlines[0].source}`);

    console.log('\n✅ All APIs working!');
}

test().catch(console.error);
