import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    // Disable static optimization for API routes that need dynamic data
    experimental: {
        serverActions: {
            bodySizeLimit: '2mb',
        },
    },
    // Ensure proper handling of external packages
    serverExternalPackages: ['playwright'],
};

export default nextConfig;
