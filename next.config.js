const securityHeaders = [
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "X-Frame-Options",
    value: "SAMEORIGIN",
  },
  {
    key: "X-XSS-Protection",
    value: "1; mode=block",
  },
];

const staticAssetCacheHeaders = [
  {
    key: "Cache-Control",
    value: "public, max-age=31536000, immutable",
  },
];

const imageOptimizerCacheHeaders = [
  {
    key: "Cache-Control",
    value: "public, max-age=86400, stale-while-revalidate=604800",
  },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compress: true,
  poweredByHeader: false,
  // Меньший Docker-образ: копируем .next/standalone + static
  output: "standalone",
  images: {
    // Timeweb: оптимизация на своём Node (sharp). На Vercel Hobby раньше ломалась.
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    qualities: [75, 80, 85, 90],
    minimumCacheTTL: 60 * 60 * 24,
    remotePatterns: [
      { protocol: "https", hostname: "api.znves.ru", pathname: "/**" },
      { protocol: "http", hostname: "62.84.115.11", port: "8000", pathname: "/**" },
    ],
  },
  compiler: {
    removeConsole:
      process.env.NODE_ENV === "production"
        ? {
            exclude: ["error", "warn"],
          }
        : false,
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
      {
        source: "/_next/static/(.*)",
        headers: staticAssetCacheHeaders,
      },
      {
        source: "/images/(.*)",
        headers: staticAssetCacheHeaders,
      },
      {
        source: "/_next/image",
        headers: imageOptimizerCacheHeaders,
      },
    ];
  },
  async rewrites() {
    return [
      // Google и браузеры по умолчанию запрашивают /favicon.ico — отдаём нашу иконку
      { source: "/favicon.ico", destination: "/icon.png" },
    ];
  },
};

module.exports = nextConfig;
