import type { NextConfig } from 'next';
import path from 'path';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  turbopack: {
    root: path.resolve(__dirname), 
  },
  images: {
    remotePatterns: [
      new URL('https://images.microcms-assets.io/assets/**/**.png'),
    ],
  },
};

export default nextConfig;