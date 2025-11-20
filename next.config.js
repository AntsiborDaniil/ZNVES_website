const isDev = process.env.NODE_ENV !== "production";

// Получаем API URL из переменной окружения
const apiBaseUrl =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://158.160.115.103:8000";
// Извлекаем домен из URL для CSP
const apiDomain = apiBaseUrl.replace(/^https?:\/\//, "").split("/")[0];

const cspDirectives = {
  "default-src": ["'self'"],
  "script-src": ["'self'"],
  "style-src": ["'self'", "'unsafe-inline'"],
  "img-src": [
    "'self'",
    "data:",
    "https://*.yandex.ru",
    "https://*.yandex.net",
    "https://unpkg.com",
    "https://*.tile.openstreetmap.org",
    "https://*.2gis.com",
    "https://widgets.2gis.com",
    apiBaseUrl, // API для изображений
  ],
  "font-src": ["'self'", "data:"],
  "connect-src": [
    "'self'",
    "https://*.yandex.ru",
    "https://*.yandex.net",
    "https://nominatim.openstreetmap.org",
    "https://*.2gis.com",
    "https://widgets.2gis.com",
    apiBaseUrl, // API для запросов
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

if (isDev) {
  cspDirectives["script-src"].push("'unsafe-inline'", "'unsafe-eval'");
}

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
  images: {
    qualities: [75, 80, 85, 90, 95, 100],
    remotePatterns: [
      {
        protocol: "http",
        hostname: "158.160.115.103",
        port: "8000",
        pathname: "/media/**",
      },
    ],
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
