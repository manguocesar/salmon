"use client"
import { products } from "../constants/products"
import Link from "next/link"
import { ProductCard } from "../components/ProductCard"

export default function Products() {
    return (
        <div>
            <h1 className="text-black text-3xl font-bold my-2 md:mb-8 text-center">Nos Produits Artisanaux</h1>
            <p className="text-center mb-2 md:mb-8 text-red-600 font-semibold">
                Commandez avant le 15 Avril 2025 pour assurer la livraison pour les fêtes à venir !
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-8">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />

                ))}
                <Link href="/cart" className="md:hidden flex text-black">
                    <button className="w-full bg-gray-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition duration-300"
                    >
                        Voir mon panier
                    </button>
                </Link>
            </div>
        </div>
    )
}

