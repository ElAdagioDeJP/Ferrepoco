"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { useAuth } from "@/context/auth-context"
import { getProductById, updateProduct, getCategories } from "@/lib/data"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function EditarProductoPage() {
  const { id } = useParams()
  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    cantidad: "",
    categoria: "",
    imagen: "",
    featured: false,
    ventas: 0,
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [categories, setCategories] = useState<string[]>([])
  const { user } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    // Verificar si el usuario tiene permisos
    if (!user || (user.role !== "empleado" && user.role !== "directivo")) {
      router.push("/login")
      return
    }

    // Cargar datos del producto y categorías
    const loadData = async () => {
      try {
        if (typeof id !== "string") return

        // Cargar categorías
        const categoriesList = await getCategories()
        setCategories(categoriesList)

        // Cargar producto
        const product = await getProductById(id)
        if (!product) {
          toast({
            title: "Error",
            description: "Producto no encontrado",
            variant: "destructive",
          })
          router.push("/admin/productos")
          return
        }

        setFormData({
          nombre: product.nombre,
          descripcion: product.descripcion,
          precio: product.precio.toString(),
          cantidad: product.cantidad.toString(),
          categoria: product.categoria,
          imagen: product.imagen,
          featured: product.featured || false,
          ventas: product.ventas || 0,
        })
      } catch (error) {
        console.error("Error al cargar datos:", error)
        toast({
          title: "Error",
          description: "No se pudieron cargar los datos",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [id, user, router, toast])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement

    if (type === "checkbox") {
      const { checked } = e.target as HTMLInputElement
      setFormData((prev) => ({ ...prev, [name]: checked }))
    } else if (name === "precio" || name === "cantidad") {
      // Validar que solo se ingresen números
      if (value === "" || /^\d*\.?\d*$/.test(value)) {
        setFormData((prev) => ({ ...prev, [name]: value }))
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }))
    }
  }

  const handleCategoryChange = (value: string) => {
    setFormData((prev) => ({ ...prev, categoria: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      // Validar campos
      if (!formData.nombre || !formData.descripcion || !formData.precio || !formData.cantidad || !formData.categoria) {
        toast({
          title: "Error",
          description: "Todos los campos son obligatorios",
          variant: "destructive",
        })
        setSaving(false)
        return
      }

      if (typeof id !== "string") return

      // Actualizar producto
      await updateProduct(id, {
        nombre: formData.nombre,
        descripcion: formData.descripcion,
        precio: Number.parseFloat(formData.precio),
        cantidad: Number.parseInt(formData.cantidad),
        categoria: formData.categoria,
        imagen: formData.imagen,
        featured: formData.featured,
        ventas: formData.ventas,
      })

      toast({
        title: "Producto actualizado",
        description: "El producto ha sido actualizado correctamente",
      })

      // Redirigir a la lista de productos
      router.push("/admin/productos")
    } catch (error) {
      console.error("Error al actualizar producto:", error)
      toast({
        title: "Error",
        description: "No se pudo actualizar el producto",
        variant: "destructive",
      })
    } finally {
      setSaving(false)
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
      <Link href="/admin/productos" className="flex items-center text-yellow-600 hover:text-yellow-700 mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Volver a la lista de productos
      </Link>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Editar Producto</CardTitle>
          <CardDescription>Modifica los detalles del producto</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="nombre">Nombre del Producto</Label>
                <Input id="nombre" name="nombre" value={formData.nombre} onChange={handleChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="categoria">Categoría</Label>
                <Select value={formData.categoria} onValueChange={handleCategoryChange}>
                  <SelectTrigger id="categoria">
                    <SelectValue placeholder="Selecciona una categoría" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                    <SelectItem value="nueva">+ Agregar nueva categoría</SelectItem>
                  </SelectContent>
                </Select>
                {formData.categoria === "nueva" && (
                  <Input
                    className="mt-2"
                    placeholder="Escribe el nombre de la nueva categoría"
                    value=""
                    onChange={(e) => handleCategoryChange(e.target.value)}
                  />
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="descripcion">Descripción</Label>
              <Textarea
                id="descripcion"
                name="descripcion"
                value={formData.descripcion}
                onChange={handleChange}
                rows={4}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="precio">Precio ($)</Label>
                <Input id="precio" name="precio" type="text" value={formData.precio} onChange={handleChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cantidad">Cantidad en Stock</Label>
                <Input
                  id="cantidad"
                  name="cantidad"
                  type="text"
                  value={formData.cantidad}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="imagen">URL de la Imagen</Label>
                <Input id="imagen" name="imagen" value={formData.imagen} onChange={handleChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="ventas">Ventas</Label>
                <Input
                  id="ventas"
                  name="ventas"
                  type="number"
                  value={formData.ventas.toString()}
                  onChange={handleChange}
                  disabled={user?.role !== "directivo"}
                />
                {user?.role !== "directivo" && (
                  <p className="text-xs text-muted-foreground">Solo los directivos pueden modificar las ventas</p>
                )}
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="featured"
                name="featured"
                checked={formData.featured}
                onChange={handleChange}
                className="h-4 w-4 rounded border-gray-300 text-yellow-600 focus:ring-yellow-500"
              />
              <Label htmlFor="featured">Destacar en la página principal</Label>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Link href="/admin/productos">
              <Button variant="outline" type="button">
                Cancelar
              </Button>
            </Link>
            <Button type="submit" className="bg-yellow-500 hover:bg-yellow-600 text-black" disabled={saving}>
              {saving ? "Guardando..." : "Guardar Cambios"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
