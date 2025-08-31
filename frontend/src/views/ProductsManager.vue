<template>
   Updated header with new design system and better typography 
  <div class="max-w-7xl mx-auto p-6">
    <div class="flex items-center justify-between mb-8">
      <div>
        <h1 class="text-3xl font-heading font-bold text-neutral-900">Gestión de Productos</h1>
        <p class="text-neutral-600 font-body mt-1">Administra catálogo, stock y alertas de inventario</p>
      </div>
      <div class="flex gap-3">
        <RouterLink to="/" class="px-4 py-2 rounded-lg border border-neutral-300 text-neutral-700 hover:bg-neutral-50 transition-colors font-body">
          <svg class="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m0 0h18"></path>
          </svg>
          Volver
        </RouterLink>
        <button v-if="isAdmin" @click="resetForm(); showProductModal = true" class="px-4 py-2 rounded-lg bg-cyan-800 text-white hover:bg-cyan-700 transition-colors font-body">
          <svg class="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
          </svg>
          Nuevo producto
        </button>
      </div>
    </div>

     Enhanced search section with better styling 
    <div class="bg-white rounded-xl shadow-sm border border-neutral-200 p-6 mb-8">
      <div class="flex gap-4 items-end flex-wrap">
        <div class="flex-1 min-w-[280px]">
          <label for="pm-search" class="block text-sm font-medium text-neutral-700 mb-2 font-body">Buscar productos</label>
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg class="w-5 h-5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>
            <input 
              id="pm-search" 
              v-model="search" 
              placeholder="Nombre, descripción o categoría" 
              class="pl-10 w-full border border-neutral-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all font-body"
            />
          </div>
        </div>
        <button @click="loadProducts" class="px-4 py-3 bg-neutral-100 hover:bg-neutral-200 rounded-lg transition-colors font-body">
          <svg class="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
          </svg>
          Recargar
        </button>
      </div>
    </div>

    <div class="grid lg:grid-cols-3 gap-8">
       Enhanced products table with better styling and icons 
      <div class="lg:col-span-2 bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
        <div class="px-6 py-4 border-b border-neutral-200 bg-neutral-50">
          <h2 class="text-lg font-heading font-semibold text-neutral-900">Lista de Productos</h2>
        </div>
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-neutral-200">
            <thead class="bg-neutral-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-semibold text-neutral-600 uppercase tracking-wider font-body">Producto</th>
                <th class="px-6 py-3 text-left text-xs font-semibold text-neutral-600 uppercase tracking-wider font-body">Precio</th>
                <th class="px-6 py-3 text-left text-xs font-semibold text-neutral-600 uppercase tracking-wider font-body">Stock</th>
                <th class="px-6 py-3 text-left text-xs font-semibold text-neutral-600 uppercase tracking-wider font-body">Categoría</th>
                <th class="px-6 py-3 text-right text-xs font-semibold text-neutral-600 uppercase tracking-wider font-body">Acciones</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-neutral-200">
              <tr v-for="p in filtered" :key="p.id" class="hover:bg-neutral-50 transition-colors">
                <td class="px-6 py-4">
                  <div class="flex items-center">
                    <div class="w-10 h-10 bg-gradient-to-br from-cyan-100 to-cyan-200 rounded-lg flex items-center justify-center mr-3">
                      <svg class="w-5 h-5 text-cyan-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
                      </svg>
                    </div>
                    <div>
                      <div class="font-medium text-neutral-900 font-body">{{ p.name }}</div>
                      <div class="text-sm text-neutral-500 font-body">{{ p.description }}</div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 font-heading font-semibold text-neutral-900">${{ Number(p.price).toFixed(2) }}</td>
                <td class="px-6 py-4">
                  <span class="inline-flex items-center px-3 py-1 text-sm rounded-full font-body font-medium" 
                    :class="p.stock <= 10 ? 'bg-red-100 text-red-800' : p.stock <= 25 ? 'bg-orange-100 text-orange-800' : 'bg-green-100 text-green-800'">
                    {{ p.stock }}
                  </span>
                </td>
                <td class="px-6 py-4">
                  <span class="inline-flex items-center px-3 py-1 text-sm rounded-lg bg-neutral-100 text-neutral-700 font-body">{{ p.category }}</span>
                </td>
                <td class="px-6 py-4 text-right">
                  <div class="flex items-center justify-end space-x-2">
                    <button v-if="isAdmin" class="p-2 text-cyan-600 hover:bg-cyan-50 rounded-lg transition-colors" @click="resetForm(p); selected = p.id; showProductModal = true">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                      </svg>
                    </button>
                    <button v-if="canAdjustStock" class="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" @click="resetStockForm(p); showStockModal = true">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2h4a1 1 0 110 2h-1v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6H3a1 1 0 110-2h4zM9 6v10h2V6H9zm4 0v10h2V6h-2z"></path>
                      </svg>
                    </button>
                    <button v-if="isAdmin" class="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" @click="confirmDelete(p.id)">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div v-if="loading" class="p-6 text-center">
          <div class="inline-flex items-center text-neutral-600 font-body">
            <svg class="animate-spin -ml-1 mr-3 h-5 w-5" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Cargando productos...
          </div>
        </div>
        <div v-if="error" class="p-6 bg-red-50 border-t border-red-200">
          <div class="flex items-center">
            <svg class="w-5 h-5 text-red-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <span class="text-red-800 font-body">{{ error }}</span>
          </div>
        </div>
      </div>

      <div class="space-y-6">
         Enhanced product form with better styling 
        <div class="bg-white rounded-xl shadow-sm border border-neutral-200 p-6" v-if="isAdmin">
          <h2 class="font-heading font-semibold text-lg text-neutral-900 mb-4">{{ form.id ? 'Editar producto' : 'Nuevo producto' }}</h2>
          <form class="space-y-4" @submit.prevent="form.id ? updateProduct() : createProduct()">
            <div>
              <label for="pm-name" class="block text-sm font-medium text-neutral-700 mb-2 font-body">Nombre del producto</label>
              <input id="pm-name" v-model="form.name" required class="w-full border border-neutral-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all font-body" />
            </div>
            <div>
              <label for="pm-description" class="block text-sm font-medium text-neutral-700 mb-2 font-body">Descripción</label>
              <textarea id="pm-description" v-model="form.description" rows="3" class="w-full border border-neutral-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all font-body"></textarea>
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label for="pm-price" class="block text-sm font-medium text-neutral-700 mb-2 font-body">Precio ($)</label>
                <input id="pm-price" type="number" min="0" step="0.01" v-model="form.price" required class="w-full border border-neutral-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all font-body" />
              </div>
              <div>
                <label for="pm-stock" class="block text-sm font-medium text-neutral-700 mb-2 font-body">Stock inicial</label>
                <input id="pm-stock" type="number" step="1" v-model="form.stock" required class="w-full border border-neutral-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all font-body" />
              </div>
            </div>
            <div>
              <label for="pm-category" class="block text-sm font-medium text-neutral-700 mb-2 font-body">Categoría</label>
              <input id="pm-category" v-model="form.category" required class="w-full border border-neutral-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all font-body" />
            </div>
            <div class="flex gap-3 pt-2">
              <button type="submit" class="flex-1 px-4 py-3 rounded-lg bg-cyan-800 hover:bg-cyan-700 text-white font-medium transition-colors font-body">
                {{ form.id ? 'Guardar cambios' : 'Crear producto' }}
              </button>
              <button type="button" @click="resetForm(); selected=null" class="px-4 py-3 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-medium transition-colors font-body">
                Limpiar
              </button>
            </div>
          </form>
        </div>

         Enhanced alerts section with better visual hierarchy 
        <div class="bg-white rounded-xl shadow-sm border border-neutral-200 p-6" v-if="canAdjustStock">
          <div class="flex items-center justify-between mb-4">
            <h2 class="font-heading font-semibold text-lg text-neutral-900">Alertas de Inventario</h2>
            <button class="px-3 py-2 bg-neutral-100 hover:bg-neutral-200 rounded-lg transition-colors font-body" @click="loadAlerts" :disabled="alertsLoading">
              <svg class="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
              </svg>
              {{ alertsLoading ? 'Cargando...' : 'Actualizar' }}
            </button>
          </div>
          <div v-if="alerts.length > 0" class="space-y-3">
            <div v-for="a in alerts" :key="a.productId + '-' + a.type" class="border rounded-lg p-4 flex items-start gap-3" :class="a.type==='low_stock' ? 'border-orange-300 bg-orange-50' : 'border-neutral-200 bg-neutral-50'">
              <div class="flex-shrink-0 mt-0.5">
                <svg class="w-5 h-5" :class="a.type==='low_stock' ? 'text-orange-600' : 'text-neutral-600'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.268 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
                </svg>
              </div>
              <div class="flex-1">
                <p class="font-medium text-neutral-900 font-body">{{ a.productName }}</p>
                <p class="text-neutral-700 text-sm font-body">{{ a.message }}</p>
                <p class="text-xs text-neutral-500 mt-1 font-body">Stock actual: {{ a.currentStock }} • Umbral: {{ a.threshold }}</p>
              </div>
            </div>
          </div>
          <div v-else class="text-center py-8">
            <svg class="w-12 h-12 text-neutral-400 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <p class="text-neutral-500 font-body">{{ alertsMessage || 'Sin alertas por ahora. ¡Todo está bajo control!' }}</p>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import apiClient from '@/api/apiClient'

// Variables reactivas
const products = ref([])
const loading = ref(false)
const error = ref('')
const search = ref('')
const selected = ref(null)
const showProductModal = ref(false)
const showStockModal = ref(false)
const alerts = ref([])
const alertsLoading = ref(false)
const alertsMessage = ref('')

// Formularios
const form = reactive({
  id: null,
  name: '',
  description: '',
  price: 0,
  stock: 0,
  category: ''
})

const stockForm = reactive({
  productId: null,
  adjustment: 0,
  reason: ''
})

// Store de autenticación
const authStore = useAuthStore()
const isAdmin = computed(() => authStore.user?.role === 'admin')
const canAdjustStock = computed(() => ['admin', 'employee'].includes(authStore.user?.role))

// Computed: Productos filtrados
const filtered = computed(() => {
  if (!search.value) return products.value
  
  const query = search.value.toLowerCase()
  return products.value.filter(product => 
    product.name?.toLowerCase().includes(query) ||
    product.description?.toLowerCase().includes(query) ||
    product.category?.toLowerCase().includes(query)
  )
})

// Cargar productos
const loadProducts = async () => {
  loading.value = true
  error.value = ''
  try {
    const response = await apiClient.get('/products')
    products.value = response.data
  } catch (err) {
    error.value = 'Error al cargar productos'
    console.error(err)
  } finally {
    loading.value = false
  }
}

// Cargar alertas
const loadAlerts = async () => {
  alertsLoading.value = true
  try {
    const lowStockProducts = products.value.filter(p => p.stock <= 10)
    alerts.value = lowStockProducts.map(p => ({
      productId: p.id,
      productName: p.name,
      type: 'low_stock',
      message: `Stock crítico: ${p.stock} unidades restantes`,
      currentStock: p.stock,
      threshold: 10
    }))
    
    if (alerts.value.length === 0) {
      alertsMessage.value = 'No hay productos con stock bajo'
    }
  } catch (err) {
    console.error('Error loading alerts:', err)
  } finally {
    alertsLoading.value = false
  }
}

// Resetear formularios
const resetForm = (product = null) => {
  if (product) {
    form.id = product.id
    form.name = product.name
    form.description = product.description
    form.price = product.price
    form.stock = product.stock
    form.category = product.category
  } else {
    form.id = null
    form.name = ''
    form.description = ''
    form.price = 0
    form.stock = 0
    form.category = ''
  }
}

const resetStockForm = (product = null) => {
  if (product) {
    stockForm.productId = product.id
    stockForm.adjustment = 0
    stockForm.reason = ''
  } else {
    stockForm.productId = null
    stockForm.adjustment = 0
    stockForm.reason = ''
  }
}

// Crear producto
const createProduct = async () => {
  try {
    await apiClient.post('/products', form)
    resetForm()
    showProductModal.value = false
    await loadProducts()
  } catch (err) {
    error.value = 'Error al crear producto'
    console.error(err)
  }
}

// Actualizar producto
const updateProduct = async () => {
  try {
    await apiClient.put(`/products/${form.id}`, form)
    resetForm()
    showProductModal.value = false
    await loadProducts()
  } catch (err) {
    error.value = 'Error al actualizar producto'
    console.error(err)
  }
}

// Eliminar producto
const confirmDelete = async (productId) => {
  if (!confirm('¿Estás seguro de eliminar este producto?')) return
  
  try {
    await apiClient.delete(`/products/${productId}`)
    await loadProducts()
  } catch (err) {
    error.value = 'Error al eliminar producto'
    console.error(err)
  }
}

// Ajustar stock
const adjustStock = async () => {
  try {
    const product = products.value.find(p => p.id === stockForm.productId)
    if (product) {
      const newStock = product.stock + stockForm.adjustment
      await apiClient.put(`/products/${product.id}`, { ...product, stock: newStock })
      resetStockForm()
      showStockModal.value = false
      await loadProducts()
    }
  } catch (err) {
    error.value = 'Error al ajustar stock'
    console.error(err)
  }
}

// Cargar datos iniciales
onMounted(() => {
  loadProducts()
})
</script>

<style scoped>
.font-heading {
  font-family: 'Montserrat', sans-serif;
}

.font-body {
  font-family: 'Open Sans', sans-serif;
}
</style>
