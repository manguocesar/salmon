"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect, useCallback } from "react"
import toast from "react-hot-toast"
import { CartContextType, CartItem } from "../types/products"

const CartContext = createContext<CartContextType | undefined>(undefined)

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([])

  useEffect(() => {
    const savedCart = localStorage.getItem("cart")
    if (savedCart) {
      setCart(JSON.parse(savedCart))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart))
  }, [cart])

  const addToCart = useCallback((item: CartItem) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id)
      if (existingItem) {
        const updatedCart = prevCart.map((cartItem) =>
          cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem,
        )
        // toast.success(`Produit ${item.name} ajouté au panier`)
        return updatedCart
      }
      // toast.success(`Produit ${item.name} ajouté au panier`)
      return [...prevCart, { ...item, quantity: 1 }]
    })
  }, [])

  const removeFromCart = useCallback((id: number) => {
    setCart((prevCart) => {
      const removedItem = prevCart.find((item) => item.id === id)
      if (removedItem) {
        toast.success(`Produit ${removedItem.name} retiré de votre panier`)
      }
      return prevCart.filter((item) => item.id !== id)
    })
  }, [])

  const clearCart = useCallback(() => {
    setCart([])
    toast.success("Panier vidé")
  }, [])

  const getCartTotal = useCallback(() => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0)
  }, [cart])

  const value = {
    cart,
    addToCart,
    removeFromCart,
    clearCart,
    getCartTotal,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}

