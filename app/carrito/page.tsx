"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useCart } from "@/context/cart-context"
import { useAuth } from "@/context/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Minus, Plus, Trash2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { createOrder, updateProductStock, updateOrder } from "@/lib/data"
import { useToast } from "@/components/ui/use-toast"

export default function CarritoPage() {
  const { items, updateQuantity, removeItem, clearCart, getTotal } = useCart()
  const { user } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const [processingOrder, setProcessingOrder] = useState(false)

  const handleCheckout = async () => {
    if (!user) {
      toast({
        title: "Inicia sesión para continuar",
        description: "Debes iniciar sesión para completar tu compra.",
        variant: "destructive",
      })
      router.push("/login")
      return
    }

    setProcessingOrder(true)

    try {
      // Crear el pedido
      const orderItems = items.map((item) => ({
        productId: item.productId,
        nombre: item.nombre,
        precio: item.precio,
        cantidad: item.quantity,
      }))

      const order = await createOrder({
        userId: user.id,
        items: orderItems,
        total: getTotal(),
        fecha: new Date().toISOString(),
        estado: "pendiente",
      })

      // Actualizar el stock de los productos
      for (const item of items) {
        await updateProductStock(item.productId, item.quantity)
      }

      // Limpiar el carrito
      clearCart()

      toast({
        title: "¡Pedido realizado con éxito!",
        description: "Tu pedido ha sido procesado correctamente.",
      })

      // Cambiar a "En proceso" después de crear el pedido
      setTimeout(async () => {
        await updateOrder(order.id, { estado: "en_proceso" })

        // Cambiar a "Completado" después de 1 minuto
        setTimeout(async () => {
          await updateOrder(order.id, { estado: "completado" })
        }, 60000) // 1 minuto
      }, 0) // Inmediatamente después de crear el pedido

      // Redirigir a la página de confirmación
      router.push(`/pedidos/${order.id}`)
    } catch (error) {
      console.error("Error al procesar el pedido:", error)
      toast({
        title: "Error al procesar el pedido",
        description: "Ha ocurrido un error al procesar tu pedido. Por favor, inténtalo de nuevo.",
        variant: "destructive",
      })
    } finally {
      setProcessingOrder(false)
    }
  }

  if (items.length === 0) {
    return (
      <div className="container mx-auto py-12 px-4 text-center">
        <h1 className="text-3xl font-bold mb-6">Tu Carrito</h1>
        <Card className="max-w-md mx-auto">
          <CardContent className="pt-6 pb-4 text-center">
            <div className="flex justify-center mb-4">
              <div className="w-24 h-24 bg-neutral-100 rounded-full flex items-center justify-center">
                <Trash2 className="h-10 w-10 text-neutral-400" />
              </div>
            </div>
            <h2 className="text-xl font-semibold mb-2">Tu carrito está vacío</h2>
            <p className="text-muted-foreground mb-6">Parece que aún no has agregado productos a tu carrito.</p>
            <Link href="/productos">
              <Button className="bg-yellow-500 hover:bg-yellow-600 text-black">Explorar Productos</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8">Tu Carrito</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Productos en tu carrito</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.productId} className="flex items-center py-4 border-b">
                    <div className="relative h-20 w-20 mr-4 bg-white flex items-center justify-center">
                      <div className="relative w-full h-full">
                        <Image
                          src={item.imagen || "https://via.placeholder.com/300"}
                          alt={item.nombre}
                          fill
                          className="object-contain p-1"
                          sizes="80px"
                        />
                      </div>
                    </div>
                    <div className="flex-1">
                      <Link href={`/productos/${item.productId}`}>
                        <h3 className="font-medium hover:text-yellow-600">{item.nombre}</h3>
                      </Link>
                      <p className="text-sm text-muted-foreground">${item.precio.toFixed(2)} / unidad</p>
                    </div>
                    <div className="flex items-center mr-4">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-10 text-center">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                    <div className="text-right w-24">
                      <div className="font-medium">${(item.precio * item.quantity).toFixed(2)}</div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-500 hover:text-red-700 p-0 h-auto"
                        onClick={() => removeItem(item.productId)}
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        <span className="text-xs">Eliminar</span>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => clearCart()}>
                Vaciar Carrito
              </Button>
              <Link href="/productos">
                <Button variant="outline">Seguir Comprando</Button>
              </Link>
            </CardFooter>
          </Card>
        </div>

        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Resumen del Pedido</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${getTotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Envío</span>
                  <span>Gratis</span>
                </div>
                <div className="border-t pt-4 flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>${getTotal().toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-black"
                onClick={handleCheckout}
                disabled={processingOrder}
              >
                {processingOrder ? "Procesando..." : "Finalizar Compra"}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
