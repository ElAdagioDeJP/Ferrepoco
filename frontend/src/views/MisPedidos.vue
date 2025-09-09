<template>
  <div class="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 flex flex-col items-center p-4">
    <div class="w-full max-w-3xl bg-white rounded-xl shadow-lg p-6 border border-neutral-200 mt-8 mb-4">
      <h1 class="text-2xl font-heading font-bold mb-6 text-neutral-900 text-center">Mis Pedidos</h1>
      <div v-if="loading" class="text-center text-neutral-500 py-8">Cargando pedidos...</div>
      <div v-else-if="orders.length === 0" class="text-center text-neutral-500 py-8">No tienes pedidos registrados.</div>
      <div v-else class="space-y-4">
        <div v-for="order in orders" :key="order.id" class="border rounded-lg p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div class="font-bold text-lg text-primary">Pedido #{{ order.id }}</div>
            <div class="text-sm text-neutral-600">Total: ${{ Number(order.total).toFixed(2) }}</div>
            <div class="text-sm text-neutral-600">Estado: {{ order.status || 'Desconocido' }}</div>
          </div>
          <div class="flex gap-2 mt-2 md:mt-0">
            <a :href="whatsappLink(order.id)" target="_blank" class="px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700">Retornar</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';
import apiClient from '../api/apiClient';

const auth = useAuthStore();
const router = useRouter();

const orders = ref([]);
const loading = ref(true);

function whatsappLink(orderId) {
  return `https://wa.me/584244252755?text=quiero%20hacer%20un%20retorno%20con%20el%20pedido%20de%20id:%20${orderId}`;
}

onMounted(async () => {
  try {
    const clientId = auth.user?.id || localStorage.getItem('userId');
    const res = await apiClient.get(`/orders/my-orders/${clientId}`);
    orders.value = res.data || [];
  } catch (e) {
    orders.value = [];
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped>
.font-heading {
  font-family: 'Montserrat', sans-serif;
}
</style>
