"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import {
  getFeaturedProducts,
  getNewProducts,
  getRandomProducts,
  getRecommendedProducts,
  type Product,
} from "@/lib/data"
import ProductGrid from "@/components/product-grid"

interface ProductSectionProps {
  title: string
  description?: string
  type: "featured" | "new" | "random" | "recommended"
  limit?: number
  productId?: string
  bgColor?: string
}

export default function ProductSection({
  title,
  description,
  type,
  limit = 4,
  productId,
  bgColor = "",
}: ProductSectionProps) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadProducts = async () => {
      try {
        let productList: Product[] = []

        switch (type) {
          case "featured":
            productList = await getFeaturedProducts(limit)
            break
          case "new":
            productList = await getNewProducts(limit)
            break
          case "random":
            productList = await getRandomProducts(limit)
            break
          case "recommended":
            productList = await getRecommendedProducts(productId || "Herramientas manuales", limit)
            break
        }

        setProducts(productList)
      } catch (error) {
        console.error(`Error al cargar productos ${type}:`, error)
      } finally {
        setLoading(false)
      }
    }

    loadProducts()
  }, [type, limit, productId])

  return (
    <section className={`py-16 ${bgColor}`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold">{title}</h2>
            {description && <p className="text-muted-foreground mt-1">{description}</p>}
          </div>
          <Link href="/productos">
            <Button variant="link" className="text-yellow-600">
              Ver todos los productos
            </Button>
          </Link>
        </div>
        <ProductGrid products={products} loading={loading} />
      </div>
    </section>
  )
}
