import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  allowedDevOrigins: ["127.0.0.1", "localhost", "192.168.1.32"],
  images: {
    qualities: [25, 50, 75, 95, 100],
  },
};

export default nextConfig;
