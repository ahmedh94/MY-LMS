import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "isbc3byybg.ufs.sh",
      },
    ],
  },
};

export default nextConfig;
