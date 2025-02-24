'use client';
import { useCart } from '../../contexts/CartContext';
import toast from 'react-hot-toast';
import { products } from '../../constants/products';
import { Product } from '../../types/products';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { CircleChevronLeft } from 'lucide-react';
import { ProductHeader } from '@/app/components/ProductHeader';
import { fletanUrls } from '@/app/constants/fletanUrls';
import { saumonFumeEntierUrls } from '@/app/constants/saumon-fume-entier-urls';
import { saumonFumePretrancheUrls } from '@/app/constants/saumon-fume-pretranche-urls';
import { crevettesUrls } from '@/app/constants/crevettesUrls';
import { coeurSaumonUrls } from '@/app/constants/coeurSaumonUrls';
import { saumonFumePaveUrls } from '@/app/constants/saumonFumePaveUrls';
import { saumonGravadEntierUrls } from '@/app/constants/saumonGravadEntierUrls';
import { saumonGravadPretrancheUrls } from '@/app/constants/saumonGravadPretrancheUrls';
import { saumonFumeChaudPoivrePaveUrls } from '@/app/constants/saumonFumeChaudPoivrePaveUrls';
import { truitesUrls } from '@/app/constants/truitesUrls';
import { ProductSlider } from '@/app/components/ProductSlider';
import { Video } from '@/app/components/Video';
import { Suspense } from 'react';
import { saumonFumeChaudNaturePaveUrls } from '@/app/constants/saumonFumeChaudNaturePaveUrls';
import { saumonFumeChaudPoivreEntierPUrls } from '@/app/constants/saumonFumeChaudPoivreEntierUrls';

export default function Page() {
  const { slug } = useParams();
  const { addToCart } = useCart();
  const handleAddToCart = (product: Product) => {
    if (product.available) {
      addToCart({
        id: product.id,
        name: product.name,
        shortName: product.shortName,
        price: product.price,
        quantity: 1,
      });
    } else {
      toast.error('Ce produit est actuellement en rupture de stock');
    }
  };

  let images: string[];
  switch (slug) {
    case 'saumonFumeEntier':
      images = saumonFumeEntierUrls;
      break;
    case 'saumonFumePretranche':
      images = saumonFumePretrancheUrls;
      break;
    case 'coeurSaumon':
      images = coeurSaumonUrls;
      break;
    case 'saumonFumePave':
      images = saumonFumePaveUrls;
      break;
    case 'saumonGravadEntier':
      images = saumonGravadEntierUrls;
      break;
    case 'saumonGravadPretranche':
      images = saumonGravadPretrancheUrls;
      break;
    case 'saumonFumeChaudPoivreEntier':
      images = saumonFumeChaudPoivreEntierPUrls;
      break;
    case 'saumonFumeChaudPoivrePave':
      images = saumonFumeChaudPoivrePaveUrls;
      break;
    case 'saumonFumeChaudNaturePave':
      images = saumonFumeChaudNaturePaveUrls;
      break;
    case 'crevettes':
      images = crevettesUrls;
      break;
    case 'fletan':
      images = fletanUrls;
      break;
    case 'truite':
      images = truitesUrls;
      break;
    case 'couteau':
      images = products.map(product => product.img);
      break;
    default:
      images = products.map(product => product.img);
      break;
  }

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
      <div className="gap-3 space-y-3 rounded-md bg-gray-100 p-2 shadow-lg md:grid-cols-2 md:gap-8 lg:grid-cols-2">
        <div className="flex flex-col">
          <h2 className="text-xl font-bold text-orange-600 md:mb-4 md:text-3xl">
            {product.name}
          </h2>
          <p className="text-lg font-semibold text-orange-500 md:mb-4 md:text-2xl">
            {product.price} €
          </p>
          <p className="mb-4 text-lg text-gray-500">{product.description}</p>
          <p className="mb-4 text-lg text-gray-500">{product.consumption}</p>
          <Suspense fallback={<p>Loading video...</p>}>
            <Video source={product.video} />
          </Suspense>
          <p className="mb-4 text-lg text-gray-500">{product.details}</p>
        </div>
        <Link href="/products" className="flex items-center text-black">
          <CircleChevronLeft />{' '}
          <p className="ml-3 text-xl">Retour à la liste des produits</p>
        </Link>
        <button
          onClick={() => handleAddToCart(product)}
          className="mx-auto flex w-8/12 justify-center rounded-lg bg-orange-600 px-6 py-3 text-lg font-semibold text-white transition duration-300 hover:bg-orange-700"
        >
          Ajouter au Panier
        </button>
        <Link href="/cart" className="flex text-black">
          <button className="mx-auto w-8/12 rounded-lg bg-gray-500 px-6 py-3 text-lg font-semibold text-white transition duration-300 hover:bg-orange-700">
            Voir mon panier
          </button>
        </Link>
      </div>
      {typeof slug === 'string' && (
        <ProductSlider urlRoot={slug} products={images} />
      )}
    </div>
  );
}
