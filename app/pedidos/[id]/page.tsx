"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { useAuth } from "@/context/auth-context"
import { getOrderById, type Order, updateOrder } from "@/lib/data"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ArrowLeft, Package } from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

export default function DetallesPedidoPage() {
  const { id } = useParams()
  const [order, setOrder] = useState<Order | null>(null)
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    // Verificar si el usuario está autenticado
    if (!user) {
      router.push("/login")
      return
    }

    // Cargar detalles del pedido
    const loadOrder = async () => {
      try {
        if (typeof id !== "string") return

        const orderData = await getOrderById(id)

        // Verificar si el pedido existe y pertenece al usuario
        if (!orderData || orderData.userId !== user.id) {
          router.push("/pedidos")
          return
        }

        setOrder(orderData)

        // Configurar temporizadores para actualizar el estado del pedido
        if (orderData.estado === "pendiente") {
          // Cambiar a "En proceso" después de crear el pedido
          const processingTimeout = setTimeout(async () => {
            const updatedOrder = await updateOrder(orderData.id, { estado: "en_proceso" })
            if (updatedOrder) setOrder(updatedOrder)

            // Cambiar a "Completado" después de 1 minuto
            const completedTimeout = setTimeout(async () => {
              const completedOrder = await updateOrder(orderData.id, { estado: "completado" })
              if (completedOrder) setOrder(completedOrder)
            }, 60000) // 1 minuto

            return () => clearTimeout(completedTimeout)
          }, 0) // Inmediatamente

          return () => clearTimeout(processingTimeout)
        } else if (orderData.estado === "en_proceso") {
          // Si ya está en proceso, solo configurar el temporizador para completado
          const completedTimeout = setTimeout(async () => {
            const completedOrder = await updateOrder(orderData.id, { estado: "completado" })
            if (completedOrder) setOrder(completedOrder)
          }, 60000) // 1 minuto

          return () => clearTimeout(completedTimeout)
        }
      } catch (error) {
        console.error("Error al cargar pedido:", error)
      } finally {
        setLoading(false)
      }
    }

    loadOrder()

    // Configurar un intervalo para actualizar el estado del pedido cada 10 segundos
    const intervalId = setInterval(async () => {
      if (typeof id === "string") {
        const refreshedOrder = await getOrderById(id)
        if (refreshedOrder) {
          setOrder(refreshedOrder)
        }
      }
    }, 10000)

    return () => clearInterval(intervalId)
  }, [id, user, router])

  // Función para formatear fecha
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  // Función para obtener el color de la insignia según el estado
  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "pendiente":
        return "bg-yellow-100 text-yellow-800"
      case "en_proceso":
        return "bg-blue-100 text-blue-800"
      case "completado":
        return "bg-green-100 text-green-800"
      case "cancelado":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  // Función para mostrar el texto del estado
  const getStatusText = (status: string) => {
    switch (status) {
      case "pendiente":
        return "Pendiente"
      case "en_proceso":
        return "En Procesamiento"
      case "completado":
        return "Completado"
      case "cancelado":
        return "Cancelado"
      default:
        return status.charAt(0).toUpperCase() + status.slice(1)
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold mb-8">Cargando...</h1>
      </div>
    )
  }

  if (!order) {
    return (
      <div className="container mx-auto py-12 px-4 text-center">
        <h1 className="text-2xl font-bold mb-4">Pedido no encontrado</h1>
        <p className="mb-8">El pedido que estás buscando no existe o no tienes acceso a él.</p>
        <Link href="/pedidos">
          <Button className="bg-yellow-500 hover:bg-yellow-600 text-black">Ver mis pedidos</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-12 px-4">
      <Link href="/pedidos" className="flex items-center text-yellow-600 hover:text-yellow-700 mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Volver a mis pedidos
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl">Pedido #{order.id.slice(-6)}</CardTitle>
                  <CardDescription>Realizado el {formatDate(order.fecha)}</CardDescription>
                </div>
                <Badge className={getStatusBadgeColor(order.estado)}>{getStatusText(order.estado)}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Producto</TableHead>
                    <TableHead className="text-right">Precio</TableHead>
                    <TableHead className="text-right">Cantidad</TableHead>
                    <TableHead className="text-right">Subtotal</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {order.items.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{item.nombre}</TableCell>
                      <TableCell className="text-right">${item.precio.toFixed(2)}</TableCell>
                      <TableCell className="text-right">{item.cantidad}</TableCell>
                      <TableCell className="text-right">${(item.precio * item.cantidad).toFixed(2)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Resumen del Pedido</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${order.total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Envío</span>
                  <span>Gratis</span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>${order.total.toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Package className="mr-2 h-5 w-5" />
                Estado del Pedido
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white">
                    <span className="text-xs">1</span>
                  </div>
                  <div className="ml-4">
                    <h4 className="font-medium">Pedido Recibido</h4>
                    <p className="text-sm text-muted-foreground">{formatDate(order.fecha)}</p>
                  </div>
                </div>

                <div className="w-px h-6 bg-gray-200 ml-4"></div>

                <div className="flex items-center">
                  <div
                    className={`w-8 h-8 rounded-full ${
                      order.estado === "en_proceso" || order.estado === "completado"
                        ? "bg-blue-500"
                        : order.estado === "cancelado"
                          ? "bg-gray-300"
                          : "bg-yellow-500"
                    } flex items-center justify-center text-white`}
                  >
                    <span className="text-xs">2</span>
                  </div>
                  <div className="ml-4">
                    <h4 className="font-medium">En Procesamiento</h4>
                    <p className="text-sm text-muted-foreground">
                      {order.estado === "en_proceso"
                        ? "Tu pedido está siendo preparado"
                        : order.estado === "completado"
                          ? "Procesamiento completado"
                          : order.estado === "cancelado"
                            ? "Pedido cancelado"
                            : "Pendiente de procesamiento"}
                    </p>
                  </div>
                </div>

                <div className="w-px h-6 bg-gray-200 ml-4"></div>

                <div className="flex items-center">
                  <div
                    className={`w-8 h-8 rounded-full ${
                      order.estado === "completado" ? "bg-green-500" : "bg-gray-300"
                    } flex items-center justify-center text-white`}
                  >
                    <span className="text-xs">3</span>
                  </div>
                  <div className="ml-4">
                    <h4 className="font-medium">Completado</h4>
                    <p className="text-sm text-muted-foreground">
                      {order.estado === "completado" ? "Tu pedido ha sido entregado" : "Pendiente"}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
