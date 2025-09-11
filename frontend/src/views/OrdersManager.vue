<template>
  <div class="max-w-7xl mx-auto p-6">
    <div class="flex items-center justify-between mb-8">
      <div>
        <h1 class="text-3xl font-heading font-bold text-neutral-900">Gestión de Pedidos</h1>
        <p class="text-neutral-600 font-body mt-1">Administra y actualiza el estado de los pedidos</p>
      </div>
      <div class="flex items-center gap-4">
        <div class="flex items-center gap-2">
          <label for="om-status" class="text-sm font-medium text-neutral-700 font-body">Filtrar por estado:</label>
          <select id="om-status" v-model="statusFilter" class="border border-neutral-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-cyan-500 focus:border-transparent font-body">
            <option value="">Todos los estados</option>
            <option value="pending">Pendiente</option>
            <option value="shipped">Enviado</option>
            <option value="completed">Completado</option>
            <option value="cancelled">Cancelado</option>
          </select>
        </div>
        <button @click="loadOrders" class="px-4 py-2 bg-neutral-100 hover:bg-neutral-200 rounded-lg transition-colors font-body">
          <svg class="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
          </svg>
          Recargar
        </button>
      </div>
    </div>

    <div class="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
      <div class="px-6 py-4 border-b border-neutral-200 bg-neutral-50">
        <h2 class="text-lg font-heading font-semibold text-neutral-900">Lista de Pedidos</h2>
      </div>
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-neutral-200">
          <thead class="bg-neutral-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-semibold text-neutral-600 uppercase tracking-wider font-body">Pedido</th>
              <th class="px-6 py-3 text-left text-xs font-semibold text-neutral-600 uppercase tracking-wider font-body">Cliente</th>
              <th class="px-6 py-3 text-left text-xs font-semibold text-neutral-600 uppercase tracking-wider font-body">Fecha</th>
              <th class="px-6 py-3 text-left text-xs font-semibold text-neutral-600 uppercase tracking-wider font-body">Total</th>
              <th class="px-6 py-3 text-left text-xs font-semibold text-neutral-600 uppercase tracking-wider font-body">Estado</th>
              <th class="px-6 py-3 text-right text-xs font-semibold text-neutral-600 uppercase tracking-wider font-body">Acciones</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-neutral-200">
            <tr v-for="o in filtered" :key="o.id" class="hover:bg-neutral-50 transition-colors">
              <td class="px-6 py-4">
                <div class="flex items-center">
                  <div class="w-10 h-10 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center mr-3">
                    <svg class="w-5 h-5 text-blue-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                    </svg>
                  </div>
                  <div>
                    <div class="font-medium text-neutral-900 font-body">#{{ o.id }}</div>
                    <div class="text-sm text-neutral-500 font-body">Pedido {{ o.id }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4">
                <div class="flex items-center">
                  <div class="w-8 h-8 bg-gradient-to-br from-neutral-100 to-neutral-200 rounded-full flex items-center justify-center mr-3">
                    <svg class="w-4 h-4 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                    </svg>
                  </div>
                  <span class="font-medium text-neutral-900 font-body">Cliente {{ o.clientId }}</span>
                </div>
              </td>
              <td class="px-6 py-4 text-neutral-700 font-body">{{ new Date(o.date).toLocaleDateString('es-ES', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }) }}</td>
              <td class="px-6 py-4 font-heading font-semibold text-neutral-900">${{ Number(o.total).toFixed(2) }}</td>
              <td class="px-6 py-4">
                <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium font-body"
                  :class="{
                    'bg-orange-100 text-orange-800': o.status==='pending',
                    'bg-blue-100 text-blue-800': o.status==='shipped',
                    'bg-green-100 text-green-800': o.status==='completed',
                    'bg-red-100 text-red-800': o.status==='cancelled'
                  }">
                  <div class="w-2 h-2 rounded-full mr-2"
                    :class="{
                      'bg-orange-500': o.status==='pending',
                      'bg-blue-500': o.status==='shipped',
                      'bg-green-500': o.status==='completed',
                      'bg-red-500': o.status==='cancelled'
                    }">
                  </div>
                  {{ o.status === 'pending' ? 'Pendiente' : o.status === 'shipped' ? 'Enviado' : o.status === 'completed' ? 'Completado' : 'Cancelado' }}
                </span>
              </td>
              <td class="px-6 py-4 text-right">
                <div class="flex items-center justify-end space-x-2">
                  <button v-if="o.status === 'pending'" class="px-3 py-1 bg-blue-100 hover:bg-blue-200 text-blue-800 rounded-lg text-sm font-medium transition-colors font-body" @click="updateStatus(o,'shipped')">
                    <svg class="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"></path>
                    </svg>
                    Enviar
                  </button>
                  <button v-if="o.status === 'shipped'" class="px-3 py-1 bg-green-100 hover:bg-green-200 text-green-800 rounded-lg text-sm font-medium transition-colors font-body" @click="updateStatus(o,'completed')">
                    <svg class="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    Completar
                  </button>
                  <button v-if="o.status !== 'cancelled' && o.status !== 'completed'" class="px-3 py-1 bg-red-100 hover:bg-red-200 text-red-800 rounded-lg text-sm font-medium transition-colors font-body" @click="updateStatus(o,'cancelled')">
                    <svg class="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                    Cancelar
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
          Cargando pedidos...
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
      <div v-if="!loading && !error && filtered.length === 0" class="p-12 text-center">
        <svg class="w-16 h-16 text-neutral-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
        </svg>
        <h3 class="text-lg font-heading font-medium text-neutral-900 mb-2">No hay pedidos</h3>
        <p class="text-neutral-500 font-body">{{ statusFilter ? 'No se encontraron pedidos con el filtro seleccionado.' : 'Aún no hay pedidos registrados en el sistema.' }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { apiService } from '@/services/apiService' // Ajusta la ruta según donde tengas el archivo
import { useAuthStore } from '../stores/auth';
const auth = useAuthStore();
auth.initializeAuth();

const orders = ref([])
const statusFilter = ref('')
const loading = ref(false)
const error = ref(null)

const filtered = computed(() => {
  if (!statusFilter.value) return orders.value
  return orders.value.filter(order => order.status === statusFilter.value)
})

const loadOrders = async () => {
  loading.value = true
  error.value = null
  try {
    orders.value = await apiService.getOrders()
  } catch (err) {
    error.value = 'Error al cargar los pedidos'
    console.error('Error loading orders:', err)
  } finally {
    loading.value = false
  }
}

const updateStatus = async (order, newStatus) => {
  try {
    await apiService.updateOrderStatus(order.id, newStatus)
    await loadOrders()
  } catch (err) {
    error.value = 'Error al actualizar el estado'
    console.error('Error updating order:', err)
  }
}

onMounted(() => {
  loadOrders()
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
