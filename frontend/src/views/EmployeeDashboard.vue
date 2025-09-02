<template>
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
              </button>
            </div>
          </div>
        </div>
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
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
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
