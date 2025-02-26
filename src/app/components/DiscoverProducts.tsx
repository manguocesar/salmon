'use server';

import Link from 'next/link';
export const DiscoverProducts = async () => {
  return (
    <div className="container mx-auto rounded-lg text-center md:my-4 md:px-4">
      <h1 className="mx-4 text-2xl font-semibold text-orange-600 md:text-4xl">
        Saumon fumé à l'ancienne
      </h1>
      <Link href="/products">
        <p className="active:scale-105 m-2 mx-auto w-10/12 rounded-lg bg-orange-500 p-5 text-2xl font-bold text-white transition-all duration-300 hover:bg-orange-700 md:mx-auto md:w-6/12 md:text-2xl md:font-semibold xl:text-3xl">
          Découvrir Nos Produits
        </p>
      </Link>
      <p className="my-3 mx-2 text-xl text-red-600">
        Passez commande avant le <strong>Mardi 25 Mars 2025</strong> pour livraison à domicile pour Pâques
      </p>
    </div>
  );
};
