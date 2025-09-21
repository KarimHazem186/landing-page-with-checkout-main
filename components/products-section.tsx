"use client"

import { products, type Product } from "@/lib/products"
import { ProductCard } from "./product-card"
import { useState } from "react"
import { ProductQuickView } from "./product-quick-view"

export function ProductsSection() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  return (
    <>
      <section id="products" className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">Featured Products</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
              Discover our carefully curated selection of premium tech products, each designed to enhance your digital
              lifestyle.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} onQuickView={setSelectedProduct} />
            ))}
          </div>
        </div>
      </section>

      {selectedProduct && <ProductQuickView product={selectedProduct} onClose={() => setSelectedProduct(null)} />}
    </>
  )
}
