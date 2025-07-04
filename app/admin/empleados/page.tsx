"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/auth-context"
import { getUsers, deleteUser, type User } from "@/lib/data"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Edit, Plus, Trash2, UserIcon } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/components/ui/use-toast"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Badge } from "@/components/ui/badge"

export default function AdminEmpleadosPage() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    // Verificar si el usuario es directivo
    if (user && user.role === "directivo") {
      loadUsers()
    } else {
      router.push("/login")
    }
  }, [user, router])

  const loadUsers = async () => {
    try {
      const userList = await getUsers()
      // Filtrar para mostrar solo empleados y directivos
      const filteredUsers = userList.filter((u) => u.role === "empleado" || u.role === "directivo")
      setUsers(filteredUsers)
    } catch (error) {
      console.error("Error al cargar usuarios:", error)
      toast({
        title: "Error",
        description: "No se pudieron cargar los usuarios",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteUser = async (id: string) => {
    try {
      // No permitir eliminar al usuario actual
      if (id === user?.id) {
        toast({
          title: "Operación no permitida",
          description: "No puedes eliminar tu propia cuenta",
          variant: "destructive",
        })
        return
      }

      await deleteUser(id)
      toast({
        title: "Usuario eliminado",
        description: "El usuario ha sido eliminado correctamente",
      })
      loadUsers() // Recargar la lista
    } catch (error) {
      console.error("Error al eliminar usuario:", error)
      toast({
        title: "Error",
        description: "No se pudo eliminar el usuario",
        variant: "destructive",
      })
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
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-2xl">Gestión de Empleados</CardTitle>
            <CardDescription>Administra los empleados y directivos de la tienda</CardDescription>
          </div>
          <Link href="/admin/empleados/nuevo">
            <Button className="bg-yellow-500 hover:bg-yellow-600 text-black">
              <Plus className="mr-2 h-4 w-4" />
              Nuevo Empleado
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          {users.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium mb-2">No hay empleados</h3>
              <p className="text-muted-foreground mb-4">Aún no se han agregado empleados a la tienda.</p>
              <Link href="/admin/empleados/nuevo">
                <Button className="bg-yellow-500 hover:bg-yellow-600 text-black">
                  <Plus className="mr-2 h-4 w-4" />
                  Agregar Empleado
                </Button>
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead></TableHead>
                    <TableHead>Nombre</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Cédula</TableHead>
                    <TableHead>Teléfono</TableHead>
                    <TableHead>Rol</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((userData) => (
                    <TableRow key={userData.id}>
                      <TableCell>
                        <div className="bg-neutral-100 p-2 rounded-full">
                          <UserIcon className="h-5 w-5 text-neutral-500" />
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">{userData.nombre}</TableCell>
                      <TableCell>{userData.email}</TableCell>
                      <TableCell>{userData.ci}</TableCell>
                      <TableCell>{userData.telefono}</TableCell>
                      <TableCell>
                        <Badge
                          className={
                            userData.role === "directivo"
                              ? "bg-yellow-500 text-black"
                              : "bg-neutral-200 text-neutral-800"
                          }
                        >
                          {userData.role === "directivo" ? "Directivo" : "Empleado"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Link href={`/admin/empleados/editar/${userData.id}`}>
                            <Button variant="outline" size="icon">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </Link>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="outline" size="icon" className="text-red-500">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Esta acción no se puede deshacer. Esto eliminará permanentemente la cuenta del
                                  usuario.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDeleteUser(userData.id)}
                                  className="bg-red-500 hover:bg-red-600"
                                >
                                  Eliminar
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
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
