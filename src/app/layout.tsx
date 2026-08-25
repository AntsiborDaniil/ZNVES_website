import { Inter } from "next/font/google";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import NavigationTracker from "../components/NavigationTracker/NavigationTracker";
import { CartProvider } from "../contexts/CartContext";
import { AuthProvider } from "../contexts/AuthContext";
import { ToastProvider } from "../components/ui/ToastProvider/ToastProvider";
import ClientModalHosts from "../components/ClientModalHosts/ClientModalHosts";
import CookieBanner from "../components/CookieBanner/CookieBanner";
import MockProvider from "../components/MockProvider/MockProvider";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://znves.ru";
const defaultTitle = "ZNVES — Одежда и аксессуары";
const defaultDescription =
  "ZNVES — интернет-магазин стильной одежды: футболки, худи, джинсы, куртки и многое другое. Удобная доставка СДЭК и Яндекс. Доставка по России.";

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
        url: "/images/logo.png",
        width: 512,
        height: 512,
        alt: "ZNVES",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: defaultTitle,
    description: defaultDescription,
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ru" className={inter.variable}>
      <body className={inter.className}>
        <MockProvider>
          <ToastProvider>
            <AuthProvider>
              <CartProvider>
                <NavigationTracker />
                {children}
                <ClientModalHosts />
                <CookieBanner />
              </CartProvider>
            </AuthProvider>
          </ToastProvider>
        </MockProvider>
      </body>
    </html>
  );
}
