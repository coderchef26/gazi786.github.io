import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['images.unsplash.com', 'via.placeholder.com'],
  },
  // Temporarily disable experimental features to fix build issues
  // experimental: {
  //   optimizePackageImports: ['@mui/material', '@mui/icons-material'],
  // },
  webpack: (config, { isServer }) => {
    // Fix for missing modules
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      };
    }
    return config;
  },
};

export default nextConfig;
