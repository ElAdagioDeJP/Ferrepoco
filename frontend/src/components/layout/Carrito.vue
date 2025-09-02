<template>
  <transition name="fade">
    <div v-if="open" class="fixed inset-0 z-50">
      <div class="absolute inset-0 bg-black/40" @click="emitClose"></div>
      <aside class="absolute right-0 top-0 h-full w-full sm:w-[420px] bg-white shadow-xl flex flex-col">
        <header class="px-5 py-4 border-b flex items-center justify-between">
          <h2 class="text-lg font-semibold">Carrito</h2>
          <button @click="emitClose" class="text-neutral-500 hover:text-neutral-700">✕</button>
        </header>
        <section class="flex-1 overflow-y-auto p-4 space-y-4">
          <div v-if="!items.length" class="text-center text-neutral-500 py-16">
            Tu carrito está vacío
          </div>
          <div v-for="it in items" :key="it.productId" class="flex gap-3 items-start border-b pb-4">
            <img :src="image(it)" class="w-16 h-16 rounded object-cover bg-neutral-100" alt="" />
            <div class="flex-1 min-w-0">
              <div class="flex items-start justify-between gap-2">
                <h3 class="font-medium truncate">{{ it.product?.name || 'Producto' }}</h3>
                <button @click="removeItem(it.productId)" class="text-red-600 text-sm">Quitar</button>
              </div>
              <p class="text-xs text-neutral-500 truncate">{{ it.product?.category || '' }}</p>
              <div class="flex items-center justify-between mt-2">
                <div class="inline-flex items-center border rounded-md overflow-hidden">
                  <button class="px-2 py-1" @click="decQty(it)">-</button>
                  <span class="px-3 py-1 text-sm">{{ it.quantity }}</span>
                  <button class="px-2 py-1" @click="incQty(it)">+</button>
                </div>
                <div class="text-right">
                  <div class="text-sm font-semibold">${{ lineTotal(it).toFixed(2) }}</div>
                  <div class="text-xs text-neutral-500">${{ unitPrice(it).toFixed(2) }} c/u</div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <footer class="border-t p-4">
          <div class="flex items-center justify-between mb-3">
            <span class="text-sm text-neutral-600">Subtotal</span>
            <span class="font-semibold">${{ subtotal.toFixed(2) }}</span>
          </div>
          <button class="w-full bg-cyan-800 text-white py-2.5 rounded-md hover:bg-cyan-700" @click="goCheckout" :disabled="!items.length">
            Proceder al pago
          </button>
        </footer>
      </aside>
    </div>
  </transition>
  
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import apiClient from '@/api/apiClient'
import { useAuthStore } from '@/stores/auth'

const props = defineProps({
  open: { type: Boolean, default: false }
})
const emit = defineEmits(['close','checked-out'])

const auth = useAuthStore()
auth.initializeAuth()

const router = useRouter()
const items = ref([])

function emitClose(){ emit('close') }

function image(it){
  const url = it.product?.imageUrl
  if (!url) return '/placeholder.svg?height=64&width=64'
  return url.startsWith('http') ? url : window.location.origin + url
}
function unitPrice(it){ return Number(it.product?.price || 0) }
function lineTotal(it){ return unitPrice(it) * Number(it.quantity || 0) }
const subtotal = ref(0)

function compute(){ subtotal.value = items.value.reduce((s, it) => s + lineTotal(it), 0) }

async function loadCart(){
  if (auth.userRole !== 'client') { items.value = []; compute(); return }
  const res = await apiClient.get('/cart')
  const list = res.data?.items || []
  items.value = list
  compute()
}

async function updateQty(productId, quantity){
  await apiClient.post('/cart/items', { productId, quantity })
  await loadCart()
  window.dispatchEvent(new Event('cart-updated'))
}
async function removeItem(productId){
  await apiClient.delete(`/cart/items/${productId}`)
  await loadCart()
  window.dispatchEvent(new Event('cart-updated'))
}
function incQty(it){ updateQty(it.productId, Number(it.quantity||0)+1) }
function decQty(it){
  const q = Number(it.quantity||0)-1
  if (q < 1) return
  updateQty(it.productId, q)
}

function goCheckout(){
  // Close drawer, emit sync, then navigate using router
  window.dispatchEvent(new Event('cart-updated'))
  emit('close')
  setTimeout(() => { router.push({ name: 'Checkout' }) }, 100)
}

watch(() => props.open, (v) => { if (v) loadCart() })
onMounted(() => { if (props.open) loadCart() })
</script>

<style scoped>
.fade-enter-active,.fade-leave-active{ transition: opacity .15s }
.fade-enter-from,.fade-leave-to{ opacity: 0 }
</style>