"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Menu, X, User, LogOut, PenToolIcon as Tool, Users, Package, BarChart } from "lucide-react"
import { usePathname } from "next/navigation"
import { useAuth } from "@/context/auth-context"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/context/cart-context"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()
  const { user, logout } = useAuth()
  const { items } = useCart()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  const totalItems = items.reduce((total, item) => total + item.quantity, 0)

  return (
    <header className="bg-neutral-900 text-white sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center">
            <span className="text-xl font-bold text-yellow-500">Ferrepoco</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/" className={`hover:text-yellow-500 ${pathname === "/" ? "text-yellow-500" : ""}`}>
              Inicio
            </Link>
            <Link
              href="/productos"
              className={`hover:text-yellow-500 ${pathname === "/productos" ? "text-yellow-500" : ""}`}
            >
              Productos
            </Link>
            {mounted && user && (user.role === "directivo" || user.role === "empleado") && (
              <>
                <Link
                  href="/admin/productos"
                  className={`hover:text-yellow-500 ${pathname === "/admin/productos" ? "text-yellow-500" : ""}`}
                >
                  Gestionar Productos
                </Link>
                <Link
                  href="/admin/ventas"
                  className={`hover:text-yellow-500 ${pathname === "/admin/ventas" ? "text-yellow-500" : ""}`}
                >
                  Estadísticas
                </Link>
              </>
            )}
            {mounted && user && user.role === "directivo" && (
              <Link
                href="/admin/empleados"
                className={`hover:text-yellow-500 ${pathname === "/admin/empleados" ? "text-yellow-500" : ""}`}
              >
                Gestionar Empleados
              </Link>
            )}
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <Link href="/carrito">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {mounted && totalItems > 0 && (
                  <Badge className="absolute -top-2 -right-2 bg-yellow-500 text-black">{totalItems}</Badge>
                )}
              </Button>
            </Link>

            {mounted && user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    <span>{user.nombre}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Mi cuenta</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Link href="/perfil" className="flex items-center w-full">
                      <User className="mr-2 h-4 w-4" />
                      <span>Perfil</span>
                    </Link>
                  </DropdownMenuItem>
                  {(user.role === "directivo" || user.role === "empleado") && (
                    <>
                      <DropdownMenuItem>
                        <Link href="/admin/productos" className="flex items-center w-full">
                          <Tool className="mr-2 h-4 w-4" />
                          <span>Gestionar Productos</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Link href="/admin/ventas" className="flex items-center w-full">
                          <BarChart className="mr-2 h-4 w-4" />
                          <span>Estadísticas de Ventas</span>
                        </Link>
                      </DropdownMenuItem>
                    </>
                  )}
                  {user.role === "directivo" && (
                    <DropdownMenuItem>
                      <Link href="/admin/empleados" className="flex items-center w-full">
                        <Users className="mr-2 h-4 w-4" />
                        <span>Gestionar Empleados</span>
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem>
                    <Link href="/pedidos" className="flex items-center w-full">
                      <Package className="mr-2 h-4 w-4" />
                      <span>Mis Pedidos</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Cerrar Sesión</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center space-x-2">
                <Link href="/login">
                  <Button variant="ghost">Iniciar Sesión</Button>
                </Link>
                <Link href="/registro">
                  <Button className="bg-yellow-500 hover:bg-yellow-600 text-black">Registrarse</Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <Link href="/carrito" className="mr-2">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {mounted && totalItems > 0 && (
                  <Badge className="absolute -top-2 -right-2 bg-yellow-500 text-black">{totalItems}</Badge>
                )}
              </Button>
            </Link>
            <Button variant="ghost" size="icon" onClick={toggleMenu}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-neutral-800 p-4">
          <nav className="flex flex-col space-y-4">
            <Link
              href="/"
              className={`hover:text-yellow-500 ${pathname === "/" ? "text-yellow-500" : ""}`}
              onClick={closeMenu}
            >
              Inicio
            </Link>
            <Link
              href="/productos"
              className={`hover:text-yellow-500 ${pathname === "/productos" ? "text-yellow-500" : ""}`}
              onClick={closeMenu}
            >
              Productos
            </Link>
            {mounted && user && (user.role === "directivo" || user.role === "empleado") && (
              <>
                <Link
                  href="/admin/productos"
                  className={`hover:text-yellow-500 ${pathname === "/admin/productos" ? "text-yellow-500" : ""}`}
                  onClick={closeMenu}
                >
                  Gestionar Productos
                </Link>
                <Link
                  href="/admin/ventas"
                  className={`hover:text-yellow-500 ${pathname === "/admin/ventas" ? "text-yellow-500" : ""}`}
                  onClick={closeMenu}
                >
                  Estadísticas
                </Link>
              </>
            )}
            {mounted && user && user.role === "directivo" && (
              <Link
                href="/admin/empleados"
                className={`hover:text-yellow-500 ${pathname === "/admin/empleados" ? "text-yellow-500" : ""}`}
                onClick={closeMenu}
              >
                Gestionar Empleados
              </Link>
            )}
            {mounted && user ? (
              <>
                <Link href="/perfil" className="hover:text-yellow-500" onClick={closeMenu}>
                  Perfil
                </Link>
                <Link href="/pedidos" className="hover:text-yellow-500" onClick={closeMenu}>
                  Mis Pedidos
                </Link>
                <button
                  onClick={() => {
                    logout()
                    closeMenu()
                  }}
                  className="text-left hover:text-yellow-500"
                >
                  Cerrar Sesión
                </button>
              </>
            ) : (
              <div className="flex flex-col space-y-2">
                <Link href="/login" onClick={closeMenu}>
                  <Button variant="ghost" className="w-full justify-start">
                    Iniciar Sesión
                  </Button>
                </Link>
                <Link href="/registro" onClick={closeMenu}>
                  <Button className="w-full bg-yellow-500 hover:bg-yellow-600 text-black">Registrarse</Button>
                </Link>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  )
}
