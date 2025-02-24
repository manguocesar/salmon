'use server';
import Link from 'next/link';
import { ProductSlider } from './components/ProductSlider';
import { products } from './constants/products';

export default async function NotFound() {
  const images = products.map(product => product.imgUrl);
  return (
    <main className="flex h-full flex-col items-center justify-center gap-2">
      <h2 className="text-3xl font-semibold text-black">Page inaccessible</h2>
      <Link
        href="/"
        className="mt-4 rounded-md bg-orange-500 px-4 py-2 text-2xl font-semibold text-white transition-colors hover:bg-orange-400"
      >
        Retour à la page d'accueil
      </Link>
      <ProductSlider urlRoot="products" products={images} />
    </main>
  );
}
