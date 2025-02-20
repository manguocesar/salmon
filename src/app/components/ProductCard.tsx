'use client';

import Link from "next/link";
import { Product } from "../types/products";
import Image from "next/image";
import { cn } from "../utils/utils";
import toast from "react-hot-toast";
import { useCart } from "../contexts/CartContext";

export const ProductCard = ({ product }: { product: Product }) => {

    const { addToCart } = useCart()
    const handleAddToCart = (product: Product) => {
        if (!product.available) return toast.error("Ce produit est actuellement en rupture de stock")
        addToCart({ id: product.id, name: product.name, shortName: product.shortName, price: product.price, quantity: 1 })
    }

    return (
        <div key={product.id} className="bg-white mx-2 p-2 md:p-6 rounded-lg shadow-md">
            <Image
                src={`/${product.url}/${product.img}`}
                alt={product.name}
                width={300}
                height={200}
                className="w-full sm:h-40 md:h-56 lg:h-72 mb-2 md:mb-4 rounded-lg"
            />
            <h3 className="text-orange-500 text-xl font-semibold mb-1 md:mb-2">{product.name}</h3>
            <p className="text-gray-600 mb-2 md:mb-4 text-justify">
                {product.description}
            </p>
            <button
                className={cn(!product.available && "opacity-50 cursor-not-allowed", "bg-orange-600 text-white px-4 font-semibold py-2 rounded hover:bg-orange-700 transition duration-300")}
                onClick={() => handleAddToCart(product)}
                disabled={!product.available}
            >
                {product.available ? "Ajouter au Panier" : "Rupture de Stock"}
            </button>
            <Link href={`/products/${product.url}`} className="text-gray-600 font-bold hover:underline">
                <p className="m-2">En Savoir Plus</p>
            </Link>
        </div>
    )
}
