"use client"

import { useState, useEffect } from "react"
import type { CartItem, Product } from "@/lib/products"
import { CartManager } from "@/lib/cart"

export function useCart() {
  const [cart, setCart] = useState<CartItem[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setCart(CartManager.getCart())
    setIsLoading(false)
  }, [])

  const addToCart = (product: Product, quantity = 1) => {
    const updatedCart = CartManager.addToCart(product, quantity)
    setCart(updatedCart)

    // Log analytics event
    console.log("AddToCart", { productId: product.id, quantity })
  }

  const updateQuantity = (productId: string, quantity: number) => {
    const updatedCart = CartManager.updateQuantity(productId, quantity)
    setCart(updatedCart)
  }

  const removeFromCart = (productId: string) => {
    const updatedCart = CartManager.removeFromCart(productId)
    setCart(updatedCart)
  }

  const clearCart = () => {
    CartManager.clearCart()
    setCart([])
  }

  const cartTotal = CartManager.getCartTotal(cart)
  const itemCount = CartManager.getCartItemCount(cart)

  return {
    cart,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    cartTotal,
    itemCount,
    isLoading,
  }
}
