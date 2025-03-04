'use server';

import Link from "next/link";

export const Footer = async () => (
  <footer className="bg-gray-900 bg-[url('/bg/bg-orange.jpg')] p-2 text-white md:mt-8 md:p-4">
    <div className="container mx-auto text-center">
      <p className="underline underline-offset-4">
        <Link href="/mentions-legales">2025 Mikael Hertz - Poissons Fumés Artisanaux - Mentions Légales</Link>
      </p>
    </div>
  </footer>
);
