import type { NextConfig } from 'next';

const basePath = process.env.GITHUB_ACTIONS ? '/spirit-animal-podcast' : '';

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: false,
  basePath,
  assetPrefix: basePath || undefined,
  images: { unoptimized: true },
};

export default nextConfig;
