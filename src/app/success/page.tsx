'use client';

import Link from 'next/link';
import { runFireworks } from '../lib/utils';
import { useEffect } from 'react';
import Image from 'next/image';
import { ProductSlider } from '../components/ProductSlider';
import { products } from '../constants/products';

const Success = () => {
  useEffect(() => {
    localStorage.clear();
    runFireworks();
  }, []);

  const images = products.map(product => product.imgUrl);

  return (
    <div className="mx-auto flex w-9/12 flex-col items-center justify-center text-center text-2xl text-black">
      <Image
        className="my-4 rounded-xl"
        src="/logo.jpg"
        alt="Mikael Hertz Poissons Fumés Artisanaux"
        width={400}
        height={400}
      />
      <h2>Merci pour votre commande!</h2>
      <p className="email-msg">Verifiez vos emails pour la commande.</p>
      <p className="description">
        Si vous avez des questions, n'hésitez pas à me contacter:
      </p>
      <a className="m-3 font-bold" href="mailto:mikaelhertz@me.com">
        mikaelhertz@me.com
      </a>
      <p>06 62 19 63 58</p>
      <Link href="/">
        <button
          type="button"
          className="m-5 rounded-lg bg-orange-700 p-3 text-3xl text-white hover:opacity-70"
        >
          Retour à l'Accueil
        </button>
      </Link>
      <ProductSlider urlRoot="products" products={images} />
    </div>
  );
};

export default Success;
