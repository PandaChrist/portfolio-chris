import type { NextConfig } from "next";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  assetPrefix: basePath,
  // Every route is emitted as <route>/index.html. GitHub Pages resolves those
  // directly, which keeps /fr/projets/tugo/ working without any server rules.
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
