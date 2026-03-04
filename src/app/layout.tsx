import { Inter, Montserrat, Plus_Jakarta_Sans, Roboto } from "next/font/google";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import NavigationTracker from "../components/NavigationTracker/NavigationTracker";
import { CartProvider } from "../contexts/CartContext";
import { AuthProvider } from "../contexts/AuthContext";
import { ToastProvider } from "../components/ui/ToastProvider/ToastProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
  preload: true,
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
  preload: true,
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-roboto",
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
    icon: [
      { url: "/icon.png", type: "image/png" },
      { url: "/images/logo.png", type: "image/png", sizes: "any" },
    ],
    apple: "/icon.png",
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
    <html lang="ru">
      <head>
        {/* Предзагрузка скрипта виджета Telegram — при переходе на /account или checkout кнопка уже в кэше */}
        <link
          rel="preload"
          href="https://telegram.org/js/telegram-widget.js?22"
          as="script"
        />
      </head>
      <body
        className={`${roboto.variable} ${inter.variable} ${montserrat.variable} ${plusJakarta.variable}`}
      >
        <AuthProvider>
          <CartProvider>
            <ToastProvider>
              <NavigationTracker />
              {children}
            </ToastProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
