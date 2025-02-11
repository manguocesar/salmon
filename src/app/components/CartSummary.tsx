"use client"

import { useState } from "react"
import { useCart } from "../contexts/CartContext"
import Link from "next/link"

export function CartSummary() {
    const [hidden, setHidden] = useState(false)
    const { cart, getCartTotal } = useCart()

    if (cart.length === 0) return null


    return (
        <div className={`hidden md:block  md:fixed right-4 top-20 text-black bg-white p-4 rounded-lg shadow-md w-64`}>
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold mb-2">Pannier</h3>
                {/* <button
                    className={'px-2 py-1 border border-slate-400 rounded-full bg-slate-400'}
                    onClick={() => setHidden(!hidden)}
                >
                    X
                </button> */}
            </div>
            <ul className="mb-4">
                {cart.map((item) => (
                    <li key={item.id} className="flex justify-between text-sm">
                        <span>
                            {item.name} x{item.quantity}
                        </span>
                        <span className="sm:hidden">{(item.price * item.quantity).toFixed(2)} €</span>
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

