<script setup>
import { ref, onMounted, computed } from 'vue';
import apiClient from '../api/apiClient';
import { useAuthStore } from '../stores/auth';

const auth = useAuthStore();
auth.initializeAuth();

const orders = ref([]);
const loading = ref(false);
const error = ref('');
const statusFilter = ref('');

async function loadOrders() {
  loading.value = true;
  error.value = '';
  try {
    const { data } = await apiClient.get('/orders');
    orders.value = data;
  } catch (e) { error.value = e.response?.data?.message || 'Error cargando pedidos'; }
  finally { loading.value = false; }
}

async function updateStatus(order, status) {
  try {
    const { data } = await apiClient.put(`/orders/${order.id}/status`, { status });
    const idx = orders.value.findIndex(o => o.id === order.id);
    if (idx !== -1) orders.value[idx] = data.order;
  } catch (e) { error.value = e.response?.data?.message || 'Error actualizando estado'; }
}

const filtered = computed(() => statusFilter.value ? orders.value.filter(o => o.status === statusFilter.value) : orders.value);

onMounted(loadOrders);
</script>

<template>
  <div class="max-w-7xl mx-auto p-4">
    <div class="flex items-center justify-between mb-4">
      <h1 class="text-2xl font-bold">Gestión de Pedidos</h1>
      <div class="flex gap-2 items-center">
        <label for="om-status" class="text-sm text-gray-600">Estado:</label>
        <select id="om-status" v-model="statusFilter" class="border border-gray-300 rounded-md px-3 py-2">
          <option value="">Todos</option>
          <option value="pending">Pendiente</option>
          <option value="shipped">Enviado</option>
          <option value="completed">Completado</option>
          <option value="cancelled">Cancelado</option>
        </select>
        <button @click="loadOrders" class="px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded">Recargar</button>
      </div>
    </div>

    <div class="bg-white rounded-lg shadow overflow-hidden">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
              <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Cliente</th>
              <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Fecha</th>
              <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
              <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Estado</th>
              <th class="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase">Acciones</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="o in filtered" :key="o.id" class="hover:bg-gray-50">
              <td class="px-4 py-2">{{ o.id }}</td>
              <td class="px-4 py-2">{{ o.clientId }}</td>
              <td class="px-4 py-2">{{ new Date(o.date).toLocaleString() }}</td>
              <td class="px-4 py-2">${{ Number(o.total).toFixed(2) }}</td>
              <td class="px-4 py-2">
                <span class="px-2 py-1 rounded-full text-xs"
                  :class="{
                    'bg-yellow-100 text-yellow-800': o.status==='pending',
                    'bg-blue-100 text-blue-800': o.status==='shipped',
                    'bg-green-100 text-green-800': o.status==='completed',
                    'bg-red-100 text-red-800': o.status==='cancelled'
                  }">{{ o.status }}</span>
              </td>
              <td class="px-4 py-2 text-right space-x-2">
                <button class="px-2 py-1 bg-blue-100 hover:bg-blue-200 rounded text-sm" @click="updateStatus(o,'shipped')">Marcar enviado</button>
                <button class="px-2 py-1 bg-green-100 hover:bg-green-200 rounded text-sm" @click="updateStatus(o,'completed')">Completar</button>
                <button class="px-2 py-1 bg-red-100 hover:bg-red-200 rounded text-sm" @click="updateStatus(o,'cancelled')">Cancelar</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-if="loading" class="p-4 text-sm text-gray-500">Cargando...</div>
      <div v-if="error" class="p-4 text-sm text-red-600">{{ error }}</div>
    </div>
  </div>
</template>

<style scoped>
.material-symbols-outlined { font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24; }
</style>
