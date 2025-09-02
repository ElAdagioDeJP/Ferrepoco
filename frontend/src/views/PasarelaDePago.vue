<template>
  <div class="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100">
    <main class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Items -->
        <section class="lg:col-span-2 space-y-4">
          <div class="bg-white rounded-xl shadow-sm border border-neutral-200 p-5">
            <div class="flex items-center justify-between mb-4">
              <h1 class="text-2xl font-heading font-bold text-neutral-900">Revisa tu pedido</h1>
              <span class="text-sm text-neutral-500">{{ items.length }} {{ items.length === 1 ? 'artículo' : 'artículos' }}</span>
            </div>
            <div v-if="!items.length" class="text-neutral-500 text-center py-20">
              Tu carrito está vacío.
            </div>
            <div v-for="it in items" :key="it.productId" class="flex items-start gap-4 py-4 border-t first:border-t-0">
              <img :src="image(it)" class="w-20 h-20 rounded-md object-cover bg-neutral-100" alt="" />
              <div class="flex-1 min-w-0">
                <div class="flex items-start justify-between">
                  <h3 class="font-medium text-neutral-900 truncate">{{ it.product?.name }}</h3>
                  <div class="text-right">
                    <div class="text-sm font-semibold">${{ lineTotal(it).toFixed(2) }}</div>
                    <div class="text-xs text-neutral-500">${{ unitPrice(it).toFixed(2) }} c/u</div>
                  </div>
                </div>
                <p class="text-xs text-neutral-500">{{ it.product?.category }}</p>
                <div class="mt-2 inline-flex items-center border rounded-md overflow-hidden">
                  <button class="px-2 py-1" @click="decQty(it)">-</button>
                  <span class="px-3 py-1 text-sm">{{ it.quantity }}</span>
                  <button class="px-2 py-1" @click="incQty(it)">+</button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Summary -->
        <aside class="space-y-4">
          <div class="bg-white rounded-xl shadow-sm border border-neutral-200 p-5">
            <h2 class="text-lg font-heading font-bold mb-3">Resumen</h2>
            <div class="space-y-2 text-sm">
              <div class="flex justify-between"><span class="text-neutral-600">Subtotal</span><span class="font-medium">${{ subtotal.toFixed(2) }}</span></div>
              <div class="flex justify-between"><span class="text-neutral-600">Envío</span><span class="font-medium">${{ shipping.toFixed(2) }}</span></div>
              <div class="flex justify-between"><span class="text-neutral-600">Impuestos ({{ (taxRate*100).toFixed(0) }}%)</span><span class="font-medium">${{ taxes.toFixed(2) }}</span></div>
              <div class="flex justify-between items-center mt-2">
                <input v-model="couponCode" placeholder="Código de cupón" class="border rounded px-2 py-1 text-sm" />
                <button @click="applyCoupon" class="ml-2 px-3 py-1 bg-cyan-800 text-white rounded hover:bg-cyan-700">Aplicar</button>
              </div>
              <div v-if="couponError" class="text-xs text-red-600">{{ couponError }}</div>
              <div v-if="discount > 0" class="flex justify-between">
                <span class="text-neutral-600">Descuento</span>
                <span class="font-medium">- ${{ discount.toFixed(2) }}</span>
              </div>
              <div class="h-px bg-neutral-200 my-2"></div>
              <div class="flex justify-between text-base font-heading font-bold"><span>Total</span><span>${{ total.toFixed(2) }}</span></div>
            </div>
            <button class="mt-4 w-full bg-cyan-800 hover:bg-cyan-700 text-white py-2.5 rounded-md" @click="simulatePay" :disabled="processing || !items.length">
              {{ processing ? 'Procesando pago...' : 'Pagar ahora' }}
            </button>
            <p class="text-xs text-neutral-500 mt-2 text-center">Pago simulado seguro</p>
          </div>
          <div v-if="success" class="rounded-md border border-green-200 bg-green-50 text-green-800 p-4">
            ¡Pago exitoso! Tu orden #{{ orderId }} ha sido creada.
          </div>
        </aside>
      </div>
    </main>
  </div>
</template>
<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import apiClient from '@/api/apiClient';
import { useAuthStore } from '@/stores/auth';

const auth = useAuthStore();
auth.initializeAuth();

const items = ref([]);
const router = useRouter();
const couponCode = ref('');
const discount = ref(0);
const couponError = ref('');

function image(it){
  const url = it.product?.imageUrl;
  if (!url) return '/placeholder.svg?height=80&width=80';
  return url.startsWith('http') ? url : window.location.origin + url;
}
function unitPrice(it){ return Number(it.product?.price || 0); }
function lineTotal(it){ return unitPrice(it) * Number(it.quantity || 0); }

const subtotal = computed(() => items.value.reduce((s, it) => s + lineTotal(it), 0));
const shipping = computed(() => items.value.length ? 4.99 : 0);
const taxRate = ref(0.0);
const taxes = computed(() => subtotal.value * taxRate.value);
const total = computed(() => subtotal.value + shipping.value + taxes.value);

async function loadCart(){
  if (auth.userRole !== 'client') { items.value = []; return; }
  const res = await apiClient.get('/cart');
  items.value = res.data?.items || [];
}


function applyCoupon() {
  // Example: "FERRE25" gives 25% off subtotal
  if (couponCode.value.trim().toUpperCase() === 'FERRE25') {
    discount.value = subtotal.value * 0.25;
    couponError.value = '';
  } else {
    discount.value = 0;
    couponError.value = 'Cupón inválido o Expirado';
  }
}

async function updateQty(productId, quantity){
  await apiClient.post('/cart/items', { productId, quantity });
  await loadCart();
  window.dispatchEvent(new Event('cart-updated'));
}
function incQty(it){ updateQty(it.productId, Number(it.quantity||0)+1); }
function decQty(it){ const q = Number(it.quantity||0)-1; if (q>=1) updateQty(it.productId, q); }

const processing = ref(false);
const success = ref(false);
const orderId = ref('');

async function simulatePay(){
  if (!items.value.length || processing.value) return;
  processing.value = true;
  try {
    // Build order payload and call backend
    const payload = {
      clientId: String(localStorage.getItem('userId') || auth.user?.id || ''),
      products: items.value.map(it => ({ productId: String(it.productId), quantity: Number(it.quantity||0) }))
    };
    const res = await apiClient.post('/orders', payload);
    orderId.value = String(res.data?.order?.id || '');
    success.value = true;
    // Optionally empty cart
    await apiClient.delete('/cart');
    window.dispatchEvent(new Event('cart-updated'));
    // Go to payment screen with order data
    const amount = Number(res.data?.order?.total ?? total.value);
    setTimeout(() => {
      router.push({ name: 'Payment', query: { orderId: orderId.value, amount } });
    }, 300);
  } catch (e) {
    console.error(e);
  } finally {
    processing.value = false;
  }
}

onMounted(() => {
  loadCart();
});
</script>

<style scoped>
/* Minimal local tweaks; Tailwind classes handle the rest */
</style>