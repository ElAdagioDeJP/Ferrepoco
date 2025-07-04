"use client"

import { useEffect, useState } from "react"
import { type Product, getProducts, getFeaturedProducts } from "@/lib/data"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ShoppingCart } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useCart } from "@/context/cart-context"
import { useToast } from "@/components/ui/use-toast"

interface ProductGridProps {
  products?: Product[]
  loading?: boolean
  featured?: boolean
  limit?: number
  category?: string
}

export default function ProductGrid({
  products: propProducts,
  loading: propLoading,
  featured = false,
  limit,
  category,
}: ProductGridProps) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(propLoading !== undefined ? propLoading : true)
  const { addItem } = useCart()
  const { toast } = useToast()

  useEffect(() => {
    // Si se proporcionan productos directamente, usarlos
    if (propProducts) {
      setProducts(propProducts)
      setLoading(propLoading || false)
      return
    }

    // De lo contrario, cargar productos según los parámetros
    const loadProducts = async () => {
      try {
        let productList: Product[]

        if (featured) {
          productList = await getFeaturedProducts()
        } else {
          productList = await getProducts()
        }

        // Filtrar por categoría si se proporciona
        if (category) {
          productList = productList.filter((product) => product.categoria === category)
        }

        // Limitar la cantidad de productos si se especifica
        if (limit && limit > 0) {
          productList = productList.slice(0, limit)
        }

        setProducts(productList)
      } catch (error) {
        console.error("Error al cargar productos:", error)
      } finally {
        setLoading(false)
      }
    }

    loadProducts()
  }, [propProducts, propLoading, featured, limit, category])

  const handleAddToCart = async (productId: string) => {
    await addItem(productId, 1)
    toast({
      title: "Producto agregado",
      description: "El producto se ha agregado al carrito correctamente.",
      duration: 3000,
    })
  }

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, index) => (
          <Card key={index} className="animate-pulse h-[400px]">
            <div className="h-48 bg-gray-200 rounded-t-lg"></div>
            <CardContent className="p-4">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </CardContent>
            <CardFooter className="p-4 flex justify-between">
              <div className="h-6 bg-gray-200 rounded w-1/4"></div>
              <div className="h-10 bg-gray-200 rounded w-1/3"></div>
            </CardFooter>
          </Card>
        ))}
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-medium">No se encontraron productos</h3>
        <p className="text-muted-foreground mt-2">No hay productos disponibles en este momento.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <Card key={product.id} className="overflow-hidden flex flex-col h-[400px]">
          <Link
            href={`/productos/${product.id}`}
            className="h-48 overflow-hidden bg-white flex items-center justify-center"
          >
            <div className="relative w-full h-full">
              <Image
                src={product.imagen || "https://via.placeholder.com/300"}
                alt={product.nombre}
                fill
                className="object-contain p-2"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              />
            </div>
          </Link>
          <CardContent className="p-4 flex-grow">
            <Link href={`/productos/${product.id}`}>
              <h3 className="font-semibold text-lg hover:text-yellow-600 transition-colors">{product.nombre}</h3>
            </Link>
            <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{product.descripcion}</p>
            {product.ventas > 0 && <p className="text-xs text-green-600 mt-1">{product.ventas} vendidos</p>}
          </CardContent>
          <CardFooter className="p-4 flex justify-between items-center mt-auto">
            <div className="font-bold text-lg">${product.precio.toFixed(2)}</div>
            <Button
              onClick={() => handleAddToCart(product.id)}
              disabled={product.cantidad === 0}
              className={product.cantidad === 0 ? "bg-gray-400" : "bg-yellow-500 hover:bg-yellow-600 text-black"}
            >
              {product.cantidad === 0 ? (
                "Agotado"
              ) : (
                <>
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Agregar
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
