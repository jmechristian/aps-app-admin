import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Prevent Next/Turbopack from inferring an incorrect monorepo root when
  // multiple lockfiles exist on disk (which can break node_modules resolution).
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
