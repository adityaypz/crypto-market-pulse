import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Crypto Market Pulse - Real-Time Market Intelligence',
    description: 'Live crypto market analysis with regime detection, narrative tracking, and volatility insights. No API keys required.',
    keywords: ['crypto', 'cryptocurrency', 'market analysis', 'bitcoin', 'ethereum', 'market intelligence', 'trading'],
    authors: [{ name: 'moon' }],
    openGraph: {
        title: 'Crypto Market Pulse',
        description: 'Real-time crypto market intelligence and narrative analysis',
        type: 'website',
        siteName: 'Crypto Market Pulse',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Crypto Market Pulse',
        description: 'Real-time crypto market intelligence and narrative analysis',
    },
    robots: {
        index: true,
        follow: true,
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>{children}</body>
        </html>
    );
}
