"use client"

import Image from "next/image"
import { useCart } from "../contexts/CartContext"
import toast from "react-hot-toast"
import { products } from "../constants/products"
import { Product } from "../types/products"
import { cn } from "../utils/utils"
import Link from "next/link"

export default function Products() {
    const { addToCart } = useCart()
    const handleAddToCart = (product: Product) => {
        if (product.available) {
            addToCart({ id: product.id, name: product.name, price: product.price, quantity: 1 })
        } else {
            toast.error("Ce produit est actuellement en rupture de stock")
        }
    }

    return (
        <div>
            <h1 className="text-black text-3xl font-bold my-2 md:mb-8 text-center">Nos Produits Artisanaux</h1>
            <p className="text-center mb-2 md:mb-8 text-red-600 font-semibold">
                Commandez avant le 1er Mai pour assurer la livraison pour les fêtes à venir !
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-8">
                {products.map((product) => (
                    <div key={product.id} className="bg-white p-6 rounded-lg shadow-md">
                        <Image
                            src={`/products/${product.img}`}
                            alt={product.name}
                            width={300}
                            height={200}
                            className="w-full h-48 mb-4 rounded"
                        />
                        <h2 className="text-xl text-black font-semibold mb-2">{product.name}</h2>
                        <p className="text-gray-600 mb-2">{product.price} €</p>
                        <p className="text-sm text-gray-500 mb-4">{product.description}</p>
                        <button
                            className={cn(!product.available && "opacity-50 cursor-not-allowed", "bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300")}
                            onClick={() => handleAddToCart(product)}
                            disabled={!product.available}
                        >
                            {product.available ? "Ajouter au Panier" : "Rupture de Stock"}
                        </button>
                    </div>
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

