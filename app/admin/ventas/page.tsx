"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/auth-context"
import { getOrders, getProducts, type Order, type Product } from "@/lib/data"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { ArrowUpIcon, TrendingUpIcon, PackageIcon, DollarSignIcon } from "lucide-react"

// Colores para las gráficas
const COLORS = ["#fbbf24", "#f59e0b", "#d97706", "#b45309", "#92400e", "#78350f", "#3f6212", "#4d7c0f", "#65a30d"]

// Función para formatear fechas
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("es-ES", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}

// Función para obtener el mes y año de una fecha
const getMonthYear = (dateString: string) => {
  const date = new Date(dateString)
  return `${date.getMonth() + 1}/${date.getFullYear()}`
}

// Función para agrupar ventas por mes
const groupSalesByMonth = (orders: Order[]) => {
  const salesByMonth: Record<string, { total: number; count: number }> = {}

  orders.forEach((order) => {
    if (order.estado === "completado") {
      const monthYear = getMonthYear(order.fecha)
      if (!salesByMonth[monthYear]) {
        salesByMonth[monthYear] = { total: 0, count: 0 }
      }
      salesByMonth[monthYear].total += order.total
      salesByMonth[monthYear].count += 1
    }
  })

  return Object.entries(salesByMonth).map(([monthYear, data]) => ({
    month: monthYear,
    ventas: data.count,
    total: data.total,
  }))
}

// Función para obtener los productos más vendidos
const getTopSellingProducts = (products: Product[], limit = 10) => {
  return [...products]
    .sort((a, b) => b.ventas - a.ventas)
    .slice(0, limit)
    .map((product) => ({
      nombre: product.nombre.length > 20 ? product.nombre.substring(0, 20) + "..." : product.nombre,
      ventas: product.ventas,
      ingresos: product.precio * product.ventas,
    }))
}

// Función para agrupar ventas por categoría
const getSalesByCategory = (products: Product[]) => {
  const salesByCategory: Record<string, { ventas: number; ingresos: number }> = {}

  products.forEach((product) => {
    if (!salesByCategory[product.categoria]) {
      salesByCategory[product.categoria] = { ventas: 0, ingresos: 0 }
    }
    salesByCategory[product.categoria].ventas += product.ventas
    salesByCategory[product.categoria].ingresos += product.precio * product.ventas
  })

  return Object.entries(salesByCategory)
    .map(([categoria, data]) => ({
      categoria,
      ventas: data.ventas,
      ingresos: data.ingresos,
    }))
    .sort((a, b) => b.ventas - a.ventas)
}

export default function VentasPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [timeRange, setTimeRange] = useState("all")
  const { user } = useAuth()
  const router = useRouter()

  // Estadísticas calculadas
  const [totalVentas, setTotalVentas] = useState(0)
  const [totalIngresos, setTotalIngresos] = useState(0)
  const [productosMasVendidos, setProductosMasVendidos] = useState<any[]>([])
  const [ventasPorCategoria, setVentasPorCategoria] = useState<any[]>([])
  const [ventasPorMes, setVentasPorMes] = useState<any[]>([])

  useEffect(() => {
    // Verificar si el usuario tiene permisos
    if (!user || (user.role !== "empleado" && user.role !== "directivo")) {
      router.push("/login")
      return
    }

    const loadData = async () => {
      try {
        const [ordersData, productsData] = await Promise.all([getOrders(), getProducts()])
        setOrders(ordersData)
        setProducts(productsData)

        // Calcular estadísticas
        const completedOrders = ordersData.filter((order) => order.estado === "completado")
        setTotalVentas(completedOrders.length)
        setTotalIngresos(completedOrders.reduce((sum, order) => sum + order.total, 0))
        setProductosMasVendidos(getTopSellingProducts(productsData))
        setVentasPorCategoria(getSalesByCategory(productsData))
        setVentasPorMes(groupSalesByMonth(completedOrders))
      } catch (error) {
        console.error("Error al cargar datos:", error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [user, router])

  // Filtrar datos por rango de tiempo
  useEffect(() => {
    if (orders.length === 0 || products.length === 0) return

    let filteredOrders = [...orders]

    if (timeRange !== "all") {
      const now = new Date()
      const cutoffDate = new Date()

      switch (timeRange) {
        case "month":
          cutoffDate.setMonth(now.getMonth() - 1)
          break
        case "quarter":
          cutoffDate.setMonth(now.getMonth() - 3)
          break
        case "year":
          cutoffDate.setFullYear(now.getFullYear() - 1)
          break
      }

      filteredOrders = orders.filter((order) => new Date(order.fecha) >= cutoffDate && order.estado === "completado")
    } else {
      filteredOrders = orders.filter((order) => order.estado === "completado")
    }

    // Recalcular estadísticas
    setTotalVentas(filteredOrders.length)
    setTotalIngresos(filteredOrders.reduce((sum, order) => sum + order.total, 0))
    setVentasPorMes(groupSalesByMonth(filteredOrders))

    // Para productos más vendidos y categorías, necesitamos contar solo las ventas en el período
    if (timeRange !== "all") {
      // Crear un mapa de productos vendidos en el período
      const productSalesInPeriod: Record<string, number> = {}

      filteredOrders.forEach((order) => {
        order.items.forEach((item) => {
          if (!productSalesInPeriod[item.productId]) {
            productSalesInPeriod[item.productId] = 0
          }
          productSalesInPeriod[item.productId] += item.cantidad
        })
      })

      // Crear productos temporales con ventas ajustadas al período
      const adjustedProducts = products.map((product) => ({
        ...product,
        ventas: productSalesInPeriod[product.id] || 0,
      }))

      setProductosMasVendidos(getTopSellingProducts(adjustedProducts))
      setVentasPorCategoria(getSalesByCategory(adjustedProducts))
    } else {
      setProductosMasVendidos(getTopSellingProducts(products))
      setVentasPorCategoria(getSalesByCategory(products))
    }
  }, [timeRange, orders, products])

  if (loading) {
    return (
      <div className="container mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold mb-8">Cargando estadísticas...</h1>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Estadísticas de Ventas</h1>
          <p className="text-muted-foreground">Análisis detallado del rendimiento de ventas</p>
        </div>
        <div className="mt-4 md:mt-0">
          <Label htmlFor="timeRange" className="mr-2">
            Período:
          </Label>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Seleccionar período" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todo el tiempo</SelectItem>
              <SelectItem value="month">Último mes</SelectItem>
              <SelectItem value="quarter">Último trimestre</SelectItem>
              <SelectItem value="year">Último año</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Tarjetas de resumen */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total de Ventas</p>
                <h3 className="text-2xl font-bold">{totalVentas}</h3>
              </div>
              <div className="p-2 bg-yellow-100 rounded-full">
                <PackageIcon className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Ingresos Totales</p>
                <h3 className="text-2xl font-bold">${totalIngresos.toFixed(2)}</h3>
              </div>
              <div className="p-2 bg-green-100 rounded-full">
                <DollarSignIcon className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Producto Más Vendido</p>
                <h3 className="text-2xl font-bold">
                  {productosMasVendidos.length > 0 ? productosMasVendidos[0].ventas : 0}
                </h3>
                <p className="text-sm text-muted-foreground truncate max-w-[150px]">
                  {productosMasVendidos.length > 0 ? productosMasVendidos[0].nombre : "N/A"}
                </p>
              </div>
              <div className="p-2 bg-blue-100 rounded-full">
                <TrendingUpIcon className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Categoría Principal</p>
                <h3 className="text-2xl font-bold">
                  {ventasPorCategoria.length > 0 ? ventasPorCategoria[0].ventas : 0}
                </h3>
                <p className="text-sm text-muted-foreground truncate max-w-[150px]">
                  {ventasPorCategoria.length > 0 ? ventasPorCategoria[0].categoria : "N/A"}
                </p>
              </div>
              <div className="p-2 bg-purple-100 rounded-full">
                <ArrowUpIcon className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pestañas para diferentes gráficas */}
      <Tabs defaultValue="productos" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="productos">Productos Más Vendidos</TabsTrigger>
          <TabsTrigger value="categorias">Ventas por Categoría</TabsTrigger>
          <TabsTrigger value="tendencia">Tendencia de Ventas</TabsTrigger>
          <TabsTrigger value="ingresos">Ingresos por Categoría</TabsTrigger>
        </TabsList>

        {/* Gráfica de productos más vendidos */}
        <TabsContent value="productos">
          <Card>
            <CardHeader>
              <CardTitle>Top 10 Productos Más Vendidos</CardTitle>
              <CardDescription>Productos con mayor número de unidades vendidas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={productosMasVendidos}
                    layout="vertical"
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="nombre" type="category" width={150} />
                    <Tooltip formatter={(value) => [`${value} unidades`, "Ventas"]} />
                    <Legend />
                    <Bar dataKey="ventas" fill="#fbbf24" name="Unidades vendidas" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Gráfica de ventas por categoría */}
        <TabsContent value="categorias">
          <Card>
            <CardHeader>
              <CardTitle>Ventas por Categoría</CardTitle>
              <CardDescription>Distribución de ventas por categoría de producto</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col md:flex-row items-center">
              <div className="w-full md:w-1/2 h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={ventasPorCategoria}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={150}
                      fill="#8884d8"
                      dataKey="ventas"
                      nameKey="categoria"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {ventasPorCategoria.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value} unidades`, "Ventas"]} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="w-full md:w-1/2 mt-6 md:mt-0">
                <h4 className="font-medium mb-4">Detalles por Categoría</h4>
                <div className="space-y-2">
                  {ventasPorCategoria.map((category, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div
                          className="w-3 h-3 rounded-full mr-2"
                          style={{ backgroundColor: COLORS[index % COLORS.length] }}
                        ></div>
                        <span className="text-sm">{category.categoria}</span>
                      </div>
                      <span className="font-medium">{category.ventas} unidades</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Gráfica de tendencia de ventas */}
        <TabsContent value="tendencia">
          <Card>
            <CardHeader>
              <CardTitle>Tendencia de Ventas</CardTitle>
              <CardDescription>Evolución de ventas a lo largo del tiempo</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={ventasPorMes} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`${value}`, "Ventas"]} />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="ventas"
                      stroke="#fbbf24"
                      activeDot={{ r: 8 }}
                      name="Número de ventas"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Gráfica de ingresos por categoría */}
        <TabsContent value="ingresos">
          <Card>
            <CardHeader>
              <CardTitle>Ingresos por Categoría</CardTitle>
              <CardDescription>Total de ingresos generados por cada categoría</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={ventasPorCategoria} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="categoria" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`$${value.toFixed(2)}`, "Ingresos"]} />
                    <Legend />
                    <Bar dataKey="ingresos" fill="#65a30d" name="Ingresos ($)" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
