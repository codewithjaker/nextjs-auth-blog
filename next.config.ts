import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: { unoptimized: true },
  output: "standalone",
  trailingSlash: true,
  generateEtags: false,
  typescript: {
    ignoreBuildErrors: true,
  },
  // eslint: {
  //   ignoreDuringBuilds: true,
  // },
  reactCompiler: true,

  experimental: {
    serverActions: {
      bodySizeLimit: "5mb",
    },
  },
  skipTrailingSlashRedirect: true,
};

export default nextConfig;
