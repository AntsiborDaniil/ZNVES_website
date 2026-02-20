/** Базовый URL бэкенда (API). Всегда HTTPS. */
export const API_BASE_URL =
  (process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, "") || "https://test-znves.ru");

/**
 * Домен фронта (где открыт сайт с виджетом).
 * В BotFather для виджета "Login with Telegram" в Domain нужно указать именно этот хост.
 * Прод: znves-website.vercel.app
 */
export const FRONTEND_HOST =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/^https?:\/\//, "").replace(/\/$/, "") ||
  "znves-website.vercel.app";
