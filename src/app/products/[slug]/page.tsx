'use client';

import { useParams } from 'next/navigation';
import { ProductHeader } from '@/app/components/ProductHeader';
import { ProductSlider } from '@/app/components/ProductSlider';
import { ProductDetails } from '@/app/components/ProductDetails';
import {
  coeurSaumonUrls, products,
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
  couteau: [],
};

export default function Page() {
  const { slug } = useParams();
  if (typeof slug !== 'string') return <div className="">Produit non trouvé</div>;

  const images = productsUrls[slug];

  const product = products.find(product => product.url === slug);

  if (!product) {
    return <div className=" text-center">Produit non trouvé</div>;
  }

  return (
    <div className="mx-auto my-2 max-w-4xl px-4 md:py-8">
      <ProductHeader />
      <ProductSlider urlRoot={slug} products={images} />
      <ProductDetails product={product} />
      <ProductSlider urlRoot={slug} products={images} />
    </div>
  );
}
