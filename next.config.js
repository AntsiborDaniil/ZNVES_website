const isDev = process.env.NODE_ENV !== "production";

const cspDirectives = {
  "default-src": ["'self'"],
  "script-src": [
    "'self'",
    "https://ndd-widget.landpro.site",
    "https://widget-pvz.dostavka.yandex.net",
    "https://mc.yandex.ru",
    "https://api-maps.yandex.ru",
    "https://yastatic.net",
    "https://core-renderer-tiles.maps.yandex.net",
    "https://*.maps.yandex.net",
    // Yandex Maps и виджет Яндекс.Доставки требуют unsafe-inline и unsafe-eval для работы
    "'unsafe-inline'",
    "'unsafe-eval'",
  ],
  "style-src": ["'self'", "'unsafe-inline'"],
  "img-src": [
    "'self'",
    "data:",
    "https://ndd-widget.landpro.site",
    "https://widget-pvz.dostavka.yandex.net",
    "https://mc.yandex.ru",
    "https://*.yandex.ru",
    "https://yandex.ru",
    "https://*.yandex.net",
    "https://yastatic.net",
    "https://unpkg.com",
    "https://*.tile.openstreetmap.org",
    "https://*.2gis.com",
    "https://widgets.2gis.com",
    "http://62.84.115.11:8000",
  ],
  "font-src": [
    "'self'",
    "data:",
    "https://yastatic.net",
    "https://*.yandex.net",
    "https://fonts.gstatic.com",
    "https://fonts.googleapis.com",
  ],
  "connect-src": [
    "'self'",
    "https://ndd-widget.landpro.site",
    "https://widget-pvz.dostavka.yandex.net",
    "https://mc.yandex.ru",
    "https://*.yandex.ru",
    "https://*.yandex.net",
    "https://api-maps.yandex.ru",
    "https://suggest-maps.yandex.ru",
    "https://yastatic.net",
    "https://nominatim.openstreetmap.org",
    "https://*.2gis.com",
    "https://widgets.2gis.com",
    "http://62.84.115.11:8000",
  ],
  "frame-src": [
    "'self'",
    "https://yandex.ru",
    "https://*.yandex.ru",
    "https://widgets.2gis.com",
    "https://*.2gis.com",
  ],
  "frame-ancestors": ["'self'"],
};

const cspHeader = Object.entries(cspDirectives)
  .map(([directive, values]) => `${directive} ${values.join(" ")}`)
  .join("; ");

const securityHeaders = [
  {
    key: "Content-Security-Policy",
    value: cspHeader,
  },
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

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compress: true,
  poweredByHeader: false,
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    qualities: [75, 80, 85, 90],
    remotePatterns: [
      { protocol: 'http', hostname: '62.84.115.11', port: '8000', pathname: '/**' },
    ],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

module.exports = nextConfig;
