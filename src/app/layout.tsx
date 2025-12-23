import { Inter, Montserrat, Plus_Jakarta_Sans, Roboto } from "next/font/google";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import NavigationTracker from "../components/NavigationTracker/NavigationTracker";
import { CartProvider } from "../contexts/CartContext";
import { ToastProvider } from "../components/ui/ToastProvider/ToastProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: "ZNVES",
  description: "ZNVES storefront built with Next.js",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ru">
      <body
        className={`${roboto.variable} ${inter.variable} ${montserrat.variable} ${plusJakarta.variable}`}
      >
        <CartProvider>
          <ToastProvider>
            <NavigationTracker />
            {children}
          </ToastProvider>
        </CartProvider>
      </body>
    </html>
  );
}
