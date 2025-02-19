"use client"

import { useCart } from "../contexts/CartContext"
import Link from "next/link"
import getStripe from "../lib/getStripe"
import toast from "react-hot-toast"
import { ProductSlider } from "../components/ProductSlider"
import { bgUrls } from "../constants/bgSaumonUrls"
import { Delete } from "lucide-react"

export default function Cart() {
    const { cart, removeFromCart, getCartTotal, updateQuantity } = useCart()
    const deliveryDate = new Date()
    deliveryDate.setDate(deliveryDate.getDate() + 3) // Supposons un délai de livraison de 3 jours

    const handleCheckout = async () => {
        const stripe = await getStripe();

        const response = await fetch('/api', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(cart),
        });

        if (!response.ok) {
            toast.error('Something went wrong. Please try again.');
            return;
        }

        const data = await response.json();

        if (response.status === 500) return;
        toast.loading('Redirection...');
        if (stripe) {
            stripe.redirectToCheckout({ sessionId: data.id });
        } else {
            toast.error('Payment initialization failed.');
        }
    }


    return (
        <div className="max-w-4xl mx-1 md:mx-auto">
            <h1 className="text-3xl font-bold mb-4 md:mb-8 text-orange-600 text-center">Votre Panier</h1>
            {cart.length === 0 ? (
                <div className="text-center text-lg text-black">
                    Votre panier est vide...
                    <p>
                        <Link href="/products" className="text-orange-600 underline underline-offset-4 cursor-pointer">
                            Continuer vos achats
                        </Link>
                    </p>
                </div>
            ) : (
                <>
                    <div className="bg-white shadow-md rounded-lg overflow-hidden">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-2 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Produit
                                    </th>
                                    <th className="pr-1 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Quantité
                                    </th>
                                    <th
                                        className="pr-1 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Prix
                                    </th>
                                    <th className="md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Action
                                    </th>

                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {cart.map((item) => (
                                    <tr key={item.id}>
                                        <td className="block md:hidden text-orange-600 font-semibold px-1 md:px-6 py-4 whitespace-pre-wrap">{item.shortName}</td>
                                        <td className="hidden md:block text-orange-600 font-semibold px-2  md:px-6 py-4 whitespace-pre-wrap">{item.name}</td>
                                        <td className="md:px-6 md:py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                    className="text-gray-500 hover:text-gray-700 px-2 py-1 rounded-l border"
                                                >
                                                    -
                                                </button>
                                                <span className="px-2 py-1 text-black border-t border-b">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    className="text-gray-500 hover:text-gray-700 px-2 py-1 rounded-r border"
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </td>
                                        <td className="hidden md:block text-black px-2 md:px-6 py-4 whitespace-nowrap">{(item.price * item.quantity).toFixed(2)} €</td>
                                        <td className="block md:hidden text-black pr-1 md:px-6 py-4 whitespace-nowrap">{(item.price * item.quantity)}€</td>
                                        <td className="md:px-6 py-4 whitespace-nowrap">
                                            <Delete onClick={() => removeFromCart(item)} className="ml-3 text-red-700 hover:text-red-900" />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="flex flex-col items-center m-4 md:mt-8">
                        <p className="text-xl text-black font-semibold">Total : {getCartTotal().toFixed(2)} €</p>
                        <p className="text-sm text-gray-600 mt-2">
                            Date de livraison estimée : 16 Avril 2025
                        </p>
                        <div className="md:mt-8">
                            <button type="button" className="bg-orange-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-orange-700 transition duration-300"
                                onClick={handleCheckout}>
                                Payer votre commande
                            </button>
                        </div>

                    </div>
                </>
            )}
            <ProductSlider urlRoot="bg" products={bgUrls} />

        </div>
    )
}

