"use client"

import { useState } from "react"
import { useCart } from "../contexts/CartContext"
import Link from "next/link"
import { usePathname } from "next/navigation"

export function CartSummary() {
    const [hidden, setHidden] = useState(false)
    const { cart, getCartTotal } = useCart()

    const pathname = usePathname()

    if (pathname === "/cart") return null
    if (cart.length === 0) return null

    return (
        <div className={` transition-all ${hidden && "translate-x-56 opacity-30"} hidden  sm:block  sm:fixed right-4 top-20 text-black bg-white p-4 rounded-lg shadow-md w-64`}>
            <div className="flex justify-between items-center">
                <button
                    className={'px-2 border-slate-600 text-white font-bold border-2 rounded-full bg-slate-400'}
                    onClick={() => setHidden(!hidden)}
                >
                    X
                </button>
                <h3 className="text-lg text-left font-semibold mb-2">Panier</h3>
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

