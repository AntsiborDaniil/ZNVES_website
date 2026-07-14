export const getSiteUrl = (): string =>
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://znves.ru";

export const STATIC_SITEMAP_PATHS = [
  "",
  "/catalog",
  "/new-in",
  "/delivery-payment",
  "/returns",
  "/privacy",
  "/public-offer",
] as const;

export const ROBOTS_DISALLOW_PATHS = [
  "/account",
  "/checkout",
  "/cart",
  "/login",
  "/register",
] as const;
