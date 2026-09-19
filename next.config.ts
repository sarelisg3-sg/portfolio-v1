import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./lib/i18n/request.ts");

const nextConfig: NextConfig = {
  images: {
    // Diagrams with thin text need more than the default quality 75
    qualities: [75, 90],
    remotePatterns: [
      { protocol: "https", hostname: "www.artiumonline.com" },
    ],
  },
};

export default withNextIntl(nextConfig);
