<template>
  <div class="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100">
    <main class="max-w-xl mx-auto px-4 py-10">
      <div class="bg-white border border-neutral-200 rounded-xl shadow-sm p-6">
        <h1 class="text-2xl font-bold mb-4">Confirmar pago</h1>
        <p class="text-sm text-neutral-600 mb-6">Orden #{{ orderId }} · Total: <span class="font-semibold">${{ amount.toFixed(2) }}</span></p>
        <div class="space-y-3">
          <label class="block text-sm font-medium text-neutral-700">Método de pago</label>
          <select v-model="methodId" class="w-full border rounded-md px-3 py-2">
            <option value="" disabled>Seleccione…</option>
            <option v-for="m in methods" :key="m.id_metodo" :value="String(m.id_metodo)">{{ m.nombre_metodo }}</option>
          </select>
        </div>
        <button class="mt-6 w-full bg-cyan-800 hover:bg-cyan-700 text-white py-2.5 rounded-md disabled:opacity-50" :disabled="processing || !methodId" @click="confirm">
          {{ processing ? 'Procesando…' : 'Confirmar pago' }}
        </button>
        <p v-if="error" class="mt-3 text-sm text-red-600">{{ error }}</p>
        <p v-if="done" class="mt-3 text-sm text-green-700">Pago registrado. Redirigiendo…</p>
      </div>
    </main>
  </div>
  
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import apiClient from '@/api/apiClient';

const route = useRoute();
const router = useRouter();

const orderId = ref(String(route.query.orderId || ''));
const amount = ref(Number(route.query.amount || 0));
const methods = ref([]);
const methodId = ref('');
const processing = ref(false);
const done = ref(false);
const error = ref('');

async function loadMethods(){
  try {
    const res = await apiClient.get('/payments/methods');
    methods.value = res.data || [];
  } catch (e) {
    console.error(e);
  }
}

async function confirm(){
  if (!orderId.value || !methodId.value) return;
  processing.value = true; error.value='';
  try {
    await apiClient.post('/payments', { orderId: Number(orderId.value), methodId: Number(methodId.value), amount: amount.value });
    done.value = true;
    setTimeout(() => { router.push({ name: 'ClientDashboard' }); }, 1200);
  } catch (e) {
    console.error(e);
    error.value = e?.response?.data?.message || 'No se pudo registrar el pago';
  } finally {
    processing.value = false;
  }
}

onMounted(() => {
  loadMethods();
});
</script>

<style scoped>
</style>
