'use server';
import { ProductCard } from './ProductCard';
import { products } from '../constants/products';

export const ArtisanalSelection = async () => {
  return (
    <div className="container mx-auto my-3 rounded-lg md:py-4">
      <h2 className="mx-2 text-3xl text-orange-600">Sélection Artisanale:</h2>
      <div className="grid grid-cols-1 gap-3 md:mt-3 md:grid-cols-2 md:gap-8 lg:grid-cols-3 xl:grid-cols-4">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};
