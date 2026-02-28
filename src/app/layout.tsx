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

export const metadata: Metadata = {
  title: {
    default: "ZNVES — Одежда и аксессуары",
    template: "%s | ZNVES",
  },
  description:
    "ZNVES — интернет-магазин стильной одежды: футболки, худи, джинсы, куртки и многое другое. Удобная доставка СДЭК и Яндекс. Доставка по России.",
  icons: {
    icon: "/images/logo.png",
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
