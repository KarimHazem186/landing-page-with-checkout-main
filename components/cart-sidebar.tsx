"use client"

import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useCart } from "@/hooks/use-cart"
import { CartItem } from "./cart-item"
import { ShoppingCart, ArrowRight } from "lucide-react"
import { useState } from "react"

interface CartSidebarProps {
  isOpen: boolean
  onClose: () => void
  onCheckout: () => void
}

export function CartSidebar({ isOpen, onClose, onCheckout }: CartSidebarProps) {
  const { cart, cartTotal, itemCount } = useCart()
  const [discountCode, setDiscountCode] = useState("")
  const [appliedDiscount, setAppliedDiscount] = useState<{ code: string; percentage: number } | null>(null)

  const handleApplyDiscount = () => {
    if (discountCode.toUpperCase() === "SAVE10") {
      setAppliedDiscount({ code: "SAVE10", percentage: 10 })
    } else if (discountCode.toUpperCase() === "FREESHIP") {
      // This would be handled in shipping calculation
      setAppliedDiscount({ code: "FREESHIP", percentage: 0 })
    } else {
      // Invalid code - could show error message
      setAppliedDiscount(null)
    }
  }

  const discountAmount = appliedDiscount?.percentage ? (cartTotal * appliedDiscount.percentage) / 100 : 0
  const finalTotal = cartTotal - discountAmount

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-lg flex flex-col">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            Shopping Cart
            {itemCount > 0 && (
              <Badge variant="secondary" className="ml-auto">
                {itemCount} {itemCount === 1 ? "item" : "items"}
              </Badge>
            )}
          </SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto py-4">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
              <ShoppingCart className="h-16 w-16 text-muted-foreground" />
              <div>
                <h3 className="font-semibold text-lg mb-2">Your cart is empty</h3>
                <p className="text-muted-foreground text-sm">Add some products to get started!</p>
              </div>
              <Button onClick={onClose} variant="outline">
                Continue Shopping
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>
          )}
        </div>

        {cart.length > 0 && (
          <div className="border-t pt-4 space-y-4">
            {/* Discount Code Section */}
            <div className="space-y-2">
              <label htmlFor="discount-code" className="text-sm font-medium">
                Discount Code
              </label>
              <div className="flex gap-2">
                <input
                  id="discount-code"
                  type="text"
                  placeholder="Enter code (SAVE10, FREESHIP)"
                  value={discountCode}
                  onChange={(e) => setDiscountCode(e.target.value)}
                  className="flex-1 px-3 py-2 text-sm border border-input rounded-md bg-background"
                />
                <Button size="sm" variant="outline" onClick={handleApplyDiscount}>
                  Apply
                </Button>
              </div>
              {appliedDiscount && (
                <p className="text-sm text-green-600">
                  ✓ {appliedDiscount.code} applied
                  {appliedDiscount.percentage > 0 && ` (${appliedDiscount.percentage}% off)`}
                </p>
              )}
            </div>

            <Separator />

            {/* Order Summary */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-sm text-green-600">
                  <span>Discount ({appliedDiscount?.code})</span>
                  <span>-${discountAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Shipping</span>
                <span>Calculated at checkout</span>
              </div>
              <Separator />
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>${finalTotal.toFixed(2)}</span>
              </div>
            </div>

            <Button onClick={onCheckout} className="w-full" size="lg">
              Proceed to Checkout
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>

            <p className="text-xs text-muted-foreground text-center">Secure checkout with Cash on Delivery available</p>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}
