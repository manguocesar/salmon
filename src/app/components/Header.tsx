'use client';

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const Header = () => {
    const pathname = usePathname();

    const isActive = (path: string) => pathname === path;

    return (
        <header className="bg-gray-900 text-white p-2 md:p-4">
            <nav className="container mx-auto flex md:justify-between items-center">
                <Link href="/" className="flex items-center text-xl font-bold">
                    <Image className="rounded-xl w-auto" src="/logo.jpg" alt="Mikael Hertz Poissons Fumés Artisanaux" width={60} height={20} />
                    <h3 className="hidden ml-5 sm:block">Mikael HERTZ</h3>
                </Link>
                <ul className="flex space-x-2 ml-3 md:ml-0 md:space-x-4">
                    <li>
                        <Link href="/" className={`text-lg font-semibold md:text-2xl hover:text-orange-500 ${isActive('/') ? 'text-orange-600' : ''}`}>
                            Accueil
                        </Link>
                    </li>
                    <li>
                        <Link href="/products" className={`text-lg font-semibold md:text-2xl hover:text-orange-500 ${isActive('/products') ? 'text-orange-600' : ''}`}>
                            Produits
                        </Link>
                    </li>
                    <li>
                        <Link href="/contact" className={`text-lg font-semibold md:text-2xl hover:text-orange-500 ${isActive('/contact') ? 'text-orange-600' : ''}`}>
                            Contact
                        </Link>
                    </li>
                    <li>
                        <Link href="/cart" className={`text-lg font-semibold md:text-2xl hover:text-orange-500 ${isActive('/cart') ? 'text-orange-600' : ''}`}>
                            Panier
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
};