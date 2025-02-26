'use client';

import Link from 'next/link';
import { Product } from '../types/products';
import Image from 'next/image';
import { cn } from '../lib/utils';
import toast from 'react-hot-toast';
import { useCart } from '../contexts/CartContext';
import { motion } from 'framer-motion';
import { animateRight, initialRight, transitionRight } from '../constants/animation';

export const ProductCard = ({ product }: { product: Product }) => {
  const { addToCart, cart } = useCart();
  const handleAddToCart = (product: Product) => {
    if (!product.available)
      return toast.error('Ce produit est actuellement en rupture de stock');
    addToCart({
      id: product.id,
      name: product.name,
      shortName: product.shortName,
      price: product.price,
      quantity: 1,
      imgUrl: product.imgUrl,
    });
  };

  const cartProduct = cart.find((item) => item.id === product.id);


  return (
    <div
      key={product.id}
      className="mx-2 rounded-lg bg-white p-2 shadow-md md:p-6"
    >
      <Image
        src={`/${product.url}/${product.img}`}
        alt={product.name}
        width={300}
        height={200}
        className="animate-wiggle duration-15000 mb-2 rounded-lg w-full"
      />
      <motion.div
        initial={initialRight}
        transition={transitionRight}
        whileInView={animateRight}>
        <h3 className="mb-1 text-xl font-semibold text-orange-600 md:mb-2">
          {product.name} <span className='md:hidden text-gray-400 text-lg italic'>-- {product.price}€</span>
        </h3>
        <p className="mb-2 text-justify text-gray-600 md:mb-4">
          {product.description}
        </p>
        <div className='flex items-center'>
          <button
            className={cn(
              !product.available && 'cursor-not-allowed opacity-50',
              'animate-shake duration-10000 active:scale-110 rounded bg-orange-600 px-4 py-2 font-semibold text-white transition  hover:bg-orange-700',
            )}
            onClick={() => handleAddToCart(product)}
            disabled={!product.available}
          >

            {product.available ? 'Ajouter au Panier' : 'Rupture de Stock'}

          </button>
          {cartProduct?.quantity ? <p className='ml-5 text-2xl text-orange-600'>x {cartProduct?.quantity}</p> : null}
        </div>
        <Link
          href={`/products/${product.url}`}
          className=" font-bold text-gray-600 hover:underline"
        >
          <p className="animate-right duration-10000 m-2 underline underline-offset-4 md:no-underline">En Savoir Plus</p>
        </Link>
      </motion.div>
    </div>
  );
};
