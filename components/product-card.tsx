"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Product } from "@/lib/products"
import { useCart } from "@/hooks/use-cart"
import { ShoppingCart, Eye } from "lucide-react"
import Image from "next/image"
import { useState } from "react"

interface ProductCardProps {
  product: Product
  onQuickView: (product: Product) => void
}

export function ProductCard({ product, onQuickView }: ProductCardProps) {
  const { addToCart } = useCart()
  const [isAdding, setIsAdding] = useState(false)

  const handleAddToCart = async () => {
    setIsAdding(true)
    addToCart(product)

    // Brief loading state for better UX
    setTimeout(() => setIsAdding(false), 500)
  }

  return (
    <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <div className="relative overflow-hidden">
        <Image
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          width={400}
          height={300}
          className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button
            size="sm"
            variant="secondary"
            onClick={() => onQuickView(product)}
            className="rounded-full w-10 h-10 p-0"
          >
            <Eye className="h-4 w-4" />
          </Button>
        </div>
        {product.stock <= 2 && (
          <Badge variant="destructive" className="absolute top-4 left-4">
            Low Stock
          </Badge>
        )}
      </div>

      <CardContent className="p-6">
        <h3 className="font-semibold text-lg mb-2 text-balance">{product.name}</h3>
        <p className="text-muted-foreground text-sm mb-4 text-pretty line-clamp-2">{product.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-primary">${product.price.toFixed(2)}</span>
          <Badge variant="outline">{product.stock} left</Badge>
        </div>
      </CardContent>

      <CardFooter className="p-6 pt-0">
        <Button onClick={handleAddToCart} disabled={isAdding || product.stock === 0} className="w-full">
          <ShoppingCart className="h-4 w-4 mr-2" />
          {isAdding ? "Adding..." : product.stock === 0 ? "Out of Stock" : "Add to Cart"}
        </Button>
      </CardFooter>
    </Card>
  )
}
