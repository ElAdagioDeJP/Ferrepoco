<template>
  <div class="min-h-screen bg-background">
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
       Enhanced KPI cards with better visual hierarchy and semantic colors 
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div class="bg-card border border-border rounded-xl p-6 hover:shadow-md transition-shadow">
          <div class="flex items-center justify-between">
            <div class="flex-1">
              <p class="text-sm text-muted-foreground mb-2">Ventas Totales</p>
              <h3 class="font-heading text-3xl font-bold text-card-foreground">${{ totalSales.toFixed(2) }}</h3>
              <div class="flex items-center gap-1 mt-3">
                <div class="flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 rounded-full">
                  <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>
                  </svg>
                  <span class="text-xs font-medium">+12%</span>
                </div>
                <span class="text-xs text-muted-foreground">vs ayer</span>
              </div>
            </div>
            <div class="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
              <svg class="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"/>
              </svg>
            </div>
          </div>
        </div>

        <div class="bg-card border border-border rounded-xl p-6 hover:shadow-md transition-shadow">
          <div class="flex items-center justify-between">
            <div class="flex-1">
              <p class="text-sm text-muted-foreground mb-2">Pedidos Nuevos</p>
              <h3 class="font-heading text-3xl font-bold text-card-foreground">{{ ordersThisMonth }}</h3>
              <div class="flex items-center gap-1 mt-3">
                <div class="flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 rounded-full">
                  <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>
                  </svg>
                  <span class="text-xs font-medium">+5%</span>
                </div>
                <span class="text-xs text-muted-foreground">vs ayer</span>
              </div>
            </div>
            <div class="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center">
              <svg class="w-6 h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
              </svg>
            </div>
          </div>
        </div>

        <div class="bg-card border border-border rounded-xl p-6 hover:shadow-md transition-shadow">
          <div class="flex items-center justify-between">
            <div class="flex-1">
              <p class="text-sm text-muted-foreground mb-2">Clientes Nuevos</p>
              <h3 class="font-heading text-3xl font-bold text-card-foreground">{{ clientsCount }}</h3>
              <div class="flex items-center gap-1 mt-3">
                <div class="flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 rounded-full">
                  <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>
                  </svg>
                  <span class="text-xs font-medium">+2%</span>
                </div>
                <span class="text-xs text-muted-foreground">vs ayer</span>
              </div>
            </div>
            <div class="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center">
              <svg class="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"/>
              </svg>
            </div>
          </div>
        </div>

        <div class="bg-card border border-border rounded-xl p-6 hover:shadow-md transition-shadow">
          <div class="flex items-center justify-between">
            <div class="flex-1">
              <p class="text-sm text-muted-foreground mb-2">Alertas de Stock</p>
              <h3 class="font-heading text-3xl font-bold text-card-foreground">{{ lowStockProducts.length }}</h3>
              <div class="flex items-center gap-1 mt-3">
                <div class="flex items-center gap-1 px-2 py-1 bg-destructive/10 text-destructive rounded-full">
                  <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
                  </svg>
                  <span class="text-xs font-medium">Atención</span>
                </div>
              </div>
            </div>
            <div class="w-12 h-12 bg-destructive/10 rounded-xl flex items-center justify-center">
              <svg class="w-6 h-6 text-destructive" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
              </svg>
            </div>
          </div>
        </div>
      </div>

       Improved charts and analytics section with modern design 
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div class="bg-card border border-border rounded-xl col-span-1 lg:col-span-2 overflow-hidden">
          <div class="p-6 border-b border-border">
            <div class="flex items-center justify-between">
              <h3 class="font-heading text-lg font-semibold text-card-foreground">Ventas Mensuales</h3>
              <div class="flex items-center gap-2">
                <div class="flex items-center gap-1 text-xs text-muted-foreground">
                  <div class="w-2 h-2 bg-primary rounded-full"></div>
                  <span>Pedidos {{ new Date().getFullYear() }}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="p-6">
            <div class="h-80 flex items-center justify-center bg-muted/30 rounded-lg">
              <canvas id="monthlySalesChart" class="w-full h-full"></canvas>
            </div>
          </div>
        </div>

        <div class="bg-card border border-border rounded-xl overflow-hidden">
          <div class="p-6 border-b border-border">
            <h3 class="font-heading text-lg font-semibold text-card-foreground">Productos con Stock Bajo</h3>
          </div>
          <div class="p-4">
            <div class="space-y-4 max-h-80 overflow-y-auto">
              <div v-for="product in lowStockProducts.slice(0, 5)" :key="product.id" class="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 bg-destructive/10 rounded-lg flex items-center justify-center">
                    <svg class="w-5 h-5 text-destructive" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 7.172V5L8 4z"/>
                    </svg>
                  </div>
                  <div>
                    <p class="font-medium text-sm text-card-foreground">{{ product.name }}</p>
                    <p class="text-xs text-muted-foreground">{{ product.stock }} unidades</p>
                  </div>
                </div>
                
              </div>
            </div>
            <div class="pt-4 text-center border-t border-border mt-4">
              <RouterLink
                to="/products"
                class="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium text-sm transition-colors"
              >
                Ver todos los productos
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                </svg>
              </RouterLink>
            </div>
          </div>
        </div>
      </div>

       Modern users table with improved styling 
      <div class="bg-card border border-border rounded-xl mb-8 overflow-hidden">
        <div class="p-6 border-b border-border">
          <div class="flex items-center justify-between">
            <div>
              <h3 class="font-heading text-lg font-semibold text-card-foreground">Gestión de Usuarios</h3>
              <p class="text-sm text-muted-foreground mt-1">Administra los usuarios del sistema</p>
            </div>
            <div class="flex items-center gap-3">
              <button @click="fetchUsers" class="p-2 rounded-lg hover:bg-muted transition-colors">
                <svg class="w-5 h-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                </svg>
              </button>
              <RouterLink to="/admin/users" class="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"/>
                </svg>
                Gestionar usuarios
              </RouterLink>
            </div>
          </div>
        </div>
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-border">
            <thead class="bg-muted/30">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">ID</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Usuario</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Rol</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody class="bg-card divide-y divide-border">
              <tr v-for="user in users.slice(0, 5)" :key="user.id" class="hover:bg-muted/30 transition-colors">
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-card-foreground">{{ user.id }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">{{ user.username }}</td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium" 
                    :class="{
                      'bg-primary/10 text-primary': user.role === 'admin',
                      'bg-secondary/10 text-secondary': user.role === 'employee',
                      'bg-accent/10 text-accent': user.role === 'client'
                    }">
                    {{ user.role }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button @click="disableUser(user.id)" class="text-destructive hover:text-destructive/80 p-1 rounded transition-colors">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L18.364 5.636M5.636 18.364l12.728-12.728"/>
                    </svg>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div class="bg-card border border-border rounded-xl overflow-hidden">
          <div class="p-6 border-b border-border">
            <h3 class="font-heading text-lg font-semibold text-card-foreground">Categorías Más Vendidas</h3>
          </div>
          <div class="p-6">
            <div class="space-y-4">
              <div>
                <div class="flex justify-between items-center mb-2">
                  <span class="text-sm font-medium text-card-foreground">Herramientas Manuales</span>
                  <span class="text-sm text-muted-foreground">32%</span>
                </div>
                <div class="w-full bg-muted rounded-full h-2">
                  <div class="bg-primary h-2 rounded-full transition-all duration-300" style="width:32%"></div>
                </div>
              </div>
              
              <div>
                <div class="flex justify-between items-center mb-2">
                  <span class="text-sm font-medium text-card-foreground">Materiales de Construcción</span>
                  <span class="text-sm text-muted-foreground">28%</span>
                </div>
                <div class="w-full bg-muted rounded-full h-2">
                  <div class="bg-secondary h-2 rounded-full transition-all duration-300" style="width:28%"></div>
                </div>
              </div>
              
              <div>
                <div class="flex justify-between items-center mb-2">
                  <span class="text-sm font-medium text-card-foreground">Pinturas y Acabados</span>
                  <span class="text-sm text-muted-foreground">18%</span>
                </div>
                <div class="w-full bg-muted rounded-full h-2">
                  <div class="bg-accent h-2 rounded-full transition-all duration-300" style="width:18%"></div>
                </div>
              </div>
              
              <div>
                <div class="flex justify-between items-center mb-2">
                  <span class="text-sm font-medium text-card-foreground">Plomería</span>
                  <span class="text-sm text-muted-foreground">15%</span>
                </div>
                <div class="w-full bg-muted rounded-full h-2">
                  <div class="bg-chart-4 h-2 rounded-full transition-all duration-300" style="width:15%"></div>
                </div>
              </div>
              
              <div>
                <div class="flex justify-between items-center mb-2">
                  <span class="text-sm font-medium text-card-foreground">Electricidad</span>
                  <span class="text-sm text-muted-foreground">7%</span>
                </div>
                <div class="w-full bg-muted rounded-full h-2">
                  <div class="bg-chart-5 h-2 rounded-full transition-all duration-300" style="width:7%"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { useAuthStore } from '../stores/auth'
import apiClient from '../api/apiClient'
import Chart from 'chart.js/auto'

// Variables reactivas
const users = ref([])
const totalSales = ref(0)
const orders = ref([])
const lowStockProducts = ref([])
const monthlySalesChartInstance = ref(null)
const authStore = useAuthStore()

// Computed properties
const ordersThisMonth = computed(() => {
  const now = new Date()
  const currentMonth = now.getMonth()
  const currentYear = now.getFullYear()
  return orders.value.filter(order => {
    const orderDate = new Date(order.date)
    return orderDate.getFullYear() === currentYear && orderDate.getMonth() === currentMonth
  }).length
})

const clientsCount = computed(() => {
  return users.value.filter(user => user.role === 'client' || user.role === 'cliente').length
})

// Métodos
const fetchUsers = async () => {
  try {
    const response = await apiClient.get('/users')
    users.value = response.data
  } catch (error) {
    console.error('Error fetching users:', error)
  }
}

const disableUser = async (userId) => {
  try {
    await apiClient.delete(`/users/${userId}`)
    users.value = users.value.filter(user => user.id !== userId)
  } catch (error) {
    console.error('Error disabling user:', error)
  }
}

const fetchTotalSales = async () => {
  try {
    const response = await apiClient.get('/orders')
    orders.value = response.data
    totalSales.value = orders.value.reduce((sum, order) => sum + order.total, 0)
    nextTick(() => {
      renderMonthlySalesChart()
    })
  } catch (error) {
    console.error('Error fetching total sales:', error)
  }
}

const fetchLowStockProducts = async () => {
  try {
    const response = await apiClient.get('/products')
    lowStockProducts.value = response.data.filter(product => product.stock <= 50)
  } catch (error) {
    console.error('Error fetching low-stock products:', error)
  }
}

const renderMonthlySalesChart = () => {
  const ctx = document.getElementById('monthlySalesChart')
  if (!ctx) return

  if (monthlySalesChartInstance.value) {
    monthlySalesChartInstance.value.destroy()
  }

  const currentYear = new Date().getFullYear()
  const monthlyOrderCounts = Array(12).fill(0)

  orders.value.forEach(order => {
    const orderDate = new Date(order.date)
    if (orderDate.getFullYear() === currentYear) {
      const month = orderDate.getMonth()
      monthlyOrderCounts[month] += 1
    }
  })

  monthlySalesChartInstance.value = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: [
        'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun',
        'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'
      ],
      datasets: [
        {
          label: `Pedidos ${currentYear}`,
          data: monthlyOrderCounts,
          backgroundColor: 'rgba(20, 78, 99, 0.1)',
          borderColor: 'rgba(20, 78, 99, 1)',
          borderWidth: 2,
          borderRadius: 6,
          borderSkipped: false,
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          grid: {
            color: 'rgba(0, 0, 0, 0.05)'
          }
        },
        x: {
          grid: {
            display: false
          }
        }
      }
    }
  })
}

// Lifecycle hooks
onMounted(async () => {
  authStore.initializeAuth()
  await Promise.all([
    fetchUsers(),
    fetchTotalSales(),
    fetchLowStockProducts()
  ])
})

onBeforeUnmount(() => {
  if (monthlySalesChartInstance.value) {
    monthlySalesChartInstance.value.destroy()
  }
})
</script>
