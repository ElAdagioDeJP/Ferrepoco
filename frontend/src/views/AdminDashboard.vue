<template>
  <div class="min-h-screen bg-background">
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div class="bg-card border border-border rounded-xl p-6 hover:shadow-md transition-shadow">
          <div class="flex items-center justify-between">
            <div class="flex-1">
              <p class="text-sm text-muted-foreground mb-2">Ventas Totales</p>
              <h3 class="font-heading text-3xl font-bold text-card-foreground">${{ totalSales.toFixed(2) }}</h3>
              <div class="flex items-center gap-1 mt-3">
                <div class="flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 rounded-full">
                  <TrendingUp class="w-3 h-3" />
                  <span class="text-xs font-medium">+12%</span>
                </div>
                <span class="text-xs text-muted-foreground">vs ayer</span>
              </div>
            </div>
            <div class="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
              <DollarSign class="w-6 h-6 text-primary" />
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
                  <TrendingUp class="w-3 h-3" />
                  <span class="text-xs font-medium">+5%</span>
                </div>
                <span class="text-xs text-muted-foreground">vs ayer</span>
              </div>
            </div>
            <div class="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center">
              <ShoppingCart class="w-6 h-6 text-secondary" />
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
                  <TrendingUp class="w-3 h-3" />
                  <span class="text-xs font-medium">+2%</span>
                </div>
                <span class="text-xs text-muted-foreground">vs ayer</span>
              </div>
            </div>
            <div class="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center">
              <Users class="w-6 h-6 text-accent" />
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
                  <AlertTriangle class="w-3 h-3" />
                  <span class="text-xs font-medium">Atención</span>
                </div>
              </div>
            </div>
            <div class="w-12 h-12 bg-destructive/10 rounded-xl flex items-center justify-center">
              <AlertTriangle class="w-6 h-6 text-destructive" />
            </div>
          </div>
        </div>
      </div>

      
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
                    <AlertTriangle class="w-5 h-5 text-destructive" />
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
                <ChevronRight class="w-4 h-4" />
              </RouterLink>
            </div>
          </div>
        </div>
      </div>

      
      <div class="bg-card border border-border rounded-xl mb-8 overflow-hidden">
        <div class="p-6 border-b border-border">
          <div class="flex items-center justify-between">
            <div>
              <h3 class="font-heading text-lg font-semibold text-card-foreground">Gestión de Usuarios</h3>
              <p class="text-sm text-muted-foreground mt-1">Administra los usuarios del sistema</p>
            </div>
            <div class="flex items-center gap-3">
              <button @click="fetchUsers" class="p-2 rounded-lg hover:bg-muted transition-colors">
                <RefreshCcw class="w-5 h-5 text-muted-foreground" />
              </button>
              <RouterLink to="/admin/users" class="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium">
                <UserPlus class="w-4 h-4" />
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
                    <Ban class="w-4 h-4" />
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
              <div v-if="!topCategories.length" class="text-sm text-muted-foreground">Sin datos suficientes.</div>
              <div v-for="cat in topCategories" :key="cat.name">
                <div class="flex justify-between items-center mb-2">
                  <span class="text-sm font-medium text-card-foreground">{{ cat.name }}</span>
                  <span class="text-sm text-muted-foreground">{{ cat.percent.toFixed(0) }}%</span>
                </div>
                <div class="w-full bg-muted rounded-full h-2">
                  <div class="h-2 rounded-full transition-all duration-300" :class="cat.colorClass" :style="{ width: cat.percent + '%' }"></div>
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
import { DollarSign, ShoppingCart, Users, AlertTriangle, TrendingUp, RefreshCcw, UserPlus, ChevronRight, Ban } from 'lucide-vue-next'

// Variables reactivas
const users = ref([])
const totalSales = ref(0)
const orders = ref([])
const lowStockProducts = ref([])
const monthlySalesChartInstance = ref(null)
const authStore = useAuthStore()
const topCategories = ref([])

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
  const payload = response.data
  users.value = Array.isArray(payload) ? payload : (payload.data || [])
  } catch (error) {
    console.error('Error fetching users:', error)
  }
}

const disableUser = async (userId) => {
  try {
    await apiClient.post(`/users/${userId}/disable`)
    // Opcional: no eliminamos al usuario de la lista; podría marcarse como inactivo si backend lo soporta
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

const fetchTopCategories = async () => {
  try {
    // Fetch top products (by quantity) and product catalog to map categories
    const [topRes, prodRes] = await Promise.all([
      apiClient.get('/reports/top-products'),
      apiClient.get('/products')
    ])
    const top = Array.isArray(topRes.data) ? topRes.data : []
    const products = Array.isArray(prodRes.data) ? prodRes.data : []
    const byId = new Map(products.map(p => [String(p.id), p]))
    const tally = new Map()
    let totalQty = 0
    for (const item of top) {
      const p = byId.get(String(item.productId))
      const cat = p?.category || 'Otros'
      const qty = Number(item.quantity || 0)
      totalQty += qty
      tally.set(cat, (tally.get(cat) || 0) + qty)
    }
    const palette = ['bg-primary', 'bg-secondary', 'bg-accent', 'bg-chart-4', 'bg-chart-5']
    const entries = Array.from(tally.entries())
      .sort((a,b) => b[1]-a[1])
      .map(([name, qty], idx) => ({
        name,
        qty,
        percent: totalQty > 0 ? (qty * 100) / totalQty : 0,
        colorClass: palette[idx % palette.length]
      }))
    topCategories.value = entries
  } catch (error) {
    console.error('Error fetching top categories:', error)
    topCategories.value = []
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
  fetchLowStockProducts(),
  fetchTopCategories()
  ])
})

onBeforeUnmount(() => {
  if (monthlySalesChartInstance.value) {
    monthlySalesChartInstance.value.destroy()
  }
})
</script>
