"use client"

import { Button } from "@/components/ui/button"
import { useCart } from "@/hooks/use-cart"
import type { CartItem as CartItemType } from "@/lib/products"
import { Minus, Plus, Trash2 } from "lucide-react"
import Image from "next/image"

interface CartItemProps {
  item: CartItemType
}

export function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeFromCart } = useCart()

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(item.id)
    } else {
      updateQuantity(item.id, newQuantity)
    }
  }

  return (
    <div className="flex gap-4 p-4 border rounded-lg">
      <div className="relative w-16 h-16 flex-shrink-0">
        <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover rounded-md" />
      </div>

      <div className="flex-1 min-w-0">
        <h4 className="font-medium text-sm text-balance line-clamp-2">{item.name}</h4>
        <p className="text-sm text-muted-foreground">${item.price.toFixed(2)} each</p>

        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleQuantityChange(item.quantity - 1)}
              className="h-8 w-8 p-0"
            >
              <Minus className="h-3 w-3" />
            </Button>
            <span className="text-sm font-medium w-8 text-center">{item.quantity}</span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleQuantityChange(item.quantity + 1)}
              disabled={item.quantity >= 5}
              className="h-8 w-8 p-0"
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-semibold text-sm">${(item.price * item.quantity).toFixed(2)}</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => removeFromCart(item.id)}
              className="h-8 w-8 p-0 text-destructive hover:text-destructive"
            >
              <Trash2 className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
