<template>
  <div class="min-h-screen bg-background">
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="mb-8">
        <div class="flex items-center justify-between mb-6">
          <div>
            <h1 class="font-heading text-3xl font-bold text-foreground">Panel de Empleado</h1>
            <p class="text-muted-foreground mt-1">Gestiona pedidos, inventario y tareas diarias</p>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div class="bg-card border border-border rounded-xl p-6 hover:shadow-md transition-shadow">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm text-muted-foreground">Turno actual</p>
                <p class="font-heading text-xl font-semibold text-card-foreground">{{ currentShift }}</p>
              </div>
              <Clock class="w-6 h-6 text-muted-foreground" />
            </div>
          </div>

          <div class="bg-card border border-border rounded-xl p-6 hover:shadow-md transition-shadow">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm text-muted-foreground">Pedidos pendientes</p>
                <p class="font-heading text-2xl font-bold text-card-foreground">{{ pendingOrders.length }}</p>
              </div>
              <ClipboardList class="w-6 h-6 text-secondary" />
            </div>
          </div>

          <div class="bg-card border border-border rounded-xl p-6 hover:shadow-md transition-shadow">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm text-muted-foreground">Stock bajo</p>
                <p class="font-heading text-2xl font-bold text-card-foreground">{{ lowStockCount }}</p>
              </div>
              <AlertTriangle class="w-6 h-6 text-destructive" />
            </div>
          </div>

          <div class="bg-card border border-border rounded-xl p-6 hover:shadow-md transition-shadow">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm text-muted-foreground">Tareas urgentes</p>
                <p class="font-heading text-2xl font-bold text-card-foreground">{{ urgentTasks }}</p>
              </div>
              <Flame class="w-6 h-6 text-orange-500" />
            </div>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div class="bg-card border border-border rounded-xl overflow-hidden">
          <div class="p-6 border-b border-border">
            <div class="flex items-center justify-between">
              <h3 class="font-heading text-lg font-semibold text-card-foreground">Pedidos Pendientes</h3>
              <button @click="loadOrders" class="p-2 rounded-lg hover:bg-muted transition-colors">
                <RefreshCcw class="w-5 h-5 text-muted-foreground" />
              </button>
            </div>
          </div>
          <div class="p-4">
            <div class="space-y-4 max-h-80 overflow-y-auto">
              <div v-if="!pendingOrders.length" class="text-sm text-muted-foreground">No hay pedidos pendientes.</div>
              <div v-for="o in pendingOrders" :key="o.id" class="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
                    <ShoppingCart class="w-5 h-5 text-secondary" />
                  </div>
                  <div>
                    <p class="font-medium text-sm text-card-foreground">Pedido #{{ o.id }}</p>
                    <p class="text-xs text-muted-foreground">Total: ${{ Number(o.total || 0).toFixed(2) }} · {{ formatDate(o.date) }}</p>
                  </div>
                </div>
                <div class="flex items-center gap-2">
                  <button @click="processOrder(o.id)" class="px-3 py-1 text-xs bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">Marcar completado</button>
                </div>
              </div>
            </div>
            <div class="pt-4 text-center border-t border-border mt-4"></div>
          </div>
        </div>

        <div class="bg-card border border-border rounded-xl overflow-hidden">
          <div class="p-6 border-b border-border">
            <div class="flex items-center justify-between">
              <h3 class="font-heading text-lg font-semibold text-card-foreground">Gestión de Stock</h3>
              <button @click="loadProducts" class="p-2 rounded-lg hover:bg-muted transition-colors">
                <RefreshCcw class="w-5 h-5 text-muted-foreground" />
              </button>
            </div>
          </div>
          <div class="p-4">
            <div class="space-y-4 max-h-80 overflow-y-auto">
              <div v-if="!lowStockProducts.length" class="text-sm text-muted-foreground">Sin alertas de stock.</div>
              <div v-for="p in lowStockProducts" :key="p.id" class="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 bg-destructive/10 rounded-lg flex items-center justify-center">
                    <AlertTriangle class="w-5 h-5 text-destructive" />
                  </div>
                  <div>
                    <p class="font-medium text-sm text-card-foreground">{{ p.name }}</p>
                    <p class="text-xs text-muted-foreground">{{ p.stock }} unidades</p>
                  </div>
                </div>
                <button @click="openAdjustStock(p.id)" class="px-3 py-1 text-xs bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/90 transition-colors">Ajustar</button>
              </div>
            </div>
            <div class="pt-4 text-center border-t border-border mt-4"></div>
          </div>
        </div>

        <div class="bg-card border border-border rounded-xl overflow-hidden">
          <div class="p-6 border-b border-border">
            <h3 class="font-heading text-lg font-semibold text-card-foreground">Acciones Rápidas</h3>
          </div>
          <div class="p-4">
            <div class="space-y-3">
              <button @click="loadOrders" class="w-full inline-flex items-center justify-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
                <RefreshCcw class="w-4 h-4" />
                Refrescar datos
              </button>
              <button @click="showStockModal = true" class="w-full inline-flex items-center justify-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/90 transition-colors">
                <Edit3 class="w-4 h-4" />
                Nuevo ajuste de stock
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-card border border-border rounded-xl overflow-hidden">
        <div class="p-6 border-b border-border">
          <h3 class="font-heading text-lg font-semibold text-card-foreground">Actividad Reciente</h3>
        </div>
        <div class="p-6">
          <div class="space-y-4">
            <div v-for="activity in recentActivities" :key="activity.id" class="flex items-start gap-4">
              <div :class="['w-10 h-10 rounded-lg flex items-center justify-center', activity.iconBg]">
                <component :is="activity.icon" class="w-5 h-5" :class="activity.iconColor" />
              </div>
              <div>
                <p class="text-sm text-card-foreground">{{ activity.message }}</p>
                <p class="text-xs text-muted-foreground">{{ activity.time }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <div v-if="showStockModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div class="bg-card border border-border rounded-xl shadow-xl w-full max-w-md p-6 relative">
        <button @click="showStockModal = false" class="absolute top-4 right-4 text-muted-foreground hover:text-foreground">
          <X class="w-5 h-5" />
        </button>
        <h2 class="font-heading text-xl font-bold text-card-foreground mb-4">Ajustar Stock</h2>
        <form @submit.prevent="saveStockAdjustment" class="space-y-4">
          <div>
            <label for="stock-product" class="block text-sm font-medium text-foreground mb-1">Producto</label>
            <select id="stock-product" v-model="stockAdjustment.productId" required class="w-full px-3 py-2 bg-background border border-border rounded-md">
              <option value="" disabled>Selecciona un producto</option>
              <option v-for="p in products" :key="p.id" :value="p.id">{{ p.name }}</option>
            </select>
          </div>
          <div>
            <label for="stock-qty" class="block text-sm font-medium text-foreground mb-1">Cantidad (+/-)</label>
            <input id="stock-qty" type="number" v-model.number="stockAdjustment.quantity" required class="w-full px-3 py-2 bg-background border border-border rounded-md" />
          </div>
          <div>
            <label for="stock-reason" class="block text-sm font-medium text-foreground mb-1">Motivo (opcional)</label>
            <input id="stock-reason" type="text" v-model="stockAdjustment.reason" class="w-full px-3 py-2 bg-background border border-border rounded-md" placeholder="Reposición, ajuste, merma..." />
          </div>
          <div class="flex items-center justify-end gap-3 pt-4">
            <button type="button" @click="showStockModal = false" class="px-4 py-2 rounded-md border border-border">Cancelar</button>
            <button type="submit" class="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90">Guardar</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useAuthStore } from '../stores/auth'
import apiClient from '../api/apiClient'
import { Clock, ClipboardList, AlertTriangle, Flame, RefreshCcw, ShoppingCart, Edit3, X, CheckCircle2, Package } from 'lucide-vue-next'

const auth = useAuthStore()
auth.initializeAuth()

// Reactive data
const pendingOrders = ref([])
const products = ref([])
const lowStockProducts = ref([])
const showStockModal = ref(false)
const urgentTasks = ref(3)

const stockAdjustment = ref({
  productId: '',
  quantity: 0,
  reason: ''
})

const recentActivities = ref([])

// Computed properties
const currentShift = computed(() => {
  const hour = new Date().getHours()
  if (hour >= 6 && hour < 14) return 'Matutino (6:00 - 14:00)'
  if (hour >= 14 && hour < 22) return 'Vespertino (14:00 - 22:00)'
  return 'Nocturno (22:00 - 6:00)'
})

const lowStockCount = computed(() => lowStockProducts.value.length)

// Methods
async function loadOrders () {
  try {
    const response = await apiClient.get('/orders')
    const orders = Array.isArray(response.data) ? response.data : []
    pendingOrders.value = orders.filter(order => String(order.status).toLowerCase() === 'pending')
  } catch (error) {
    console.error('Error loading orders:', error)
  }
}

async function loadProducts () {
  try {
    const response = await apiClient.get('/products')
    const list = Array.isArray(response.data) ? response.data : []
    products.value = list
    lowStockProducts.value = list.filter(product => Number(product.stock) <= 10)
  } catch (error) {
    console.error('Error loading products:', error)
  }
}

async function processOrder (orderId) {
  try {
    await apiClient.put(`/orders/${orderId}/status`, { status: 'completed' })
    await loadOrders()
    // Add to recent activities
    recentActivities.value.unshift({
      id: Date.now(),
      message: `Procesaste el pedido #${String(orderId).substring(0, 8)} exitosamente`,
      time: 'Ahora',
      iconBg: 'bg-primary/10',
      iconColor: 'text-primary',
      icon: CheckCircle2
    })
  } catch (error) {
    console.error('Error processing order:', error)
  }
}

async function updateStock (productId, quantity) {
  try {
    await apiClient.put(`/inventory/stock/${productId}`, { quantity })
    await loadProducts()
    await loadRecentActivities()
  } catch (error) {
    console.error('Error updating stock:', error)
  }
}

async function saveStockAdjustment () {
  try {
    const payload = {
      quantity: Number(stockAdjustment.value.quantity),
      motivo: stockAdjustment.value.reason
    }
    await apiClient.put(`/inventory/stock/${stockAdjustment.value.productId}`, payload)
    await loadProducts()
    await loadRecentActivities()
    showStockModal.value = false
    stockAdjustment.value = { productId: '', quantity: 0, reason: '' }
  } catch (error) {
    console.error('Error adjusting stock:', error)
  }
}

function openAdjustStock (id) {
  stockAdjustment.value.productId = id
  stockAdjustment.value.quantity = 0
  stockAdjustment.value.reason = ''
  showStockModal.value = true
}

function formatDate (dateString) {
  const d = new Date(dateString)
  if (isNaN(d.getTime())) return 'N/D'
  return d.toLocaleDateString('es-ES', {
    day: '2-digit',
    month: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  })
}

onMounted(async () => {
  await Promise.all([loadOrders(), loadProducts(), loadRecentActivities()])
})

async function loadRecentActivities () {
  try {
    const [ordersRes, prodsRes] = await Promise.all([
      apiClient.get('/orders'),
      apiClient.get('/products')
    ])
    const acts = []
    const orders = Array.isArray(ordersRes.data) ? ordersRes.data : []
    const products = Array.isArray(prodsRes.data) ? prodsRes.data : []

    orders.slice(0, 5).forEach(o => {
      const isCompleted = String(o.status).toLowerCase() === 'completed'
      acts.push({
        id: `order-${o.id}`,
        message: `${isCompleted ? 'Pedido completado' : 'Pedido creado'} #${o.id}`,
        time: formatDate(o.date),
        iconBg: isCompleted ? 'bg-primary/10' : 'bg-secondary/10',
        iconColor: isCompleted ? 'text-primary' : 'text-secondary',
        icon: isCompleted ? CheckCircle2 : Package
      })
    })

    products.filter(p => Number(p.stock) <= 10).slice(0, 5).forEach(p => {
      acts.push({
        id: `low-${p.id}`,
        message: `Stock bajo en ${p.name} (${p.stock})`,
        time: 'Reciente',
        iconBg: 'bg-destructive/10',
        iconColor: 'text-destructive',
        icon: AlertTriangle
      })
    })

    recentActivities.value = acts.slice(0, 8)
  } catch (e) {
    console.error('Error loading activities:', e)
    recentActivities.value = []
  }
}
</script>
