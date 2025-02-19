'use server';

import { DiscoverProducts } from "./components/DiscoverProducts"
import { ArtisanalPromise } from "./components/ArtisanalPromise"
import { ArtisanalSelection } from "./components/ArtisanalSelection"
import { ArtisanalProcessus } from "./components/ArtisanalProcessus"
import { ProductSlider } from "./components/ProductSlider";
import { products } from "./constants/products";
import { processUrls } from "./constants/processUrls";

export default async function Home() {
  return (
    <div className="md:space-y-8 text-black">
      <DiscoverProducts />
      <ProductSlider urlRoot="process" products={processUrls} />
      <ArtisanalProcessus />
      <ArtisanalSelection />
      <ProductSlider urlRoot="products" products={products} />
      <ArtisanalPromise />
    </div>
  )
}