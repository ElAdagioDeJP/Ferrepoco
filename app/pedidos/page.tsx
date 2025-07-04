"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/auth-context"
import { getOrdersByUserId, type Order } from "@/lib/data"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Eye, ShoppingBag } from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"

export default function PedidosPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    // Verificar si el usuario está autenticado
    if (!user) {
      router.push("/login")
      return
    }

    // Cargar pedidos del usuario
    const loadOrders = async () => {
      try {
        const orderList = await getOrdersByUserId(user.id)
        setOrders(orderList)
      } catch (error) {
        console.error("Error al cargar pedidos:", error)
      } finally {
        setLoading(false)
      }
    }

    loadOrders()

    // Configurar un intervalo para actualizar los pedidos cada 10 segundos
    const intervalId = setInterval(async () => {
      if (user) {
        const refreshedOrders = await getOrdersByUserId(user.id)
        setOrders(refreshedOrders)
      }
    }, 10000)

    return () => clearInterval(intervalId)
  }, [user, router])

  // Función para formatear fecha
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
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

  return (
    <div className="container mx-auto py-12 px-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Mis Pedidos</CardTitle>
          <CardDescription>Historial de tus compras en Ferrepoco</CardDescription>
        </CardHeader>
        <CardContent>
          {orders.length === 0 ? (
            <div className="text-center py-12">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center">
                  <ShoppingBag className="h-8 w-8 text-neutral-400" />
                </div>
              </div>
              <h3 className="text-lg font-medium mb-2">No tienes pedidos</h3>
              <p className="text-muted-foreground mb-4">Aún no has realizado ninguna compra en nuestra tienda.</p>
              <Link href="/productos">
                <Button className="bg-yellow-500 hover:bg-yellow-600 text-black">Explorar Productos</Button>
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nº Pedido</TableHead>
                    <TableHead>Fecha</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Productos</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">#{order.id.slice(-6)}</TableCell>
                      <TableCell>{formatDate(order.fecha)}</TableCell>
                      <TableCell>${order.total.toFixed(2)}</TableCell>
                      <TableCell>
                        <Badge className={getStatusBadgeColor(order.estado)}>{getStatusText(order.estado)}</Badge>
                      </TableCell>
                      <TableCell>{order.items.length} productos</TableCell>
                      <TableCell className="text-right">
                        <Link href={`/pedidos/${order.id}`}>
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4 mr-2" />
                            Ver Detalles
                          </Button>
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
