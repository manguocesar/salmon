"use client"

import Image from "next/image"
import { useCart } from "../../contexts/CartContext"
import toast from "react-hot-toast"
import { products } from "../../constants/products"
import { Product } from "../../types/products"
import { useParams } from "next/navigation"
import Link from "next/link"
import { CircleChevronLeft, CircleChevronRight } from "lucide-react"

export default function Page() {
    const { slug } = useParams()
    const { addToCart } = useCart()
    const handleAddToCart = (product: Product) => {
        if (product.available) {
            addToCart({ id: product.id, name: product.name, price: product.price, quantity: 1 })
        } else {
            toast.error("Ce produit est actuellement en rupture de stock")
        }
    }

    const product = products.find((product) => product.url === slug)


    if (!product) {
        return <div className="">Produit non trouvé</div>
    }

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <h1 className="text-black text-3xl font-bold mb-8 text-center">Nos Produits Artisanaux</h1>
            <p className="text-center mb-8 text-red-600 font-semibold">
                Commandez avant le 1er Mai pour assurer la livraison pour les fêtes à venir !
            </p>
            <div className="grid grid-cols-1 bg-gray-100 p-5 md:grid-cols-2 lg:grid-cols-2 gap-3 md:gap-8 shadow-lg rounded-md">
                <Image
                    src={`/products/${product.img}`}
                    alt={product.name}
                    className="w-full h-48 mb-4 rounded"
                    width={500}
                    height={500}
                />
                <div className="flex flex-col">
                    <h2 className="text-3xl text-black font-bold mb-4">{product.name}</h2>
                    <p className="text-2xl text-black font-semibold mb-4">{product.price} €</p>
                    <p className="text-sm text-gray-500 mb-4">{product.details}</p>
                </div>
                <Link href="/products" className="flex items-center text-black">
                    <CircleChevronLeft /> <p className="text-xl ml-3">Retour à la liste des produits</p>
                </Link>
                <button
                    onClick={() => handleAddToCart(product)}
                    className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition duration-300"
                >
                    Ajouter au Panier
                </button>
                <Link href="/cart" className="flex text-black">
                    <button
                        onClick={() => handleAddToCart(product)}
                        className="w-full bg-gray-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition duration-300"
                    >
                        Voir mon panier
                    </button>
                </Link>
            </div>
        </div>
    )
}