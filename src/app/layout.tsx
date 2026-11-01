import { Inter } from "next/font/google";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import NavigationTracker from "../components/NavigationTracker/NavigationTracker";
import { CartProvider } from "../contexts/CartContext";
import { AuthProvider } from "../contexts/AuthContext";
import { CatalogCategoriesProvider } from "../contexts/CatalogCategoriesContext";
import { ToastProvider } from "../components/ui/ToastProvider/ToastProvider";
import ClientModalHosts from "../components/ClientModalHosts/ClientModalHosts";
import CookieBanner from "../components/CookieBanner/CookieBanner";
import MockProvider from "../components/MockProvider/MockProvider";
import { fetchCatalogCategories } from "../api/catalog/catalogApi";

/* Без массива weight: Turbopack падает на next/font/google
   ("queries have exactly one entry" / @vercel/turbopack-next/.../font).
   Variable Inter тянет все начертания одним файлом. */
const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
  adjustFontFallback: true,
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://znves.ru";
const defaultTitle = "ZNVES";
const defaultDescription =
  "Интернет-магазин стильной одежды с фокусом на посадке и качестве. Доставка по России";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: defaultTitle,
    template: "%s | ZNVES",
  },
  description: defaultDescription,
  icons: {
    icon: [{ url: "/icon.png", type: "image/png", sizes: "512x512" }],
    apple: [{ url: "/icon.png", type: "image/png", sizes: "512x512" }],
  },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: siteUrl,
    siteName: "ZNVES",
    title: defaultTitle,
    description: defaultDescription,
    images: [
      {
        // То же фото, что desktop hero; JPEG — для превью в браузерах/мессенджерах
        url: "/images/og-hero.jpg",
        width: 1200,
        height: 900,
        alt: "ZNVES",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: defaultDescription,
    images: ["/images/og-hero.jpg"],
  },
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  const initialCategories = await fetchCatalogCategories();

  return (
    <html lang="ru" className={inter.variable}>
      <body className={inter.className}>
        <MockProvider>
          <ToastProvider>
            <AuthProvider>
              <CartProvider>
                <CatalogCategoriesProvider initialCategories={initialCategories}>
                  <NavigationTracker />
                  {children}
                  <ClientModalHosts />
                  <CookieBanner />
                </CatalogCategoriesProvider>
              </CartProvider>
            </AuthProvider>
          </ToastProvider>
        </MockProvider>
      </body>
    </html>
  );
}
