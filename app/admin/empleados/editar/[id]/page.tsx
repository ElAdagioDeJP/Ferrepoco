"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { useAuth } from "@/context/auth-context"
import { getUserById, updateUser } from "@/lib/data"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function EditarEmpleadoPage() {
  const { id } = useParams()
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    password: "",
    confirmPassword: "",
    ci: "",
    telefono: "",
    role: "",
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const { user } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    // Verificar si el usuario es directivo
    if (!user || user.role !== "directivo") {
      router.push("/login")
      return
    }

    // Cargar datos del usuario
    const loadUser = async () => {
      try {
        if (typeof id !== "string") return

        const userData = await getUserById(id)
        if (!userData) {
          toast({
            title: "Error",
            description: "Usuario no encontrado",
            variant: "destructive",
          })
          router.push("/admin/empleados")
          return
        }

        // Solo permitir editar empleados y directivos
        if (userData.role !== "empleado" && userData.role !== "directivo") {
          toast({
            title: "Permiso denegado",
            description: "Solo puedes editar empleados y directivos",
            variant: "destructive",
          })
          router.push("/admin/empleados")
          return
        }

        setFormData({
          nombre: userData.nombre,
          email: userData.email,
          password: "",
          confirmPassword: "",
          ci: userData.ci,
          telefono: userData.telefono,
          role: userData.role,
        })
      } catch (error) {
        console.error("Error al cargar usuario:", error)
        toast({
          title: "Error",
          description: "No se pudo cargar el usuario",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    loadUser()
  }, [id, user, router, toast])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleRoleChange = (value: string) => {
    setFormData((prev) => ({ ...prev, role: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      if (typeof id !== "string") return

      // Validar contraseñas si se están cambiando
      if (formData.password || formData.confirmPassword) {
        if (formData.password !== formData.confirmPassword) {
          toast({
            title: "Error",
            description: "Las contraseñas no coinciden",
            variant: "destructive",
          })
          setSaving(false)
          return
        }
      }

      // Preparar datos para actualizar
      const updateData: Partial<{
        nombre: string
        email: string
        password: string
        ci: string
        telefono: string
        role: "empleado" | "directivo"
      }> = {
        nombre: formData.nombre,
        email: formData.email,
        ci: formData.ci,
        telefono: formData.telefono,
        role: formData.role as "empleado" | "directivo",
      }

      // Solo incluir contraseña si se está cambiando
      if (formData.password) {
        updateData.password = formData.password
      }

      // Actualizar usuario
      await updateUser(id, updateData)

      toast({
        title: "Usuario actualizado",
        description: "El usuario ha sido actualizado correctamente",
      })

      // Redirigir a la lista de empleados
      router.push("/admin/empleados")
    } catch (error) {
      console.error("Error al actualizar usuario:", error)
      toast({
        title: "Error",
        description: "No se pudo actualizar el usuario",
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
      <Link href="/admin/empleados" className="flex items-center text-yellow-600 hover:text-yellow-700 mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Volver a la lista de empleados
      </Link>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Editar Empleado</CardTitle>
          <CardDescription>Modifica los datos del empleado</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="nombre">Nombre Completo</Label>
                <Input id="nombre" name="nombre" value={formData.nombre} onChange={handleChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Correo Electrónico</Label>
                <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="ci">Cédula de Identidad</Label>
                <Input id="ci" name="ci" value={formData.ci} onChange={handleChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="telefono">Teléfono</Label>
                <Input id="telefono" name="telefono" value={formData.telefono} onChange={handleChange} required />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="role">Rol</Label>
              <Select value={formData.role} onValueChange={handleRoleChange}>
                <SelectTrigger id="role">
                  <SelectValue placeholder="Selecciona un rol" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="empleado">Empleado</SelectItem>
                  <SelectItem value="directivo">Directivo</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="password">Nueva Contraseña (opcional)</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                />
                <p className="text-xs text-muted-foreground">Dejar en blanco para mantener la contraseña actual</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirmar Nueva Contraseña</Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Link href="/admin/empleados">
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
