"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { Product } from "@/lib/products"
import { useCart } from "@/hooks/use-cart"
import { ShoppingCart, Check } from "lucide-react"
import Image from "next/image"
import { useState } from "react"

interface ProductQuickViewProps {
  product: Product
  onClose: () => void
}

export function ProductQuickView({ product, onClose }: ProductQuickViewProps) {
  const { addToCart } = useCart()
  const [isAdding, setIsAdding] = useState(false)

  const handleAddToCart = async () => {
    setIsAdding(true)
    addToCart(product)

    setTimeout(() => {
      setIsAdding(false)
      onClose()
    }, 1000)
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-balance">{product.name}</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="relative">
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              width={500}
              height={400}
              className="w-full h-80 object-cover rounded-lg"
            />
            {product.stock <= 2 && (
              <Badge variant="destructive" className="absolute top-4 left-4">
                Low Stock
              </Badge>
            )}
          </div>

          <div className="space-y-6">
            <div>
              <p className="text-muted-foreground text-pretty mb-4">{product.description}</p>
              <div className="flex items-center gap-4 mb-6">
                <span className="text-3xl font-bold text-primary">${product.price.toFixed(2)}</span>
                <Badge variant="outline">{product.stock} in stock</Badge>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-3">Key Features:</h4>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Button onClick={handleAddToCart} disabled={isAdding || product.stock === 0} className="w-full" size="lg">
              <ShoppingCart className="h-4 w-4 mr-2" />
              {isAdding ? "Adding..." : product.stock === 0 ? "Out of Stock" : "Add to Cart"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
