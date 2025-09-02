<template>
<<<<<<< HEAD
  <div id="webcrumbs">
    <div class="min-h-screen bg-gray-50">
      <header class="bg-white shadow-md">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between items-center py-6">
            <div class="flex items-center">
              <img src="https://images.unsplash.com/photo-1519520104014-df63821cb6f9?crop=entropy&amp;cs=tinysrgb&amp;fit=max&amp;fm=jpg&amp;ixid=M3w3MzkyNDZ8MHwxfHNlYXJjaHwxfHxmZXJyZXRlcmlhfGVufDB8fHx8MTc1NDAxNDg4Nnww&amp;ixlib=rb-4.1.0&amp;q=80&amp;w=1080" alt="Ferrepoco Logo" class="h-10 w-10 mr-3 rounded-md bg-primary-500" keywords="ferreteria, logo, construccion, herramientas" />
              <h1 class="text-2xl font-bold text-primary-700">Ferrepoco</h1>
            </div>
            <nav class="hidden md:flex space-x-8">
              <a href="#" class="text-gray-700 hover:text-primary-600 transition-colors">Inicio</a>
              <a href="#" class="text-gray-700 hover:text-primary-600 transition-colors font-semibold border-b-2 border-primary-500">Productos</a>
              <a href="#" class="text-gray-700 hover:text-primary-600 transition-colors">Pedidos</a>
              <a href="#" class="text-gray-700 hover:text-primary-600 transition-colors">Reportes</a>
            </nav>
            <div class="flex items-center space-x-4">
              <div class="relative">
                <details class="group">
                  <summary class="list-none cursor-pointer">
                    <button class="p-2 rounded-full hover:bg-gray-100 transition-colors relative">
                      <span class="material-symbols-outlined">notifications</span>
                      <span class="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">3</span>
                    </button>
                  </summary>
                  <div class="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                    <div class="p-3 border-b border-gray-200">
                      <h3 class="font-semibold">Notificaciones</h3>
                    </div>
                    <div class="max-h-96 overflow-y-auto">
                      <a href="#" class="block p-4 hover:bg-gray-50 border-b border-gray-100">
                        <p class="font-medium text-sm">Stock bajo en producto: Clavos 2″</p>
                        <p class="text-xs text-gray-500 mt-1">Hace 5 minutos</p>
                      </a>
                      <a href="#" class="block p-4 hover:bg-gray-50 border-b border-gray-100">
                        <p class="font-medium text-sm">Nuevo pedido #1082</p>
                        <p class="text-xs text-gray-500 mt-1">Hace 30 minutos</p>
                      </a>
                      <a href="#" class="block p-4 hover:bg-gray-50">
                        <p class="font-medium text-sm">Actualización de precio completada</p>
                        <p class="text-xs text-gray-500 mt-1">Hace 2 horas</p>
                      </a>
                    </div>
                  </div>
                </details>
              </div>
              <UserProfileBadge />
            </div>
          </div>
        </div>
      </header>
      <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h1 class="text-2xl font-bold text-gray-900">Productos</h1>
            <p class="mt-1 text-sm text-gray-500">Gestiona el inventario de tu ferretería</p>
          </div>
          <div class="mt-4 md:mt-0 flex flex-col sm:flex-row gap-3">
            <div class="relative">
              <span class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <span class="material-symbols-outlined text-gray-400">search</span>
              </span>
              <input type="text" placeholder="Buscar productos..." class="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500 w-full" />
            </div>
            <RouterLink to="/products" class="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-md flex items-center justify-center transition-colors">
              <span class="material-symbols-outlined mr-2">add</span>
              Nuevo Producto
            </RouterLink>
            <RouterLink to="/orders" class="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-md flex items-center justify-center transition-colors">
              <span class="material-symbols-outlined mr-2">edit</span>
              Gestionar Pedidos
            </RouterLink>
          </div>
        </div>
        <div class="bg-white rounded-lg shadow mb-6">
          <div class="p-4 flex flex-wrap gap-4">
            <div class="w-full md:w-auto">
              <label class="block text-sm font-medium text-gray-700 mb-1">Categoría</label>
              <select class="w-full md:w-48 border border-gray-300 rounded-md p-2 focus:ring-primary-500 focus:border-primary-500">
                <option value="">Todas las categorías</option>
                <option value="herramientas">Herramientas</option>
                <option value="construccion">Materiales de Construcción</option>
                <option value="pinturas">Pinturas y Acabados</option>
                <option value="plomeria">Plomería</option>
                <option value="electricidad">Electricidad</option>
              </select>
            </div>
            <div class="w-full md:w-auto">
              <label class="block text-sm font-medium text-gray-700 mb-1">Estado</label>
              <select class="w-full md:w-48 border border-gray-300 rounded-md p-2 focus:ring-primary-500 focus:border-primary-500">
                <option value="">Todos</option>
                <option value="disponible">Disponible</option>
                <option value="stock-bajo">Stock Bajo</option>
                <option value="agotado">Agotado</option>
              </select>
            </div>
            <div class="w-full md:w-auto">
              <label class="block text-sm font-medium text-gray-700 mb-1">Ordenar por</label>
              <select class="w-full md:w-48 border border-gray-300 rounded-md p-2 focus:ring-primary-500 focus:border-primary-500">
                <option value="nombre-asc">Nombre (A-Z)</option>
                <option value="nombre-desc">Nombre (Z-A)</option>
                <option value="precio-asc">Precio (Menor a Mayor)</option>
                <option value="precio-desc">Precio (Mayor a Menor)</option>
                <option value="stock">Stock (Mayor a Menor)</option>
              </select>
            </div>
            <div class="w-full md:w-auto md:ml-auto flex items-end">
              <button class="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-md flex items-center transition-colors">
                <span class="material-symbols-outlined mr-2">filter_alt</span>
                Más Filtros
=======
  <div class="min-h-screen bg-background">
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
       Employee-focused dashboard with task prioritization 
      <div class="mb-8">
        <div class="flex items-center justify-between mb-6">
          <div>
            <h1 class="font-heading text-3xl font-bold text-foreground">Panel de Empleado</h1>
            <p class="text-muted-foreground mt-1">Gestiona pedidos, inventario y tareas diarias</p>
          </div>
          <div class="flex items-center gap-3">
            <div class="text-right">
              <p class="text-sm text-muted-foreground">Turno actual</p>
              <p class="font-medium text-foreground">{{ currentShift }}</p>
            </div>
          </div>
        </div>

         Task-focused KPI cards for employee workflow 
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div class="bg-card border border-border rounded-xl p-6 hover:shadow-md transition-shadow">
            <div class="flex items-center justify-between">
              <div class="flex-1">
                <p class="text-sm text-muted-foreground mb-2">Pedidos Pendientes</p>
                <h3 class="font-heading text-3xl font-bold text-card-foreground">{{ pendingOrders.length }}</h3>
                <p class="text-xs text-muted-foreground mt-2">Para procesar hoy</p>
              </div>
              <div class="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center">
                <svg class="w-6 h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
                </svg>
              </div>
            </div>
          </div>

          <div class="bg-card border border-border rounded-xl p-6 hover:shadow-md transition-shadow">
            <div class="flex items-center justify-between">
              <div class="flex-1">
                <p class="text-sm text-muted-foreground mb-2">Stock Crítico</p>
                <h3 class="font-heading text-3xl font-bold text-card-foreground">{{ lowStockCount }}</h3>
                <p class="text-xs text-muted-foreground mt-2">Productos a reabastecer</p>
              </div>
              <div class="w-12 h-12 bg-destructive/10 rounded-xl flex items-center justify-center">
                <svg class="w-6 h-6 text-destructive" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
                </svg>
              </div>
            </div>
          </div>

          <div class="bg-card border border-border rounded-xl p-6 hover:shadow-md transition-shadow">
            <div class="flex items-center justify-between">
              <div class="flex-1">
                <p class="text-sm text-muted-foreground mb-2">Completados Hoy</p>
                <h3 class="font-heading text-3xl font-bold text-card-foreground">{{ completedToday }}</h3>
                <div class="flex items-center gap-1 mt-2">
                  <div class="flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 rounded-full">
                    <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                    </svg>
                    <span class="text-xs font-medium">En meta</span>
                  </div>
                </div>
              </div>
              <div class="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                <svg class="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
            </div>
          </div>

          <div class="bg-card border border-border rounded-xl p-6 hover:shadow-md transition-shadow">
            <div class="flex items-center justify-between">
              <div class="flex-1">
                <p class="text-sm text-muted-foreground mb-2">Tareas Urgentes</p>
                <h3 class="font-heading text-3xl font-bold text-card-foreground">{{ urgentTasks }}</h3>
                <p class="text-xs text-muted-foreground mt-2">Requieren atención</p>
              </div>
              <div class="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center">
                <svg class="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

       Employee workflow sections with modern design 
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
         Pending Orders Section 
        <div class="bg-card border border-border rounded-xl overflow-hidden">
          <div class="p-6 border-b border-border">
            <div class="flex items-center justify-between">
              <h3 class="font-heading text-lg font-semibold text-card-foreground">Pedidos Pendientes</h3>
              <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-secondary/10 text-secondary">
                {{ pendingOrders.length }} pendientes
              </span>
            </div>
          </div>
          <div class="p-4">
            <div class="space-y-4 max-h-80 overflow-y-auto">
              <div v-for="order in pendingOrders.slice(0, 5)" :key="order.id" class="p-4 bg-muted/30 rounded-lg">
                <div class="flex items-center justify-between mb-2">
                  <span class="font-medium text-sm text-card-foreground">Pedido #{{ order.id.substring(0, 8) }}</span>
                  <span class="text-xs text-muted-foreground">{{ formatDate(order.date) }}</span>
                </div>
                <p class="text-sm text-muted-foreground mb-3">Cliente: {{ order.clientId.substring(0, 8) }}</p>
                <div class="flex items-center justify-between">
                  <span class="font-medium text-primary">${{ order.total.toFixed(2) }}</span>
                  <button @click="processOrder(order.id)" class="px-3 py-1 bg-primary text-primary-foreground rounded-md text-xs hover:bg-primary/90 transition-colors">
                    Procesar
                  </button>
                </div>
              </div>
            </div>
            <div class="pt-4 text-center border-t border-border mt-4">
              <RouterLink to="/orders" class="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium text-sm transition-colors">
                Ver todos los pedidos
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                </svg>
              </RouterLink>
            </div>
          </div>
        </div>

         Stock Management Section 
        <div class="bg-card border border-border rounded-xl overflow-hidden">
          <div class="p-6 border-b border-border">
            <div class="flex items-center justify-between">
              <h3 class="font-heading text-lg font-semibold text-card-foreground">Gestión de Stock</h3>
              <button @click="loadProducts" class="p-2 rounded-lg hover:bg-muted transition-colors">
                <svg class="w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                </svg>
              </button>
            </div>
          </div>
          <div class="p-4">
            <div class="space-y-4 max-h-80 overflow-y-auto">
              <div v-for="product in lowStockProducts.slice(0, 5)" :key="product.id" class="p-4 bg-muted/30 rounded-lg">
                <div class="flex items-center justify-between mb-2">
                  <span class="font-medium text-sm text-card-foreground">{{ product.name }}</span>
                  <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-destructive/10 text-destructive">
                    {{ product.stock }} unidades
                  </span>
                </div>
                <p class="text-xs text-muted-foreground mb-3">{{ product.category }}</p>
                <div class="flex items-center gap-2">
                  <button @click="updateStock(product.id, -1)" class="px-2 py-1 bg-secondary/10 text-secondary rounded text-xs hover:bg-secondary/20 transition-colors">
                    Vender 1
                  </button>
                  <button @click="updateStock(product.id, 10)" class="px-2 py-1 bg-primary/10 text-primary rounded text-xs hover:bg-primary/20 transition-colors">
                    +10
                  </button>
                </div>
              </div>
            </div>
            <div class="pt-4 text-center border-t border-border mt-4">
              <RouterLink to="/products" class="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium text-sm transition-colors">
                Gestionar productos
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                </svg>
              </RouterLink>
            </div>
          </div>
        </div>

         Quick Actions Section 
        <div class="bg-card border border-border rounded-xl overflow-hidden">
          <div class="p-6 border-b border-border">
            <h3 class="font-heading text-lg font-semibold text-card-foreground">Acciones Rápidas</h3>
          </div>
          <div class="p-4">
            <div class="space-y-3">
              <button class="w-full flex items-center gap-3 p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors text-left">
                <div class="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                  <svg class="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                  </svg>
                </div>
                <div>
                  <p class="font-medium text-sm text-card-foreground">Nuevo Pedido</p>
                  <p class="text-xs text-muted-foreground">Crear pedido manual</p>
                </div>
              </button>

              <button @click="showStockModal = true" class="w-full flex items-center gap-3 p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors text-left">
                <div class="w-8 h-8 bg-secondary/10 rounded-lg flex items-center justify-center">
                  <svg class="w-4 h-4 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
                  </svg>
                </div>
                <div>
                  <p class="font-medium text-sm text-card-foreground">Ajustar Stock</p>
                  <p class="text-xs text-muted-foreground">Actualizar inventario</p>
                </div>
              </button>

              <button class="w-full flex items-center gap-3 p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors text-left">
                <div class="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center">
                  <svg class="w-4 h-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                  </svg>
                </div>
                <div>
                  <p class="font-medium text-sm text-card-foreground">Generar Reporte</p>
                  <p class="text-xs text-muted-foreground">Reporte de turno</p>
                </div>
>>>>>>> unificado
              </button>
            </div>
          </div>
        </div>
<<<<<<< HEAD
        <div class="bg-white rounded-lg shadow overflow-hidden mb-6">
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Producto</th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SKU</th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Categoría</th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Precio</th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                  <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <!-- Example product rows, repeat as needed -->
                <tr class="hover:bg-gray-50 transition-colors">
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                      <div class="h-10 w-10 bg-gray-200 rounded-md flex items-center justify-center mr-3">
                        <span class="material-symbols-outlined text-gray-600">build</span>
                      </div>
                      <div>
                        <div class="text-sm font-medium text-gray-900">Martillo Stanley</div>
                        <div class="text-xs text-gray-500">Herramientas manuales</div>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">HM-001</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Herramientas</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">$25.99</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2</td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">Stock Bajo</span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div class="flex justify-end space-x-2">
                      <button class="p-1 rounded-full hover:bg-gray-100 text-gray-600 hover:text-gray-900 transition-colors">
                        <span class="material-symbols-outlined">edit</span>
                      </button>
                      <button class="p-1 rounded-full hover:bg-gray-100 text-gray-600 hover:text-gray-900 transition-colors">
                        <span class="material-symbols-outlined">content_copy</span>
                      </button>
                      <button class="p-1 rounded-full hover:bg-gray-100 text-red-600 hover:text-red-700 transition-colors">
                        <span class="material-symbols-outlined">delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
                <!-- ...other product rows... -->
              </tbody>
            </table>
          </div>
          <!-- Edit Orders Button -->
          <div class="flex justify-end p-4">
            <button class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center transition-colors">
              <span class="material-symbols-outlined mr-2">edit</span>
              Editar Pedidos
            </button>
          </div>
          <div class="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
            <div class="text-sm text-gray-500">
              Mostrando <span class="font-medium">6</span> de <span class="font-medium">120</span> productos
            </div>
            <div class="flex space-x-2">
              <button class="px-3 py-1 border border-gray-300 rounded-md text-sm hover:bg-gray-50 transition-colors">Anterior</button>
              <button class="px-3 py-1 border border-gray-300 rounded-md text-sm bg-primary-50 text-primary-600 hover:bg-primary-100 transition-colors">1</button>
              <button class="px-3 py-1 border border-gray-300 rounded-md text-sm hover:bg-gray-50 transition-colors">2</button>
              <button class="px-3 py-1 border border-gray-300 rounded-md text-sm hover:bg-gray-50 transition-colors">3</button>
              <button class="px-3 py-1 border border-gray-300 rounded-md text-sm hover:bg-gray-50 transition-colors">...</button>
              <button class="px-3 py-1 border border-gray-300 rounded-md text-sm hover:bg-gray-50 transition-colors">20</button>
              <button class="px-3 py-1 border border-gray-300 rounded-md text-sm hover:bg-gray-50 transition-colors">Siguiente</button>
            </div>
          </div>
        </div>
        <div class="bg-white rounded-lg shadow p-6 mb-6">
    <!-- Modal Editar Producto -->
    <div v-if="showEditProductModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div class="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
        <button class="absolute top-2 right-2 text-gray-400 hover:text-gray-600" @click="showEditProductModal = false">
          <span class="material-symbols-outlined">close</span>
        </button>
        <h2 class="text-xl font-bold mb-4">Editar Producto</h2>
        <form @submit.prevent="saveProductEdit">
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
            <input v-model="editProduct.name" type="text" class="w-full border border-gray-300 rounded-md p-2" />
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-1">SKU</label>
            <input v-model="editProduct.sku" type="text" class="w-full border border-gray-300 rounded-md p-2" />
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-1">Precio</label>
            <input v-model="editProduct.price" type="number" step="0.01" class="w-full border border-gray-300 rounded-md p-2" />
          </div>
          <div class="flex justify-end gap-2">
            <button type="button" class="px-4 py-2 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300" @click="showEditProductModal = false">Cerrar</button>
            <button type="submit" class="px-4 py-2 rounded-md bg-primary-600 text-white hover:bg-primary-700">Guardar</button>
=======
      </div>

       Recent Activity Feed with modern styling 
      <div class="bg-card border border-border rounded-xl overflow-hidden">
        <div class="p-6 border-b border-border">
          <h3 class="font-heading text-lg font-semibold text-card-foreground">Actividad Reciente</h3>
        </div>
        <div class="p-6">
          <div class="space-y-4">
            <div v-for="activity in recentActivities" :key="activity.id" class="flex items-start gap-4">
              <div class="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" :class="activity.iconBg">
                <svg class="w-5 h-5" :class="activity.iconColor" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="activity.iconPath"/>
                </svg>
              </div>
              <div class="flex-1">
                <p class="text-sm text-card-foreground">{{ activity.message }}</p>
                <p class="text-xs text-muted-foreground mt-1">{{ activity.time }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

     Modern stock adjustment modal 
    <div v-if="showStockModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div class="bg-card border border-border rounded-xl shadow-xl w-full max-w-md p-6 relative">
        <button @click="showStockModal = false" class="absolute top-4 right-4 text-muted-foreground hover:text-foreground">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
        <h2 class="font-heading text-xl font-bold text-card-foreground mb-4">Ajustar Stock</h2>
        <form @submit.prevent="saveStockAdjustment" class="space-y-4">
          <div>
            <label for="stock-product" class="block text-sm font-medium text-foreground mb-1">Producto</label>
            <select id="stock-product" v-model="stockAdjustment.productId" class="w-full border border-border rounded-lg p-3 bg-input focus:ring-2 focus:ring-ring focus:border-primary">
              <option value="">Seleccionar producto</option>
              <option v-for="product in products" :key="product.id" :value="product.id">
                {{ product.name }} (Stock: {{ product.stock }})
              </option>
            </select>
          </div>
          <div>
            <label for="stock-quantity" class="block text-sm font-medium text-foreground mb-1">Cantidad (+/-)</label>
            <input id="stock-quantity" v-model="stockAdjustment.quantity" type="number" class="w-full border border-border rounded-lg p-3 bg-input focus:ring-2 focus:ring-ring focus:border-primary" />
          </div>
          <div>
            <label for="stock-reason" class="block text-sm font-medium text-foreground mb-1">Motivo</label>
            <input id="stock-reason" v-model="stockAdjustment.reason" type="text" placeholder="Venta, reposición, pérdida..." class="w-full border border-border rounded-lg p-3 bg-input focus:ring-2 focus:ring-ring focus:border-primary" />
          </div>
          <div class="flex items-center justify-end gap-3 pt-4">
            <button type="button" @click="showStockModal = false" class="px-4 py-2 rounded-lg border border-border text-muted-foreground hover:bg-muted transition-colors">
              Cancelar
            </button>
            <button type="submit" class="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
              Guardar Ajuste
            </button>
>>>>>>> unificado
          </div>
        </form>
      </div>
    </div>
<<<<<<< HEAD
          <h3 class="font-medium text-gray-900 mb-4">Acciones en Lote</h3>
        </div>
      </main>
    </div>
=======
>>>>>>> unificado
  </div>
</template>

<script setup>
<<<<<<< HEAD
import { ref } from 'vue';
import UserProfileBadge from '../components/UserProfileBadge.vue';

// Modal state
const showEditProductModal = ref(false);

// Example product info (replace with real data as needed)
const editProduct = ref({
  name: 'Martillo Stanley',
  sku: 'HM-001',
  price: 25.99
});

function saveProductEdit() {
  // Here you would send the updated product info to your API
  // For now, just close the modal
  showEditProductModal.value = false;
  // Optionally show a notification or refresh data
}
</script>

<style scoped>
@import url(https://fonts.googleapis.com/css2?family=Lato&display=swap);
@import url(https://fonts.googleapis.com/css2?family=Open+Sans&display=swap);
@import url(https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined);

*,
:after,
:before {
  --tw-border-spacing-x: 0;
  --tw-border-spacing-y: 0;
  --tw-translate-x: 0;
  --tw-translate-y: 0;
  --tw-rotate: 0;
  --tw-skew-x: 0;
  --tw-skew-y: 0;
  --tw-scale-x: 1;
  --tw-scale-y: 1;
  --tw-pan-x: ;
  --tw-pan-y: ;
  --tw-pinch-zoom: ;
  --tw-scroll-snap-strictness: proximity;
  --tw-gradient-from-position: ;
  --tw-gradient-via-position: ;
  --tw-gradient-to-position: ;
  --tw-ordinal: ;
  --tw-slashed-zero: ;
  --tw-numeric-figure: ;
  --tw-numeric-spacing: ;
  --tw-numeric-fraction: ;
  --tw-ring-inset: ;
  --tw-ring-offset-width: 0px;
  --tw-ring-offset-color: #fff;
  --tw-ring-color: rgba(59, 130, 246, 0.5);
  --tw-ring-offset-shadow: 0 0 #0000;
  --tw-ring-shadow: 0 0 #0000;
  --tw-shadow: 0 0 #0000;
  --tw-shadow-colored: 0 0 #0000;
  --tw-blur: ;
  --tw-brightness: ;
  --tw-contrast: ;
  --tw-grayscale: ;
  --tw-hue-rotate: ;
  --tw-invert: ;
  --tw-saturate: ;
  --tw-sepia: ;
  --tw-drop-shadow: ;
  --tw-backdrop-blur: ;
  --tw-backdrop-brightness: ;
  --tw-backdrop-contrast: ;
  --tw-backdrop-grayscale: ;
  --tw-backdrop-hue-rotate: ;
  --tw-backdrop-invert: ;
  --tw-backdrop-opacity: ;
  --tw-backdrop-saturate: ;
  --tw-backdrop-sepia: ;
  --tw-contain-size: ;
  --tw-contain-layout: ;
  --tw-contain-paint: ;
  --tw-contain-style: ;
}
::backdrop {
  --tw-border-spacing-x: 0;
  --tw-border-spacing-y: 0;
  --tw-translate-x: 0;
  --tw-translate-y: 0;
  --tw-rotate: 0;
  --tw-skew-x: 0;
  --tw-skew-y: 0;
  --tw-scale-x: 1;
  --tw-scale-y: 1;
  --tw-pan-x: ;
  --tw-pan-y: ;
  --tw-pinch-zoom: ;
  --tw-scroll-snap-strictness: proximity;
  --tw-gradient-from-position: ;
  --tw-gradient-via-position: ;
  --tw-gradient-to-position: ;
  --tw-ordinal: ;
  --tw-slashed-zero: ;
  --tw-numeric-figure: ;
  --tw-numeric-spacing: ;
  --tw-numeric-fraction: ;
  --tw-ring-inset: ;
  --tw-ring-offset-width: 0px;
  --tw-ring-offset-color: #fff;
  --tw-ring-color: rgba(59, 130, 246, 0.5);
  --tw-ring-offset-shadow: 0 0 #0000;
  --tw-ring-shadow: 0 0 #0000;
  --tw-shadow: 0 0 #0000;
  --tw-shadow-colored: 0 0 #0000;
  --tw-blur: ;
  --tw-brightness: ;
  --tw-contrast: ;
  --tw-grayscale: ;
  --tw-hue-rotate: ;
  --tw-invert: ;
  --tw-saturate: ;
  --tw-sepia: ;
  --tw-drop-shadow: ;
  --tw-backdrop-blur: ;
  --tw-backdrop-brightness: ;
  --tw-backdrop-contrast: ;
  --tw-backdrop-grayscale: ;
  --tw-backdrop-hue-rotate: ;
  --tw-backdrop-invert: ;
  --tw-backdrop-opacity: ;
  --tw-backdrop-saturate: ;
  --tw-backdrop-sepia: ;
  --tw-contain-size: ;
  --tw-contain-layout: ;
  --tw-contain-paint: ;
  --tw-contain-style: ;
} /*! tailwindcss v3.4.17 | MIT License | https://tailwindcss.com*/
*,
:after,
:before {
  border: 0 solid #e5e7eb;
  box-sizing: border-box;
}
:after,
:before {
  --tw-content: "";
}
:host,
html {
  line-height: 1.5;
  -webkit-text-size-adjust: 100%;
  font-family:
    Open Sans,
    ui-sans-serif,
    system-ui,
    sans-serif,
    Apple Color Emoji,
    Segoe UI Emoji,
    Segoe UI Symbol,
    Noto Color Emoji;
  font-feature-settings: normal;
  font-variation-settings: normal;
  -moz-tab-size: 4;
  tab-size: 4;
  -webkit-tap-highlight-color: transparent;
}
body {
  line-height: inherit;
  margin: 0;
}
hr {
  border-top-width: 1px;
  color: inherit;
  height: 0;
}
abbr:where([title]) {
  text-decoration: underline dotted;
}
h1,
h2,
h3,
h4,
h5,
h6 {
  font-size: inherit;
  font-weight: inherit;
}
a {
  color: inherit;
  text-decoration: inherit;
}
b,
strong {
  font-weight: bolder;
}
code,
kbd,
pre,
samp {
  font-family:
    ui-monospace,
    SFMono-Regular,
    Menlo,
    Monaco,
    Consolas,
    Liberation Mono,
    Courier New,
    monospace;
  font-feature-settings: normal;
  font-size: 1em;
  font-variation-settings: normal;
}
small {
  font-size: 80%;
}
sub,
sup {
  font-size: 75%;
  line-height: 0;
  position: relative;
  vertical-align: baseline;
}
sub {
  bottom: -0.25em;
}
sup {
  top: -0.5em;
}
table {
  border-collapse: collapse;
  border-color: inherit;
  text-indent: 0;
}
button,
input,
optgroup,
select,
textarea {
  color: inherit;
  font-family: inherit;
  font-feature-settings: inherit;
  font-size: 100%;
  font-variation-settings: inherit;
  font-weight: inherit;
  letter-spacing: inherit;
  line-height: inherit;
  margin: 0;
  padding: 0;
}
button,
select {
  text-transform: none;
}
button,
input:where([type="button"]),
input:where([type="reset"]),
input:where([type="submit"]) {
  -webkit-appearance: button;
  background-color: transparent;
  background-image: none;
}
:-moz-focusring {
  outline: auto;
}
:-moz-ui-invalid {
  box-shadow: none;
}
progress {
  vertical-align: baseline;
}
::-webkit-inner-spin-button,
::-webkit-outer-spin-button {
  height: auto;
}
[type="search"] {
  -webkit-appearance: textfield;
  outline-offset: -2px;
}
::-webkit-search-decoration {
  -webkit-appearance: none;
}
::-webkit-file-upload-button {
  -webkit-appearance: button;
  font: inherit;
}
summary {
  display: list-item;
}
blockquote,
dd,
dl,
figure,
h1,
h2,
h3,
h4,
h5,
h6,
hr,
p,
pre {
  margin: 0;
}
fieldset {
  margin: 0;
}
fieldset,
legend {
  padding: 0;
}
menu,
ol,
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
dialog {
  padding: 0;
}
textarea {
  resize: vertical;
}
input::placeholder,
textarea::placeholder {
  color: #9ca3af;
  opacity: 1;
}
[role="button"],
button {
  cursor: pointer;
}
:disabled {
  cursor: default;
}
audio,
canvas,
embed,
iframe,
img,
object,
svg,
video {
  display: block;
  vertical-align: middle;
}
img,
video {
  height: auto;
  max-width: 100%;
}
[hidden]:where(:not([hidden="until-found"])) {
  display: none;
}
#webcrumbs .pointer-events-none {
  pointer-events: none;
}
#webcrumbs .absolute {
  position: absolute;
}
#webcrumbs .relative {
  position: relative;
}
#webcrumbs .inset-y-0 {
  bottom: 0;
  top: 0;
}
#webcrumbs .left-0 {
  left: 0;
}
#webcrumbs .right-0 {
  right: 0;
}
#webcrumbs .top-0 {
  top: 0;
}
#webcrumbs .z-10 {
  z-index: 10;
}
#webcrumbs .mx-auto {
  margin-left: auto;
  margin-right: auto;
}
#webcrumbs .my-1 {
  margin-top: 4px;
}
#webcrumbs .mb-1,
#webcrumbs .my-1 {
  margin-bottom: 4px;
}
#webcrumbs .mb-4 {
  margin-bottom: 16px;
}
#webcrumbs .mb-6 {
  margin-bottom: 24px;
}
#webcrumbs .mr-2 {
  margin-right: 8px;
}
#webcrumbs .mr-3 {
  margin-right: 12px;
}
#webcrumbs .mt-1 {
  margin-top: 4px;
}
#webcrumbs .mt-2 {
  margin-top: 8px;
}
#webcrumbs .mt-4 {
  margin-top: 16px;
}
#webcrumbs .block {
  display: block;
}
#webcrumbs .flex {
  display: flex;
}
#webcrumbs .inline-flex {
  display: inline-flex;
}
#webcrumbs .hidden {
  display: none;
}
#webcrumbs .h-10 {
  height: 40px;
}
#webcrumbs .h-4 {
  height: 16px;
}
#webcrumbs .h-8 {
  height: 32px;
}
#webcrumbs .max-h-96 {
  max-height: 384px;
}
#webcrumbs .min-h-screen {
  min-height: 100vh;
}
#webcrumbs .w-10 {
  width: 40px;
}
#webcrumbs .w-4 {
  width: 16px;
}
#webcrumbs .w-48 {
  width: 192px;
}
#webcrumbs .w-8 {
  width: 32px;
}
#webcrumbs .w-80 {
  width: 320px;
}
#webcrumbs .w-full {
  width: 100%;
}
#webcrumbs .min-w-full {
  min-width: 100%;
}
#webcrumbs .max-w-7xl {
  max-width: 80rem;
}
#webcrumbs .cursor-pointer {
  cursor: pointer;
}
#webcrumbs .list-none {
  list-style-type: none;
}
#webcrumbs .flex-row {
  flex-direction: row;
}
#webcrumbs .flex-col {
  flex-direction: column;
}
#webcrumbs .flex-wrap {
  flex-wrap: wrap;
}
#webcrumbs .items-end {
  align-items: flex-end;
}
#webcrumbs .items-center {
  align-items: center;
}
#webcrumbs .justify-end {
  justify-content: flex-end;
}
#webcrumbs .justify-center {
  justify-content: center;
}
#webcrumbs .justify-between {
  justify-content: space-between;
}
#webcrumbs .gap-3 {
  gap: 12px;
}
#webcrumbs .gap-4 {
  gap: 16px;
}
#webcrumbs :is(.space-x-2 > :not([hidden]) ~ :not([hidden])) {
  --tw-space-x-reverse: 0;
  margin-left: calc(8px * (1 - var(--tw-space-x-reverse)));
  margin-right: calc(8px * var(--tw-space-x-reverse));
}
#webcrumbs :is(.space-x-4 > :not([hidden]) ~ :not([hidden])) {
  --tw-space-x-reverse: 0;
  margin-left: calc(16px * (1 - var(--tw-space-x-reverse)));
  margin-right: calc(16px * var(--tw-space-x-reverse));
}
#webcrumbs :is(.space-x-8 > :not([hidden]) ~ :not([hidden])) {
  --tw-space-x-reverse: 0;
  margin-left: calc(32px * (1 - var(--tw-space-x-reverse)));
  margin-right: calc(32px * var(--tw-space-x-reverse));
}
#webcrumbs :is(.divide-y > :not([hidden]) ~ :not([hidden])) {
  --tw-divide-y-reverse: 0;
  border-bottom-width: calc(1px * var(--tw-divide-y-reverse));
  border-top-width: calc(1px * (1 - var(--tw-divide-y-reverse)));
}
#webcrumbs :is(.divide-gray-200 > :not([hidden]) ~ :not([hidden])) {
  --tw-divide-opacity: 1;
  border-color: rgb(229 231 235 / var(--tw-divide-opacity, 1));
}
#webcrumbs .overflow-hidden {
  overflow: hidden;
}
#webcrumbs .overflow-x-auto {
  overflow-x: auto;
}
#webcrumbs .overflow-y-auto {
  overflow-y: auto;
}
#webcrumbs .whitespace-nowrap {
  white-space: nowrap;
}
#webcrumbs .rounded-full {
  border-radius: 9999px;
}
#webcrumbs .rounded-lg {
  border-radius: 24px;
}
#webcrumbs .rounded-md {
  border-radius: 18px;
}
#webcrumbs .border {
  border-width: 1px;
}
#webcrumbs .border-2 {
  border-width: 2px;
}
#webcrumbs .border-b {
  border-bottom-width: 1px;
}
#webcrumbs .border-b-2 {
  border-bottom-width: 2px;
}
#webcrumbs .border-t {
  border-top-width: 1px;
}
#webcrumbs .border-gray-100 {
  --tw-border-opacity: 1;
  border-color: rgb(243 244 246 / var(--tw-border-opacity, 1));
}
#webcrumbs .border-gray-200 {
  --tw-border-opacity: 1;
  border-color: rgb(229 231 235 / var(--tw-border-opacity, 1));
}
#webcrumbs .border-gray-300 {
  --tw-border-opacity: 1;
  border-color: rgb(209 213 219 / var(--tw-border-opacity, 1));
}
#webcrumbs .border-primary-300 {
  --tw-border-opacity: 1;
  border-color: rgb(183 169 255 / var(--tw-border-opacity, 1));
}
#webcrumbs .border-primary-500 {
  --tw-border-opacity: 1;
  border-color: rgb(115 65 255 / var(--tw-border-opacity, 1));
}
#webcrumbs .bg-gray-100 {
  --tw-bg-opacity: 1;
  background-color: rgb(243 244 246 / var(--tw-bg-opacity, 1));
}
#webcrumbs .bg-gray-200 {
  --tw-bg-opacity: 1;
  background-color: rgb(229 231 235 / var(--tw-bg-opacity, 1));
}
#webcrumbs .bg-gray-50 {
  --tw-bg-opacity: 1;
  background-color: rgb(249 250 251 / var(--tw-bg-opacity, 1));
}
#webcrumbs .bg-green-100 {
  --tw-bg-opacity: 1;
  background-color: rgb(220 252 231 / var(--tw-bg-opacity, 1));
}
#webcrumbs .bg-primary-50 {
  --tw-bg-opacity: 1;
  background-color: rgb(243 241 255 / var(--tw-bg-opacity, 1));
}
#webcrumbs .bg-primary-500 {
  --tw-bg-opacity: 1;
  background-color: rgb(115 65 255 / var(--tw-bg-opacity, 1));
}
#webcrumbs .bg-primary-600 {
  --tw-bg-opacity: 1;
  background-color: rgb(99 27 255 / var(--tw-bg-opacity, 1));
}
#webcrumbs .bg-red-100 {
  --tw-bg-opacity: 1;
  background-color: rgb(254 226 226 / var(--tw-bg-opacity, 1));
}
#webcrumbs .bg-red-500 {
  --tw-bg-opacity: 1;
  background-color: rgb(239 68 68 / var(--tw-bg-opacity, 1));
}
#webcrumbs .bg-white {
  --tw-bg-opacity: 1;
  background-color: rgb(255 255 255 / var(--tw-bg-opacity, 1));
}
#webcrumbs .bg-yellow-100 {
  --tw-bg-opacity: 1;
  background-color: rgb(254 249 195 / var(--tw-bg-opacity, 1));
}
#webcrumbs .p-1 {
  padding: 4px;
}
#webcrumbs .p-2 {
  padding: 8px;
}
#webcrumbs .p-3 {
  padding: 12px;
}
#webcrumbs .p-4 {
  padding: 16px;
}
#webcrumbs .p-6 {
  padding: 24px;
}
#webcrumbs .px-2 {
  padding-left: 8px;
  padding-right: 8px;
}
#webcrumbs .px-3 {
  padding-left: 12px;
  padding-right: 12px;
}
#webcrumbs .px-4 {
  padding-left: 16px;
  padding-right: 16px;
}
#webcrumbs .px-6 {
  padding-left: 24px;
  padding-right: 24px;
}
#webcrumbs .py-1 {
  padding-bottom: 4px;
  padding-top: 4px;
}
#webcrumbs .py-2 {
  padding-bottom: 8px;
  padding-top: 8px;
}
#webcrumbs .py-3 {
  padding-bottom: 12px;
  padding-top: 12px;
}
#webcrumbs .py-4 {
  padding-bottom: 16px;
  padding-top: 16px;
}
#webcrumbs .py-6 {
  padding-bottom: 24px;
  padding-top: 24px;
}
#webcrumbs .py-8 {
  padding-bottom: 32px;
  padding-top: 32px;
}
#webcrumbs .pl-10 {
  padding-left: 40px;
}
#webcrumbs .pl-3 {
  padding-left: 12px;
}
#webcrumbs .pr-4 {
  padding-right: 16px;
}
#webcrumbs .text-left {
  text-align: left;
}
#webcrumbs .text-right {
  text-align: right;
}
#webcrumbs .text-2xl {
  font-size: 24px;
  line-height: 31.200000000000003px;
}
#webcrumbs .text-sm {
  font-size: 14px;
  line-height: 21px;
}
#webcrumbs .text-xs {
  font-size: 12px;
  line-height: 19.200000000000003px;
}
#webcrumbs .font-bold {
  font-weight: 700;
}
#webcrumbs .font-medium {
  font-weight: 500;
}
#webcrumbs .font-semibold {
  font-weight: 600;
}
#webcrumbs .uppercase {
  text-transform: uppercase;
}
#webcrumbs .leading-5 {
  line-height: 1.25rem;
}
#webcrumbs .tracking-wider {
  letter-spacing: 0.05em;
}
#webcrumbs .text-gray-400 {
  --tw-text-opacity: 1;
  color: rgb(156 163 175 / var(--tw-text-opacity, 1));
}
#webcrumbs .text-gray-500 {
  --tw-text-opacity: 1;
  color: rgb(107 114 128 / var(--tw-text-opacity, 1));
}
#webcrumbs .text-gray-600 {
  --tw-text-opacity: 1;
  color: rgb(75 85 99 / var(--tw-text-opacity, 1));
}
#webcrumbs .text-gray-700 {
  --tw-text-opacity: 1;
  color: rgb(55 65 81 / var(--tw-text-opacity, 1));
}
#webcrumbs .text-gray-900 {
  --tw-text-opacity: 1;
  color: rgb(17 24 39 / var(--tw-text-opacity, 1));
}
#webcrumbs .text-green-800 {
  --tw-text-opacity: 1;
  color: rgb(22 101 52 / var(--tw-text-opacity, 1));
}
#webcrumbs .text-primary-600 {
  --tw-text-opacity: 1;
  color: rgb(99 27 255 / var(--tw-text-opacity, 1));
}
#webcrumbs .text-primary-700 {
  --tw-text-opacity: 1;
  color: rgb(97 27 248 / var(--tw-text-opacity, 1));
}
#webcrumbs .text-red-600 {
  --tw-text-opacity: 1;
  color: rgb(220 38 38 / var(--tw-text-opacity, 1));
}
#webcrumbs .text-red-800 {
  --tw-text-opacity: 1;
  color: rgb(153 27 27 / var(--tw-text-opacity, 1));
}
#webcrumbs .text-white {
  --tw-text-opacity: 1;
  color: rgb(255 255 255 / var(--tw-text-opacity, 1));
}
#webcrumbs .text-yellow-800 {
  --tw-text-opacity: 1;
  color: rgb(133 77 14 / var(--tw-text-opacity, 1));
}
#webcrumbs .shadow {
  --tw-shadow:
    0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1);
  --tw-shadow-colored:
    0 1px 3px 0 var(--tw-shadow-color), 0 1px 2px -1px var(--tw-shadow-color);
}
#webcrumbs .shadow,
#webcrumbs .shadow-lg {
  box-shadow:
    var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000),
    var(--tw-shadow);
}
#webcrumbs .shadow-lg {
  --tw-shadow:
    0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1);
  --tw-shadow-colored:
    0 10px 15px -3px var(--tw-shadow-color),
    0 4px 6px -4px var(--tw-shadow-color);
}
#webcrumbs .shadow-md {
  --tw-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1);
  --tw-shadow-colored:
    0 4px 6px -1px var(--tw-shadow-color), 0 2px 4px -2px var(--tw-shadow-color);
  box-shadow:
    var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000),
    var(--tw-shadow);
}
#webcrumbs .transition-colors {
  transition-duration: 0.15s;
  transition-property:
    color, background-color, border-color, text-decoration-color, fill, stroke;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}
#webcrumbs {
  font-family: Open Sans !important;
  font-size: 16px !important;
}
#webcrumbs :is(.bg-primary-50) {
  color: rgba(0, 0, 0, 0.9) !important;
}
#webcrumbs :is(.bg-primary-500) {
  color: hsla(0, 0%, 100%, 0.9) !important;
}
#webcrumbs :is(.bg-primary-600) {
  color: hsla(0, 0%, 100%, 0.9) !important;
}
#webcrumbs .hover\:bg-gray-100:hover {
  --tw-bg-opacity: 1;
  background-color: rgb(243 244 246 / var(--tw-bg-opacity, 1));
}
#webcrumbs .hover\:bg-gray-200:hover {
  --tw-bg-opacity: 1;
  background-color: rgb(229 231 235 / var(--tw-bg-opacity, 1));
}
#webcrumbs .hover\:bg-gray-50:hover {
  --tw-bg-opacity: 1;
  background-color: rgb(249 250 251 / var(--tw-bg-opacity, 1));
}
#webcrumbs .hover\:bg-primary-100:hover {
  --tw-bg-opacity: 1;
  background-color: rgb(233 229 255 / var(--tw-bg-opacity, 1));
}
#webcrumbs .hover\:bg-primary-700:hover {
  --tw-bg-opacity: 1;
  background-color: rgb(97 27 248 / var(--tw-bg-opacity, 1));
}
#webcrumbs .hover\:text-gray-900:hover {
  --tw-text-opacity: 1;
  color: rgb(17 24 39 / var(--tw-text-opacity, 1));
}
#webcrumbs .hover\:text-primary-600:hover {
  --tw-text-opacity: 1;
  color: rgb(99 27 255 / var(--tw-text-opacity, 1));
}
#webcrumbs .hover\:text-red-700:hover {
  --tw-text-opacity: 1;
  color: rgb(185 28 28 / var(--tw-text-opacity, 1));
}
#webcrumbs .focus\:border-primary-500:focus {
  --tw-border-opacity: 1;
  border-color: rgb(115 65 255 / var(--tw-border-opacity, 1));
}
#webcrumbs .focus\:ring-primary-500:focus {
  --tw-ring-opacity: 1;
  --tw-ring-color: rgb(115 65 255 / var(--tw-ring-opacity, 1));
}
@media (min-width: 640px) {
  #webcrumbs .sm\:flex-row {
    flex-direction: row;
  }
  #webcrumbs .sm\:px-6 {
    padding-left: 25px;
    padding-right: 25px;
  }
}
@media (min-width: 768px) {
  #webcrumbs .md\:ml-auto {
    margin-left: auto;
  }
  #webcrumbs .md\:mt-0 {
    margin-top: 0;
  }
  #webcrumbs .md\:block {
    display: block;
  }
  #webcrumbs .md\:flex {
    display: flex;
  }
  #webcrumbs .md\:w-48 {
    width: 192px;
  }
  #webcrumbs .md\:w-auto {
    width: auto;
  }
  #webcrumbs .md\:flex-row {
    flex-direction: row;
  }
  #webcrumbs .md\:items-center {
    align-items: center;
  }
  #webcrumbs .md\:justify-between {
    justify-content: space-between;
  }
}
@media (min-width: 1024px) {
  #webcrumbs .lg\:px-8 {
    padding-left: 33px;
    padding-right: 33px;
  }
}

</style>
=======
import { ref, onMounted, computed } from 'vue';
import { useAuthStore } from '../stores/auth';
import apiClient from '../api/apiClient';

const auth = useAuthStore();
auth.initializeAuth();

// Reactive data
const pendingOrders = ref([]);
const products = ref([]);
const lowStockProducts = ref([]);
const showStockModal = ref(false);
const completedToday = ref(12);
const urgentTasks = ref(3);

const stockAdjustment = ref({
  productId: '',
  quantity: 0,
  reason: ''
});

const alerts = ref([
  { id: 1, message: 'Stock bajo en Clavos 2″', time: 'Hace 5 minutos' },
  { id: 2, message: 'Nuevo pedido #1082', time: 'Hace 30 minutos' },
  { id: 3, message: 'Reposición pendiente', time: 'Hace 1 hora' }
]);

const recentActivities = ref([
  {
    id: 1,
    message: 'Procesaste el pedido #1081 exitosamente',
    time: 'Hace 15 minutos',
    iconBg: 'bg-primary/10',
    iconColor: 'text-primary',
    iconPath: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
  },
  {
    id: 2,
    message: 'Actualizaste el stock de Martillo Stanley',
    time: 'Hace 30 minutos',
    iconBg: 'bg-secondary/10',
    iconColor: 'text-secondary',
    iconPath: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4'
  },
  {
    id: 3,
    message: 'Generaste el reporte de turno matutino',
    time: 'Hace 2 horas',
    iconBg: 'bg-accent/10',
    iconColor: 'text-accent',
    iconPath: 'M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
  }
]);

// Computed properties
const currentShift = computed(() => {
  const hour = new Date().getHours();
  if (hour >= 6 && hour < 14) return 'Matutino (6:00 - 14:00)';
  if (hour >= 14 && hour < 22) return 'Vespertino (14:00 - 22:00)';
  return 'Nocturno (22:00 - 6:00)';
});

const lowStockCount = computed(() => lowStockProducts.value.length);

// Methods
async function loadOrders() {
  try {
    const response = await apiClient.get('/orders');
    pendingOrders.value = response.data.filter(order => order.status === 'pending');
  } catch (error) {
    console.error('Error loading orders:', error);
  }
}

async function loadProducts() {
  try {
    const response = await apiClient.get('/products');
    products.value = response.data;
    lowStockProducts.value = response.data.filter(product => product.stock <= 10);
  } catch (error) {
    console.error('Error loading products:', error);
  }
}

async function processOrder(orderId) {
  try {
    await apiClient.put(`/orders/${orderId}/status`, { status: 'completed' });
    await loadOrders();
    // Add to recent activities
    recentActivities.value.unshift({
      id: Date.now(),
      message: `Procesaste el pedido #${orderId.substring(0, 8)} exitosamente`,
      time: 'Ahora',
      iconBg: 'bg-primary/10',
      iconColor: 'text-primary',
      iconPath: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
    });
  } catch (error) {
    console.error('Error processing order:', error);
  }
}

async function updateStock(productId, quantity) {
  try {
    await apiClient.put(`/inventory/stock/${productId}`, { quantity });
    await loadProducts();
  } catch (error) {
    console.error('Error updating stock:', error);
  }
}

async function saveStockAdjustment() {
  try {
    const payload = { 
      quantity: Number(stockAdjustment.value.quantity),
      motivo: stockAdjustment.value.reason 
    };
    await apiClient.put(`/inventory/stock/${stockAdjustment.value.productId}`, payload);
    await loadProducts();
    showStockModal.value = false;
    stockAdjustment.value = { productId: '', quantity: 0, reason: '' };
  } catch (error) {
    console.error('Error adjusting stock:', error);
  }
}

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString('es-ES', {
    day: '2-digit',
    month: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  });
}

// Initialize data
onMounted(async () => {
  await Promise.all([loadOrders(), loadProducts()]);
});
</script>
>>>>>>> unificado
