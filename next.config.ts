import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  outputFileTracingRoot: path.resolve(__dirname),
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@": path.resolve(__dirname, "src"),
      "react-router-dom$": path.resolve(__dirname, "src/lib/react-router-dom.tsx"),
    };

    return config;
  },
};

export default nextConfig;
