"use client"

import Image from "next/image"
import { useCart } from "../../contexts/CartContext"
import toast from "react-hot-toast"
import { products } from "../../constants/products"
import { Product } from "../../types/products"
import { useParams } from "next/navigation"
import Link from "next/link"
import { CircleChevronLeft } from "lucide-react"
import { ProductHeader } from "@/app/components/ProductHeader"
import { fletanUrls } from "@/app/constants/fletanUrls"
import { saumonFumeEntierUrls } from "@/app/constants/saumon-fume-entier-urls"
import { saumonFumePretrancheUrls } from "@/app/constants/saumon-fume-pretranche-urls"
import { crevettesUrls } from "@/app/constants/crevettesUrls"
import { coeurSaumonUrls } from "@/app/constants/coeurSaumonUrls"
import { saumonFumePaveUrls } from "@/app/constants/saumonFumePaveUrls"
import { saumonGravadEntierUrls } from "@/app/constants/saumonGravadEntierUrls"
import { saumonGravadPretrancheUrls } from "@/app/constants/saumonGravadPretrancheUrls"
import { saumonFumeChaudEntierPoivreUrls } from "@/app/constants/saumonFumeChaudEntierPoivreUrls"
import { saumonFumeChaudPavePoivreUrls } from "@/app/constants/saumonFumeChaudPavePoivreUrls"
import { truitesUrls } from "@/app/constants/truitesUrls"
import { ProductSlider } from "@/app/components/ProductSlider"

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


    let images: string[]
    switch (slug) {
        case 'saumon-fume-entier':
            images = saumonFumeEntierUrls
            break;
        case 'saumon-fume-pretranche':
            images = saumonFumePretrancheUrls
            break;
        case 'coeur-saumon':
            images = coeurSaumonUrls
            break;
        case 'saumon-fume-pave':
            images = saumonFumePaveUrls
            break;
        case 'saumon-gravad-entier':
            images = saumonGravadEntierUrls
            break;
        case 'saumon-gravad-pretranche':
            images = saumonGravadPretrancheUrls
            break;
        case 'saumon-fume-chaud-poivre-entier':
            images = saumonFumeChaudEntierPoivreUrls
            break;
        case 'saumon-fume-chaud-pave-entier':
            images = saumonFumeChaudPavePoivreUrls
            break;
        case 'saumon-fume-chaud-pave-entier':
            images = saumonFumeChaudPavePoivreUrls
            break;
        case 'crevettes-groenland':
            images = crevettesUrls
            break;
        case 'fletan':
            images = fletanUrls
            break;
        case 'truite-fumee':
            images = truitesUrls
            break;
        default:
            images = products.map((product) => product.img)
            break;
    }
    console.log(images);


    const product = products.find((product) => product.url === slug)

    if (!product) {
        return <div className="">Produit non trouvé</div>
    }

    return (
        <div className="max-w-4xl mx-auto px-4 my-2 md:py-8">
            <ProductHeader />
            <div className=" bg-gray-100 space-y-3 p-2 md:grid-cols-2 lg:grid-cols-2 gap-3 md:gap-8 shadow-lg rounded-md">
                {/* <Image
                    src={`/products/${product.img}`}
                    alt={product.name}
                    className="justify-center mx-auto cover md:mb-4 rounded"
                    width={500}
                    height={500}
                /> */}
                <ProductSlider products={images} />

                <div className="flex flex-col">
                    <h2 className="text-xl md:text-3xl text-orange-600 font-bold md:mb-4">{product.name}</h2>
                    <p className="text-lg md:text-2xl text-orange-500 font-semibold md:mb-4">{product.price} €</p>
                    <p className="text-lg text-gray-500 mb-4">{product.description}</p>
                    <p className="text-lg text-gray-500 mb-4">{product.consumption}</p>
                    <p className="text-lg text-gray-500 mb-4">{product.details}</p>
                </div>
                <Link href="/products" className="flex items-center text-black">
                    <CircleChevronLeft /> <p className="text-xl ml-3">Retour à la liste des produits</p>
                </Link>
                <button
                    onClick={() => handleAddToCart(product)}
                    className="flex justify-center mx-auto w-8/12 bg-orange-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-orange-700 transition duration-300"
                >
                    Ajouter au Panier
                </button>
                <Link href="/cart" className="flex text-black">
                    <button className="mx-auto w-8/12 bg-gray-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-orange-700 transition duration-300"
                    >
                        Voir mon panier
                    </button>
                </Link>
            </div>
            <ProductSlider products={images} />

        </div>
    )
}