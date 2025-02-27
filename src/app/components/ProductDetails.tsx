'use client';
import { useCart } from '../contexts/CartContext';
import toast from 'react-hot-toast';
import { DetailsProduct } from '../types/products';
import Link from 'next/link';
import { CircleChevronLeft } from 'lucide-react';
import { Suspense } from 'react';
import { Video } from './Video';

export const ProductDetails = ({ product }: { product: DetailsProduct }) => {
    const { addToCart, cart } = useCart();

    const cartProduct = cart.find((item) => item.id === product.id);

    const handleAddToCart = (product: DetailsProduct) => {
        if (product.available) {
            addToCart({
                id: product.id,
                name: product.name,
                shortName: product.shortName,
                price: product.price,
                quantity: 1,
                imgUrl: product.imgUrl,
            });
        } else {
            toast.error('Ce produit est actuellement en rupture de stock');
        }
    };
    return (
        <div className="gap-3 space-y-3 rounded-md bg-gray-100 p-2 shadow-lg md:grid-cols-2 md:gap-8 lg:grid-cols-2">
            <div className="flex flex-col">
                <h2 className="text-2xl font-bold text-orange-600 md:mb-4 md:text-3xl">
                    {product.name}
                </h2>
                <p className="text-lg font-semibold text-orange-500 md:mb-4 md:text-2xl">
                    {product.price} €
                </p>
                <p className="mb-4 text-lg text-gray-500">{product.description}</p>
                <h3 className="text-2xl text-orange-600 font-semibold">Consommation:</h3>
                <p className="mb-4 text-lg text-gray-500">{product.consumption}</p>
                <Suspense fallback={<p>Loading video...</p>}>
                    <Video source={product.video} />
                </Suspense>
                <h3 className="text-2xl text-orange-600 font-semibold">Détails:</h3>
                <p className="mb-4 text-lg text-gray-500">{product.details}</p>
            </div>
            <Link href="/products" className="animate-right duration-10000 border-2 border-black w-full md:w-5/12 rounded-xl p-2 flex items-center bg-slate-50 text-gray-600">
                <CircleChevronLeft />
                <p className="ml-3 text-xl ">Retour à la liste des produits</p>
            </Link>
            <button
                onClick={() => handleAddToCart(product)}
                className="active:scale-105 flex items-center mx-auto w-9/12 justify-center rounded-lg bg-orange-600 px-6 py-3 text-lg  text-white transition duration-300 hover:bg-orange-700"
            >
                <span className='font-semibold'>
                    Ajouter au Panier
                </span>
                {cartProduct?.quantity ? <span className='ml-2 text-xl text-white '>x {cartProduct?.quantity}</span> : null}

            </button>
            <Link href="/cart" className="flex text-black">
                <button className="mx-auto w-9/12 rounded-lg bg-gray-500 px-6 py-3 text-lg font-semibold text-white transition duration-300 hover:bg-orange-700">
                    Voir mon panier
                </button>
            </Link>
        </div>
    )
}