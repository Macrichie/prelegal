import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  turbopack: {
    resolveAlias: {
      "@templates": path.resolve(__dirname, "../src/data/templates"),
      "@template-types": path.resolve(__dirname, "../src/types"),
    },
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
