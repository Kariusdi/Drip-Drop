const createNextIntlPlugin = require("next-intl/plugin");

const withNextIntl = createNextIntlPlugin();
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: false,
  trailingSlash: true, // บังคับให้ใช้ path แบบ static ได้
  eslint: {
    ignoreDuringBuilds: true, // ✅ ปิดการเช็ก lint ตอน build
  },
};

export default withNextIntl(nextConfig);
