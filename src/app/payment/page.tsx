"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useCart } from "../contexts/CartContext"
import toast from "react-hot-toast"

export default function Payment() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        address: "",
        cardNumber: "",
        expiryDate: "",
        cvv: "",
    })
    const router = useRouter()
    const { clearCart } = useCart()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        clearCart()
        toast.success("Paiement réussi ! Vous allez recevoir un email de confirmation.")
        router.push("/")
    }

    return (
        <div className="max-w-md mx-auto text-black">
            <h1 className="text-3xl font-bold mb-8 text-center">Paiement Sécurisé</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Nom Complet
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                        Adresse de Livraison
                    </label>
                    <input
                        type="text"
                        id="address"
                        name="address"
                        required
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">
                        Numéro de Carte
                    </label>
                    <input
                        type="text"
                        id="cardNumber"
                        name="cardNumber"
                        required
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                        onChange={handleChange}
                    />
                </div>
                <div className="flex space-x-4">
                    <div className="flex-1">
                        <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700">
                            Date d'Expiration
                        </label>
                        <input
                            type="text"
                            id="expiryDate"
                            name="expiryDate"
                            placeholder="MM/AA"
                            required
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex-1">
                        <label htmlFor="cvv" className="block text-sm font-medium text-gray-700">
                            CVV
                        </label>
                        <input
                            type="text"
                            id="cvv"
                            name="cvv"
                            required
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300"
                >
                    Payer Maintenant
                </button>
            </form>
        </div>
    )
}

