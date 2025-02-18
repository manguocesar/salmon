'use server';

import Link from "next/link";

export const DiscoverProducts = async () => {

    return (
        <div className="text-center p-2 md:p-4 rounded-lg">
            <h1 className="text-orange-500 text-4xl">Poissons Fumés Artisanalement</h1>
            <p className="text-2xl font-semibold m-6">Saumons, truites et flétans exquis</p>
            <Link
                href="/products"
                className="bg-orange-600 font-bold text-xl text-white p-5 rounded-lg md:text-3xl md:font-semibold hover:bg-orange-700 transition-all duration-300"
            >
                Découvrir Nos Produits
            </Link>
        </div>
    )
}