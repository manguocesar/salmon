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
    <div className="mx-auto flex w-11/12 flex-col items-center justify-center text-center text-2xl text-black">
      {/* Placeholder Support: -- layout="responsive" intrinsic responsive fixed fill */}

      <Image
        className="my-4 rounded-xl"
        src="/logo.jpg"
        alt="Mikael Hertz Poissons Fumés Artisanaux"
        width={400}
        height={400}
      />
      <h2>Merci pour votre commande!</h2>
      <p className="m-3 ">Verifiez vos emails pour le détail de la commande.</p>
      <p className="m-3 ">
        Si vous avez des questions, n'hésitez pas à me contacter:
      </p>
      <a className="font-bold" href={`mailto:${process.env.NEXT_PUBLIC_MIKAEL_EMAIL}`}>
        {process.env.NEXT_PUBLIC_MIKAEL_EMAIL}
      </a>
      <p className='m-3 '>06 62 19 63 58</p>
      <p>A bientôt</p>
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
