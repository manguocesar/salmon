'use server';
import { DiscoverProducts } from './components/DiscoverProducts';
import { ArtisanalPromise } from './components/ArtisanalPromise';
import { ArtisanalSelection } from './components/ArtisanalSelection';
import { ArtisanalProcessus } from './components/ArtisanalProcessus';
import { ProductSlider } from './components/ProductSlider';
import { products } from './constants/products';
import { processUrls } from './constants/processUrls';

async function Home() {
  const images = products.map(product => product.imgUrl);
  return (
    <div className="text-black md:space-y-8">
      <DiscoverProducts />
      <ProductSlider urlRoot="process" products={processUrls} />
      <ArtisanalProcessus />
      <ArtisanalSelection />
      <ProductSlider urlRoot="products" products={images} />
      <ArtisanalPromise />
    </div>
  );
}

export default Home;
