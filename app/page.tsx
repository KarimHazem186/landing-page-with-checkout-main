"use client"

import { useState } from "react"
import { NotificationBar } from "@/components/notification-bar"
import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { ProductsSection } from "@/components/products-section"
import { FeaturesSection } from "@/components/features-section"
import { Footer } from "@/components/footer"
import { CartSidebar } from "@/components/cart-sidebar"
import { CheckoutForm } from "@/components/checkout-form"
import { OrderConfirmation } from "@/components/order-confirmation"

export default function HomePage() {
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [showCheckout, setShowCheckout] = useState(false)
  const [completedOrderId, setCompletedOrderId] = useState<string | null>(null)

  const handleCheckout = () => {
    setIsCartOpen(false)
    setShowCheckout(true)
  }

  const handleBackToShopping = () => {
    setShowCheckout(false)
    setCompletedOrderId(null)
  }

  const handleOrderComplete = (orderId: string) => {
    setShowCheckout(false)
    setCompletedOrderId(orderId)
  }

  const handleContinueShopping = () => {
    setCompletedOrderId(null)
  }

  if (showCheckout) {
    return <CheckoutForm onBack={handleBackToShopping} onOrderComplete={handleOrderComplete} />
  }

  if (completedOrderId) {
    return <OrderConfirmation orderId={completedOrderId} onContinueShopping={handleContinueShopping} />
  }

  return (
    <div className="min-h-screen">
      <NotificationBar />
      <Header onCartClick={() => setIsCartOpen(true)} />
      <main>
        <HeroSection />
        <ProductsSection />
        <FeaturesSection />
      </main>
      <Footer />

      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} onCheckout={handleCheckout} />
    </div>
  )
}
