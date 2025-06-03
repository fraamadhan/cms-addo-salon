import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "tflbkmldgsckioehelfx.supabase.co",
      },
      {
        protocol: "https",
        hostname: "api.sandbox.midtrans.com",
      },
    ],
  },
};

export default nextConfig;
