import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  webpack: (config) => {
    config.resolve.alias["@templates"] = path.resolve(__dirname, "../src/data/templates");
    config.resolve.alias["@template-types"] = path.resolve(__dirname, "../src/types");
    return config;
  },
};

export default nextConfig;
