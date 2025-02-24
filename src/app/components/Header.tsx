'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '../utils/utils';

export const Header = () => {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <header className="bg-[url('/bg/bg-salmon-6.avif')] bg-cover bg-center py-2 text-white md:p-4">
      <nav>
        <ul className="mx-3 flex items-center justify-around md:container md:ml-0 md:space-x-4">
          <Link href="/" className={cn(`flex items-center`)}>
            <Image
              className="rounded-xl md:w-36"
              src="/logo.jpg"
              alt="Mikael Hertz Poissons Fumés Artisanaux"
              width={70}
              height={30}
            />
          </Link>
          <Link
            href="/products"
            className={`text-2xl font-bold md:text-4xl ${isActive('/products') && 'underline underline-offset-8'}`}
          >
            Produits
          </Link>
          <Link
            href="/contact"
            className={`text-2xl font-bold md:text-4xl ${isActive('/contact') && 'underline underline-offset-8'}`}
          >
            Contact
          </Link>
          <Link
            href="/cart"
            className={`text-2xl font-bold md:text-4xl ${isActive('/cart') && 'underline underline-offset-8'}`}
          >
            Panier
          </Link>
        </ul>
      </nav>
    </header>
  );
};
