import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://multiassistapi.fly.dev/api/:path*'
      }
    ]
  }
};

module.exports = nextConfig;
