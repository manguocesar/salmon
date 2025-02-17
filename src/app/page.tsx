import Image from "next/image"
import Link from "next/link"
import { products } from "./constants/products"

import { ReactNode } from "react"
import { cn } from "./utils/utils"

const Section = ({ children, className = "" }: { children: ReactNode, className?: string }) => (
  <section className={cn("p-4 rounded-lg", className)}>{children}</section>
)

interface Product {
  id: number;
  name: string;
  img: string;
  url: string;
  description: string;
}

const ProductCard = ({ product }: { product: Product }) => (
  <div key={product.id} className="bg-white p-6 rounded-lg shadow-md">
    <Image
      src={`/products/${product.img}`}
      alt={product.name}
      width={300}
      height={200}
      className="w-full h-48 mb-4 rounded"
    />
    <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
    <p className="text-gray-600 mb-4">
      {product.description}
    </p>
    <Link href={`/products/${product.url}`} className="text-blue-600 font-semibold hover:underline">
      En Savoir Plus
    </Link>
  </div>
)

export default function Home() {
  return (
    <div className="space-y-8 text-black">
      <Section className="text-center">
        <h1 className="text-4xl">Poissons Fumés Artisanalement</h1>
        <p className="text-2xl m-8">Saumons, truites et flétans exquis</p>
        <Link
          href="/products"
          className="bg-blue-600  text-white p-5 rounded-lg md:text-3xl font-semibold hover:bg-blue-700 transition-all duration-300"
        >
          Découvrir Nos Produits
        </Link>
      </Section>

      <Section className="bg-gray-100">
        <h2 className="text-3xl">Un Processus Artisanal:</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-3">
          <div>
            <h3 className="text-2xl">Techniques Traditionnelles</h3>
            <p className="text-gray-700 mb-4">
              Un processus de fumage perfectionné au fil des générations, utilisant des méthodes
              traditionnelles qui font ressortir les meilleures saveurs de chaque filet de poisson.
            </p>
          </div>
          <div>
            <h3 className="text-2xl">Excellence Artisanale</h3>
            <p className="text-gray-700 mb-4">
              Chaque produit est préparé à la main, garantissant la plus haute qualité et une attention aux détails dans
              chaque tranche et filet.
            </p>
          </div>
        </div>
      </Section>

      <Section>
        <h2 className="text-3xl">Sélection Artisanale</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </Section>

      <Section className="bg-gray-100">
        <h2 className="text-3xl mb-3">La Promesse Artisanale</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Poissons de qualité premium & traditionel</li>
          <li>Techniques de fumage traditionnelles transmises de génération en génération</li>
          <li>Préparation à la main avec une attention méticuleuse aux détails</li>
          <li>Pratiques d'élevage durables pour préserver un savoir-faire pour les générations futures</li>
          <li>Livraison disponible aux alentours de Lyon avant Noël et Pâques</li>
        </ul>
      </Section>
    </div>
  )
}
