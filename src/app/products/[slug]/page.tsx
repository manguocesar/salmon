'use client';

import { useParams } from 'next/navigation';
import { products } from '../../constants/products';
import { ProductHeader } from '@/app/components/ProductHeader';
import { ProductSlider } from '@/app/components/ProductSlider';
import { ProductDetails } from '@/app/components/ProductDetails';
import {
  coeurSaumonUrls,
  saumonFumePaveUrls,
  saumonFumeChaudPoivreEntierPUrls,
  saumonFumeChaudNaturePaveUrls,
  crevettesUrls,
  truitesUrls,
  saumonFumeEntierUrls,
  fletanUrls,
  saumonFumePretrancheUrls,
  saumonGravadPretrancheUrls,
  saumonFumeChaudPoivrePaveUrls,
  saumonGravadEntierUrls,
} from '@/app/constants';

const productsUrls: { [key: string]: string[] } = {
  saumonFumeEntier: saumonFumeEntierUrls,
  saumonFumePretranche: saumonFumePretrancheUrls,
  coeurSaumon: coeurSaumonUrls,
  saumonFumePave: saumonFumePaveUrls,
  saumonGravadEntier: saumonGravadEntierUrls,
  saumonGravadPretranche: saumonGravadPretrancheUrls,
  saumonFumeChaudPoivreEntier: saumonFumeChaudPoivreEntierPUrls,
  saumonFumeChaudPoivrePave: saumonFumeChaudPoivrePaveUrls,
  saumonFumeChaudNaturePave: saumonFumeChaudNaturePaveUrls,
  crevettes: crevettesUrls,
  fletan: fletanUrls,
  truite: truitesUrls,
  couteau: products.map(product => product.img),
};

export default function Page() {
  const { slug } = useParams();

  const images = typeof slug === 'string' ? productsUrls[slug] || products.map(product => product.img) : products.map(product => product.img);


  const product = products.find(product => product.url === slug);

  if (!product) {
    return <div className="">Produit non trouvé</div>;
  }

  return (
    <div className="mx-auto my-2 max-w-4xl px-4 md:py-8">
      <ProductHeader />
      {typeof slug === 'string' && (
        <ProductSlider urlRoot={slug} products={images} />
      )}
      <ProductDetails product={product} />
      {typeof slug === 'string' && (
        <ProductSlider urlRoot={slug} products={images} />
      )}
    </div>
  );
}
