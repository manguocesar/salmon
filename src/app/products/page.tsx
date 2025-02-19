"use client"
import { products } from "../constants/products"
import Link from "next/link"
import { ProductCard } from "../components/ProductCard"
import { ProductHeader } from "../components/ProductHeader"
import { ProductSlider } from "../components/ProductSlider"
import { detailsUrls } from "../constants/details"
import { processUrls } from "../constants/processUrls"

export default function Products() {
    return (
        <div>
            <ProductHeader />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-8">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />

                ))}
                <Link href="/cart" className="md:hidden flex text-black">
                    <button className="w-8/12 mx-auto md:w-full bg-orange-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-orange-700 transition duration-300"
                    >
                        Voir mon panier
                    </button>
                </Link>
            </div>
            <ProductSlider urlRoot="process" products={processUrls} />
        </div>
    )
}

