'use client';

import Link from 'next/link';
import { Product } from '../types/products';
import Image from 'next/image';
import { cn } from '../lib/utils';
import toast from 'react-hot-toast';
import { useCart } from '../contexts/CartContext';

export const ProductCard = ({ product }: { product: Product }) => {
  const { addToCart } = useCart();
  const handleAddToCart = (product: Product) => {
    if (!product.available)
      return toast.error('Ce produit est actuellement en rupture de stock');
    addToCart({
      id: product.id,
      name: product.name,
      shortName: product.shortName,
      price: product.price,
      quantity: 1,
    });
  };

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
        className="animate-wiggle duration-15000 mb-2 w-full rounded-lg sm:h-40 md:mb-4 md:h-56 lg:h-72"
      />
      <h3 className="mb-1 text-xl font-semibold text-orange-600 md:mb-2">
        {product.name} <span className='md:hidden text-black text-lg italic'>-- {product.price}€</span>
      </h3>
      <p className="mb-2 text-justify text-gray-600 md:mb-4">
        {product.description}
      </p>
      <button
        className={cn(
          !product.available && 'cursor-not-allowed opacity-50',
          'active:scale-105 rounded bg-orange-600 px-4 py-2 font-semibold text-white transition duration-300 hover:bg-orange-700',
        )}
        onClick={() => handleAddToCart(product)}
        disabled={!product.available}
      >

        {product.available ? 'Ajouter au Panier' : 'Rupture de Stock'}

      </button>
      <Link
        href={`/products/${product.url}`}
        className=" font-bold text-gray-600 hover:underline"
      >
        <p className="animate-right duration-10000 m-2 underline underline-offset-4 md:no-underline">En Savoir Plus</p>
      </Link>
    </div>
  );
};
