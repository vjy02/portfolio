import type { NextConfig } from "next";
import fs from "fs";

const packageJson = JSON.parse(fs.readFileSync("./package.json", "utf8"));

const buildTime = new Date().toISOString();

const nextConfig: NextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_APP_VERSION: packageJson.version,
    NEXT_PUBLIC_LAST_DEPLOYED_AT: buildTime,
  },
};

export default nextConfig;
