<template>
  <div class="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100">
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-2xl font-heading font-bold text-neutral-900">{{ title }}</h2>
        <RouterLink to="/client" class="text-cyan-800 hover:text-cyan-700 text-sm">Volver</RouterLink>
      </div>

      <div v-if="loading" class="text-center text-neutral-600">Cargando productos…</div>
      <div v-else-if="error" class="text-center text-red-600">{{ error }}</div>

  <div v-else-if="products.length > 0" class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <div v-for="p in products" :key="p.id" class="bg-white rounded-lg shadow-sm border border-neutral-200">
          <img :src="p.imageUrl || '/placeholder.svg?height=200&width=300'" :alt="p.name" class="w-full h-48 object-cover" />
          <div class="p-4">
            <h3 class="font-medium text-neutral-900 mb-1 font-body">{{ p.name }}</h3>
            <p class="text-sm text-neutral-500 mb-2 font-body">{{ p.category || 'Sin categoría' }}</p>
            <div class="flex items-center justify-between">
              <span class="text-xl font-bold text-neutral-900 font-heading">${{ Number(p.price || 0).toFixed(2) }}</span>
              <button class="px-3 py-1 rounded-md bg-cyan-800 text-white hover:bg-cyan-700 text-sm" :disabled="(p.stock ?? 0) < 1" @click="addToCart(p.id)">Agregar</button>
            </div>
          </div>
        </div>
      </div>
  <div v-else class="text-center text-neutral-600">No hay productos para esta categoría.</div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import apiClient from '@/api/apiClient'

const route = useRoute()
const loading = ref(true)
const error = ref('')
const title = ref('Categoría')
const products = ref([])

async function loadCategoryProducts(categoryId) {
  loading.value = true
  error.value = ''
  try {
    const resCats = await apiClient.get('/db/categorias')
    const cats = resCats.data || []
    const found = cats.find(c => String(c.id_categoria || c.id) === String(categoryId))
    title.value = found ? `Categoría: ${found.nombre_categoria || found.name}` : 'Categoría'

    const res = await apiClient.get(`/products/by-category/${categoryId}`)
    const base = window.location.origin
    const rows = res.data || []
    products.value = rows.map(p => {
      let url = null
      if (p && p.imageUrl) {
        url = p.imageUrl.startsWith('http') ? p.imageUrl : (base + p.imageUrl)
      }
      return { ...p, imageUrl: url }
    })
  } catch (e) {
    console.error('Error loading category products', e)
    error.value = 'No se pudieron cargar los productos de la categoría'
  } finally {
    loading.value = false
  }
}

async function addToCart(productId) {
  try {
    await apiClient.post('/cart/items', { productId, quantity: 1 })
  } catch (e) {
    console.error('Error adding to cart', e)
  }
}

onMounted(() => {
  loadCategoryProducts(route.params.id)
})

watch(() => route.params.id, (id) => {
  if (id) loadCategoryProducts(id)
})
</script>

<style scoped>
.font-heading { font-family: 'Montserrat', sans-serif; }
.font-body { font-family: 'Open Sans', sans-serif; }
</style>
