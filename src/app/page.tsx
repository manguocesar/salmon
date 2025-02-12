import Image from "next/image"
import Link from "next/link"
import { products } from "./constants/products"

import { ReactNode } from "react"
import clsx from "clsx"

const Section = ({ children, className = "" }: { children: ReactNode, className?: string }) => (
  <section className={clsx("p-8 rounded-lg", className)}>{children}</section>
)

interface Product {
  id: number;
  name: string;
  img: string;
  url: string;
}

const ProductCard = ({ product }: { product: Product }) => (
  <div key={product.id} className="bg-white p-6 rounded-lg shadow-md">
    <Image
      src={`/products/${product.img}`}
      alt={product.name}
      width={300}
      height={200}
      className="w-full h-48 object-cover mb-4 rounded"
    />
    <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
    <p className="text-gray-600 mb-4">
      {product.name} méticuleusement préparé selon des méthodes traditionnelles.
    </p>
    <Link href={`/products/${product.url}`} className="text-blue-600 font-semibold hover:underline">
      En Savoir Plus
    </Link>
  </div>
)

export default function Home() {
  return (
    <div className="space-y-12 text-black">
      <Section className="text-center">
        <h1 className="text-4xl">Poissons Fumés Artisanalement</h1>
        <p className="text-xl mb-8">Saumons, truites et flétans exquis</p>
        <Link
          href="/products"
          className="bg-blue-600 text-white px-8 py-5 rounded-lg text-3xl font-semibold hover:bg-blue-700 transition-all duration-300"
        >
          Découvrir Nos Produits
        </Link>
      </Section>

      <Section className="bg-gray-100">
        <h2 className="text-3xl">Notre Processus Artisanal</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-2xl">Techniques Traditionnelles</h3>
            <p className="text-gray-700 mb-4">
              Notre processus de fumage a été perfectionné au fil des générations, utilisant des méthodes
              traditionnelles qui font ressortir les meilleures saveurs de chaque morceau de poisson.
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
        <h2 className="text-3xl">Notre Sélection Artisanale</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </Section>

      <Section className="bg-gray-100">
        <h2 className="text-3xl">La Promesse de l'Artisan</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Poissons de qualité premium sourcés localement</li>
          <li>Techniques de fumage traditionnelles transmises de génération en génération</li>
          <li>Préparation à la main avec une attention méticuleuse aux détails</li>
          <li>Pratiques d'élevage durables pour préserver notre savoir-faire pour les générations futures</li>
          <li>Livraison disponible à Lyon avant Noël et Pâques</li>
        </ul>
      </Section>
    </div>
  )
}
