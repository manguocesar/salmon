'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '../lib/utils';

export const Header = () => {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <header className="bg-[url('/bg/bg-salmon-6.avif')] bg-cover bg-center py-2 text-white md:p-4">
      <nav>
        <ul className="mx-3 flex items-center justify-around md:container md:ml-0 md:space-x-4">
          <Link href="/" className={cn(`flex items-center`)}>
            <div className='w-16 sm:w-32 md:w-56 lg:w-80'>
              <Image
                className="rounded-xl "
                src="/logo.jpg"
                alt="Mikael Hertz Poissons Fumés Artisanaux"
                height={90}
                width={180}

              />
            </div>
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
