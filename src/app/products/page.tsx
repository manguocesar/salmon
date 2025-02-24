'use client';
import { products } from '../constants/products';
import Link from 'next/link';
import { ProductCard } from '../components/ProductCard';
import { ProductHeader } from '../components/ProductHeader';
import { ProductSlider } from '../components/ProductSlider';
import { processUrls } from '../constants/processUrls';

export default function Products() {
  return (
    <div className="container mx-auto">
      <ProductHeader />
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
        <Link href="/cart" className="my-3 flex text-black md:hidden">
          <button className="mx-auto w-8/12 rounded-lg bg-orange-600 px-6 py-3 text-lg font-semibold text-white transition duration-300 hover:bg-orange-700 md:w-full">
            Voir mon panier
          </button>
        </Link>
      </div>
      <ProductSlider urlRoot="process" products={processUrls} />
    </div>
  );
}
