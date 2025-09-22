import { resolve } from "path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },

  // Webpack alias
  webpack: (config) => {
    config.resolve.alias["@"] = resolve(__dirname, "src");
    return config;
  },
  // Turbopack alias
  experimental: {
    turbo: {
      resolveAlias: {
        "@": "./src",
      },
    },
  },
};

export default nextConfig;
