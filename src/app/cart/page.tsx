"use client"

import { useCart } from "../contexts/CartContext"
import Link from "next/link"
import getStripe from "../lib/getStripe"
import toast from "react-hot-toast"

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
        <div className="max-w-4xl mx-auto text-black">
            <h1 className="text-3xl font-bold mb-8 text-center">Votre Panier</h1>
            {cart.length === 0 ? (
                <div className="h-[65vh]">
                    <p className="text-center">
                        Votre panier est vide.{" "}
                        <Link href="/products" className="text-blue-600 hover:underline">
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
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Produit
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Quantité
                                    </th>
                                    <th
                                        className="px-6 py-Certainly, I'll continue the text stream from the cut-off point:tracking-wider"
                                    >
                                        Prix
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Action
                                    </th>

                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {cart.map((item) => (
                                    <tr key={item.id}>
                                        <td className="px-6 py-4 whitespace-nowrap">{item.name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                    className="text-gray-500 hover:text-gray-700 px-2 py-1 rounded-l border"
                                                >
                                                    -
                                                </button>
                                                <span className="px-2 py-1 border-t border-b">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    className="text-gray-500 hover:text-gray-700 px-2 py-1 rounded-r border"
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">{(item.price * item.quantity).toFixed(2)} €</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <button onClick={() => removeFromCart(item)} className="text-red-600 hover:text-red-900">
                                                Supprimer
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="mt-8">
                        <p className="text-xl font-semibold">Total : {getCartTotal().toFixed(2)} €</p>
                        <p className="text-sm text-gray-600 mt-2">
                            Date de livraison estimée : 5 Mai 2025
                        </p>
                    </div>
                    <div className="mt-8">
                        <button type="button" className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition duration-300"
                            onClick={handleCheckout}>
                            Payer votre commande
                        </button>
                    </div>
                </>
            )}
        </div>
    )
}

