'use server';
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

// move to next API route
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

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const images = productsUrls[slug];

  const product = products.find(product => product.url === slug);
  if (!product) return <div className="text-center :text-xl text-black">Produit non trouvé</div>;

  return (
    <div className="mx-auto my-2 max-w-4xl px-4 md:py-8">
      <h1 className="ml-2 text-3xl font-bold text-orange-600 underline md:my-3">
        En Savoir Plus:
      </h1>
      <ProductSlider urlRoot={slug} products={images} />
      <ProductDetails product={product} />
      <ProductSlider urlRoot={slug} products={images} />
    </div>
  );
}
