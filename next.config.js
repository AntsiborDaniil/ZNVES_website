const isDev = process.env.NODE_ENV !== "production";

const cspDirectives = {
  "default-src": ["'self'"],
  "script-src": [
    "'self'",
    "https://api-maps.yandex.ru",
    "https://yastatic.net",
    "https://core-renderer-tiles.maps.yandex.net",
    "https://*.maps.yandex.net",
  ],
  "style-src": ["'self'", "'unsafe-inline'"],
  "img-src": [
    "'self'",
    "data:",
    "https://*.yandex.ru",
    "https://yandex.ru",
    "https://*.yandex.net",
    "https://yastatic.net",
    "https://unpkg.com",
    "https://*.tile.openstreetmap.org",
    "https://*.2gis.com",
    "https://widgets.2gis.com",
  ],
  "font-src": ["'self'", "data:"],
  "connect-src": [
    "'self'",
    "https://*.yandex.ru",
    "https://*.yandex.net",
    "https://api-maps.yandex.ru",
    "https://suggest-maps.yandex.ru",
    "https://yastatic.net",
    "https://nominatim.openstreetmap.org",
    "https://*.2gis.com",
    "https://widgets.2gis.com",
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
