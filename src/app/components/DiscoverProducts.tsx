'use server';

import Link from "next/link";
export const DiscoverProducts = async () => {
    return (
        <div className="container text-center md:my-4 md:px-4 rounded-lg">
            <h1 className="text-orange-600 mx-4 text-2xl font-semibold md:text-4xl ">Saumon fumé à l'ancienne</h1>
            <Link href="/products" >
                <p className="duration-300 bg-orange-500 w-10/12 mx-auto md:w-6/12 md:mx-auto font-bold text-xl text-white p-5 m-2 rounded-lg md:text-2xl xl:text-3xl md:font-semibold hover:bg-orange-700 transition-all">Découvrir Nos Produits</p>
            </Link>
            <p className="text-red-600 text-xl mt-3">Passez commande avant le Mardi 25 Mars 2025 pour livraison le Jeudi 17 Avril</p>
        </div>
    )
}