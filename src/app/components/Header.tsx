'use client';

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "../utils/utils";

export const Header = () => {
    const pathname = usePathname();

    const isActive = (path: string) => pathname === path;

    return (
        <header className="text-white py-2 md:p-4 bg-cover bg-center bg-[url('/bg/bg-salmon-6.avif')] ">
            <nav>
                <ul className="flex md:container mx-auto justify-around items-center md:ml-0 md:space-x-4">
                    <Link href="/" className={cn(`flex items-center`)}>
                        <Image className="rounded-xl md:w-36" src="/logo.jpg" alt="Mikael Hertz Poissons Fumés Artisanaux" width={70} height={30} />
                    </Link>
                    <Link href="/products" className={`text-xl font-bold md:text-4xl ${isActive('/products') && 'underline-offset-8 underline'}`}>
                        Produits
                    </Link>
                    <Link href="/contact" className={`text-xl font-bold md:text-4xl ${isActive('/contact') && 'underline-offset-8 underline'}`}>
                        Contact
                    </Link>
                    <Link href="/cart" className={`text-xl font-bold md:text-4xl ${isActive('/cart') && 'underline-offset-8 underline'}`}>
                        Panier
                    </Link>
                </ul>
            </nav>
        </header>
    );
};