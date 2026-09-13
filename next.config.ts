import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Necessário para swagger-ui-react com bundlers do Next.js
  transpilePackages: ["swagger-ui-react", "swagger-client"],
};

export default nextConfig;
