'use server';

import { DiscoverProducts } from "./components/DiscoverProducts"
import { ArtisanalPromise } from "./components/ArtisanalPromise"
import { ArtisanalSelection } from "./components/ArtisanalSelection"
import { ArtisanalProcessus } from "./components/ArtisanalProcessus"
import { ProductSlider } from "./components/ProductSlider";
import { products } from "./constants/products";

export default async function Home() {
  return (
    <div className="space-y-4 md:space-y-8 text-black">
      <DiscoverProducts />
      <ArtisanalProcessus />
      <ArtisanalSelection />
      <ProductSlider products={products} />
      <ArtisanalPromise />
    </div>
  )
}