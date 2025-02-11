import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import type React from "react";
import Link from "next/link";
import { CartProvider } from "./contexts/CartContext";
import { ToastProvider } from "./components/ToastProvider";
import { CartSummary } from "./components/CartSummary";
import { GDPRBanner } from "./components/GDPRBanner";
import Image from "next/image";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mikael Hertz Poissons Fumés Artisanaux",
  description: "Les meilleurs saumons, truites et flétans fumés et élevés artisanalement à Lyon, France",
};

const Header = () => (
  <header className="bg-gray-900 text-white p-4">
    <nav className="container mx-auto flex justify-between items-center">
      <Link href="/" className="flex items-center text-xl font-bold">
        <Image className="rounded-xl w-auto" src="/logo.jpg" alt="Mikael Hertz Poissons Fumés Artisanaux" width={60} height={20} />
        <h3 className="hidden ml-5 sm:block">Mikael HERTZ</h3>
      </Link>
      <ul className="flex space-x-4">
        <li>
          <Link href="/" className="hover:text-gray-300">
            Accueil
          </Link>
        </li>
        <li>
          <Link href="/products" className="hover:text-gray-300">
            Produits
          </Link>
        </li>
        <li>
          <Link href="/contact" className="hover:text-gray-300">
            Contact
          </Link>
        </li>
        <li>
          <Link href="/cart" className="hover:text-gray-300">
            Panier
          </Link>
        </li>
      </ul>
    </nav>
  </header>
);

const Footer = () => (
  <footer className="bg-gray-900 text-white p-4 mt-8">
    <div className="container mx-auto text-center">
      <p>&copy; 2025 Mikael Hertz Poissons Fumés Artisanaux. Tous droits réservés.</p>
    </div>
  </footer>
);

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className={`${inter.className} bg-gray-50`}>
        <CartProvider>
          <ToastProvider />
          <Header />
          <main className="container mx-auto px-4 py-8">{children}</main>
          <CartSummary />
          <GDPRBanner />
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
