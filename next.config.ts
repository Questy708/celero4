import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  allowedDevOrigins: [
    "preview-chat-9be07bf4-7ab2-4c99-8abb-5605efe30996.space-z.ai",
    ".space-z.ai",
    "localhost",
    "127.0.0.1",
  ],
};

export default nextConfig;
