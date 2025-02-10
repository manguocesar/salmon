"use client"

import { useState, useEffect } from "react"

export function GDPRBanner() {
    const [accepted, setAccepted] = useState(false)

    useEffect(() => {
        const gdprAccepted = localStorage.getItem("gdprAccepted")
        if (gdprAccepted) {
            setAccepted(true)
        }
    }, [])

    const handleAccept = () => {
        localStorage.setItem("gdprAccepted", "true")
        setAccepted(true)
    }

    if (accepted) return null

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
                <p className="text-sm mr-4">
                    Ce site web est conforme au RGPD. En utilisant notre site, vous acceptez que nous puissions collecter et
                    traiter vos informations personnelles à des fins de traitement des commandes et de livraison.
                </p>
                <button
                    onClick={handleAccept}
                    className="bg-white text-gray-800 px-4 py-2 rounded hover:bg-gray-200 transition duration-300"
                >
                    Accepter
                </button>
            </div>
        </div>
    )
}

