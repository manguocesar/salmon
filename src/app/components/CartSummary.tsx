"use client"

import { useCart } from "../contexts/CartContext"
import Link from "next/link"

export function CartSummary() {
    const { cart, getCartTotal } = useCart()

    if (cart.length === 0) return null

    return (
        <div className="hidden md:fixed right-4 top-20 text-black bg-white p-4 rounded-lg shadow-md w-64">
            <h3 className="text-lg font-semibold mb-2">Pannier</h3>
            <ul className="mb-4">
                {cart.map((item) => (
                    <li key={item.id} className="flex justify-between text-sm">
                        <span>
                            {item.name} x{item.quantity}
                        </span>
                        <span>{(item.price * item.quantity).toFixed(2)} €</span>
                    </li>
                ))}
            </ul>
            <div className="font-semibold flex justify-between">
                <span>Total:</span>
                <span>{getCartTotal().toFixed(2)} €</span>
            </div>
            <Link
                href="/cart"
                className="block text-center bg-blue-600 text-white px-4 py-2 rounded mt-4 hover:bg-blue-700 transition duration-300"
            >
                Voir le panier
            </Link>
        </div>
    )
}

