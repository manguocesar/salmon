import Link from 'next/link';
import React from 'react';
import { products } from '../constants/products';
import { ProductSlider } from '../components/ProductSlider';

const Cancel = () => {
  const images = products.map(product => product.imgUrl);
  return (
    <div className="my-5 text-black text-center">
      <h2 className="m-3 text-2xl">
        L'achat n'a pas eu lieu, veuillez réessayer
      </h2>
      <h2 className="m-3 text-2xl">
        Si le problème persiste, veuillez contacter <a href={`mailto:${process.env.NEXT_PUBLIC_MIKAEL_EMAIL}`}>Mikael HERTZ</a>
      </h2>
      <h2 className='text-2xl'>{process.env.NEXT_PUBLIC_MIKAEL_EMAIL}</h2>
      <h2 className='text-2xl'>06 62 19 63 58</h2>
      <Link href="/">
        <button
          type="button"
          className="m-5 rounded-lg bg-orange-600 p-3 text-3xl text-white hover:opacity-70"
        >
          Retour à l'Accueil
        </button>
      </Link>
      <ProductSlider urlRoot="products" products={images} />
    </div>
  );
};

export default Cancel;
