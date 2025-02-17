import { products } from "./constants/products"
import { DiscoverProducts } from "./components/DiscoverProducts"
import { ArtisanalPromise } from "./components/ArtisanalPromise"
import { ArtisanalSelection } from "./components/ArtisanalSelection"
import { ArtisanalProcessus } from "./components/ArtisanalProcessus"

export default function Home() {
  return (
    <div className="space-y-4 md:space-y-8 text-black">
      <DiscoverProducts />
      <ArtisanalProcessus />
      <ArtisanalSelection products={products} />
      <ArtisanalPromise />
    </div>
  )
}
