import type { CartItem, Product } from "./products"

export class CartManager {
  private static STORAGE_KEY = "ecommerce-cart"

  static getCart(): CartItem[] {
    if (typeof window === "undefined") return []

    try {
      const stored = localStorage.getItem(this.STORAGE_KEY)
      return stored ? JSON.parse(stored) : []
    } catch {
      return []
    }
  }

  static saveCart(cart: CartItem[]): void {
    if (typeof window === "undefined") return

    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(cart))
    } catch (error) {
      console.error("Failed to save cart:", error)
    }
  }

  static addToCart(product: Product, quantity = 1): CartItem[] {
    const cart = this.getCart()
    const existingItem = cart.find((item) => item.id === product.id)

    if (existingItem) {
      existingItem.quantity = Math.min(existingItem.quantity + quantity, product.stock)
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: Math.min(quantity, product.stock),
      })
    }

    this.saveCart(cart)
    return cart
  }

  static updateQuantity(productId: string, quantity: number): CartItem[] {
    const cart = this.getCart()
    const item = cart.find((item) => item.id === productId)

    if (item) {
      if (quantity <= 0) {
        return this.removeFromCart(productId)
      }
      item.quantity = Math.min(quantity, 5) // Max 5 per item as per requirements
    }

    this.saveCart(cart)
    return cart
  }

  static removeFromCart(productId: string): CartItem[] {
    const cart = this.getCart().filter((item) => item.id !== productId)
    this.saveCart(cart)
    return cart
  }

  static clearCart(): void {
    if (typeof window === "undefined") return
    localStorage.removeItem(this.STORAGE_KEY)
  }

  static getCartTotal(cart: CartItem[]): number {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  static getCartItemCount(cart: CartItem[]): number {
    return cart.reduce((total, item) => total + item.quantity, 0)
  }
}
