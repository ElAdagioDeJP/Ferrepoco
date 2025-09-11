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

import { useAuthStore } from '@/stores/auth';
import jsPDF from 'jspdf';

const route = useRoute();
const router = useRouter();
const auth = useAuthStore();
auth.initializeAuth();


const orderId = ref(String(route.query.orderId || ''));
const amount = ref(Number(route.query.amount || 0));
const methods = ref([]);
const methodId = ref('');
const processing = ref(false);
const done = ref(false);
const error = ref('');

// Recuperar productos del localStorage (guardados en PasarelaDePago)
let productosFactura = [];
try {
  const data = localStorage.getItem('factura_items');
  if (data) productosFactura = JSON.parse(data);
} catch {}

// Generar número de factura y control improvisados
function generarNumeroFactura(orden) {
  // Serie 4002 + relleno con ceros
  return '4002-' + String(orden).padStart(6, '0');
}
function generarNumeroControl(orden) {
  // Serie 00-32131 + relleno con ceros
  return '00-32131-' + String(orden).padStart(5, '0');
}

async function loadMethods(){
  try {
    const res = await apiClient.get('/payments/methods');
    methods.value = res.data || [];
  } catch (e) {
    console.error(e);
  }
}


function generarFacturaPDF() {
  const doc = new jsPDF();
  const nombreCliente = auth.user?.nombre && auth.user?.apellido
    ? `${auth.user.nombre} ${auth.user.apellido}`
    : (auth.user?.nombre || auth.displayName || 'Cliente');
  const nFactura = generarNumeroFactura(orderId.value);
  const nControl = generarNumeroControl(orderId.value);
  const metodo = methods.value.find(m => String(m.id_metodo) === methodId.value)?.nombre_metodo || 'N/A';
  // Encabezado
  doc.setFontSize(18);
  doc.text('FERREPOCO C.A.', 20, 18);
  doc.setFontSize(12);
  doc.text('RIF: J-00000000-0', 20, 26);
  doc.text('Av. Principal, Ciudad, País', 20, 32);
  doc.setFontSize(16);
  doc.text('FACTURA', 150, 20);
  doc.setFontSize(12);
  doc.text(`N° Factura: ${nFactura}`, 150, 28);
  doc.text(`N° Control: ${nControl}`, 150, 34);
  doc.setFontSize(12);
  doc.text(`Cliente: ${nombreCliente}`, 20, 45);
  doc.text(`N° Orden: ${orderId.value}`, 20, 52);
  doc.text(`Método de pago: ${metodo}`, 20, 59);
  doc.text(`Fecha: ${(new Date()).toLocaleString()}`, 20, 66);
  // Tabla de productos
  let y = 76;
  doc.setFontSize(13);
  doc.text('Productos:', 20, y);
  y += 6;
  doc.setFontSize(11);
  doc.text('Cant.', 20, y);
  doc.text('Producto', 35, y);
  doc.text('Precio', 120, y);
  doc.text('Total', 160, y);
  y += 4;
  doc.setLineWidth(0.1);
  doc.line(20, y, 190, y);
  y += 5;
  productosFactura.forEach(p => {
    doc.text(String(p.quantity), 20, y);
    doc.text(String(p.name), 35, y, { maxWidth: 80 });
    doc.text(`$${Number(p.price).toFixed(2)}`, 120, y);
    doc.text(`$${(Number(p.price) * Number(p.quantity)).toFixed(2)}`, 160, y);
    y += 6;
  });
  y += 2;
  doc.line(20, y, 190, y);
  y += 7;
  doc.setFontSize(12);
  doc.text(`Total pagado: $${amount.value.toFixed(2)}`, 150, y);
  y += 8;
  doc.setFontSize(10);
  doc.text('¡Gracias por su compra!', 20, y);
  doc.save(`Factura_Ferrepoco_${orderId.value || Date.now()}.pdf`);
}

async function confirm(){
  if (!orderId.value || !methodId.value) return;
  processing.value = true; error.value='';
  try {
    await apiClient.post('/payments', { orderId: Number(orderId.value), methodId: Number(methodId.value), amount: amount.value });
    done.value = true;
    generarFacturaPDF();
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
