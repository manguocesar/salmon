"use client"

import { useCart } from "../contexts/CartContext"
import Link from "next/link"

export default function Cart() {
    const { cart, removeFromCart, getCartTotal } = useCart()
    const deliveryDate = new Date()
    deliveryDate.setDate(deliveryDate.getDate() + 3) // Supposons un délai de livraison de 3 jours

    return (
        <div className="max-w-4xl mx-auto text-black">
            <h1 className="text-3xl font-bold mb-8 text-center">Votre Panier</h1>
            {cart.length === 0 ? (
                <p className="text-center">
                    Votre panier est vide.{" "}
                    <Link href="/products" className="text-blue-600 hover:underline">
                        Continuer vos achats
                    </Link>
                </p>
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
                                        Quantité
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Prix
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {cart.map((item) => (
                                    <tr key={item.id}>
                                        <td className="px-6 py-4 whitespace-nowrap">{item.name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{item.quantity}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{(item.price * item.quantity).toFixed(2)} €</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <button onClick={() => removeFromCart(item.id)} className="text-red-600 hover:text-red-900">
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
                            Date de livraison estimée :
                            {/* {deliveryDate.toLocaleDateString()} */}
                        </p>
                    </div>
                    <div className="mt-8">
                        <Link
                            href="/payment"
                            className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition duration-300"
                        >
                            Procéder au Paiement
                        </Link>
                    </div>
                </>
            )}
        </div>
    )
}

