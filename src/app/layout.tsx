import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import type React from "react";
import { CartProvider } from "./contexts/CartContext";
import { ToastProvider } from "./components/ToastProvider";
import { CartSummary } from "./components/CartSummary";
import { GDPRBanner } from "./components/GDPRBanner";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mikael Hertz Poissons Fumés Artisanaux",
  description: "Les meilleurs saumons, truites et flétans fumés et élevés artisanalement à Lyon, France",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className={`${inter.className} bg-gray-50`}>
        <CartProvider>
          <Header />
          <ToastProvider />
          <main className="container overflow-hidden mx-auto pt-2 md:py-8">{children}</main>
          <CartSummary />
          <GDPRBanner />
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
