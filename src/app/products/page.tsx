"use client"

import Image from "next/image"
import { useCart } from "../contexts/CartContext"
import toast from "react-hot-toast"
import { products } from "../constants/products"
import { format } from "date-fns";
import { Product } from "../types/products"

const orderDeadline = format(new Date(2025, 4, 1), "yyyy-MM-dd")

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
            <h1 className="text-black text-3xl font-bold mb-8 text-center">Nos Produits Artisanaux</h1>
            <p className="text-center mb-8 text-red-600 font-semibold">
                Commandez avant le {orderDeadline} pour assurer la livraison pour les fêtes à venir !
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {products.map((product) => (
                    <div key={product.id} className="bg-white p-6 rounded-lg shadow-md">
                        <Image
                            src={`/products/${product.img}`}
                            alt={product.name}
                            width={300}
                            height={200}
                            className="w-full h-48 object-cover mb-4 rounded"
                        />
                        <h2 className="text-xl text-black font-semibold mb-2">{product.name}</h2>
                        <p className="text-gray-600 mb-2">{product.price} €</p>
                        <p className="text-sm text-gray-500 mb-4">{product.description}</p>
                        {product.available ? (
                            <p className="text-green-600 mb-2">En Stock</p>
                        ) : (
                            <p className="text-red-600 mb-2">Rupture de Stock</p>
                        )}
                        <button
                            className={`bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300 ${!product.available && "opacity-50 cursor-not-allowed"}`}
                            onClick={() => handleAddToCart(product)}
                            disabled={!product.available}
                        >
                            {product.available ? "Ajouter au Panier" : "Rupture de Stock"}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}

