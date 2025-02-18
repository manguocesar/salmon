'use server';

import Link from "next/link";

export const DiscoverProducts = async () => {

    return (
        <div className="text-center my-4 md:p-4 rounded-lg">
            <h1 className="text-orange-500 text-4xl">Poissons Fumés Artisanalement</h1>
            <Link href="/products" >
                <p className="bg-orange-600 md:w-6/12 md:mx-auto font-bold text-2xl text-white p-5 m-3 rounded-lg md:text-3xl md:font-semibold hover:bg-orange-700 transition-all duration-300">Découvrir Nos Produits</p>
            </Link>
        </div>
    )
}