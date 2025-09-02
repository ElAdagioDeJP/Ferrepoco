<template>
  <div class="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100">

    <!-- Main -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Hero -->
      <section class="mb-12">
        <div class="relative rounded-xl overflow-hidden h-[300px] md:h-[400px] shadow-xl">
          <div class="absolute inset-0 bg-gradient-to-r from-cyan-800/90 to-cyan-600/70"></div>
          <img src="/logo.png" alt="Ferrepoco" class="w-full h-full object-cover" />
          <div class="absolute inset-0 flex flex-col justify-center px-8 md:px-16">
            <h2 class="text-white text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-4 text-balance">Herramientas para profesionales</h2>
            <p class="text-white text-lg md:text-xl mb-6 max-w-md font-body text-pretty">Descubre nuestra selección especial con un 25% de descuento en herramientas eléctricas</p>
            <div>
              <a href="#" class="inline-flex items-center px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white font-medium rounded-lg shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 font-body">
                Ver ofertas
                <svg class="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      <!-- Categories -->
      <section class="mb-12">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-2xl font-heading font-bold text-neutral-900">Categorías populares</h2>
          <a href="#" class="text-cyan-800 hover:text-cyan-700 transition-colors flex items-center font-body font-medium">
            Ver todas
            <svg class="ml-1 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </a>
        </div>
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <RouterLink v-for="cat in categories" :key="cat.id_categoria || cat.id" class="group" :to="{ name: 'Category', params: { id: (cat.id_categoria || cat.id) } }">
            <div class="bg-white rounded-lg shadow-sm overflow-hidden transition-all duration-200 hover:shadow-md hover:-translate-y-1 border border-neutral-200">
              <div class="h-40 bg-gradient-to-br from-neutral-50 to-neutral-100 flex items-center justify-center p-4">
                <component :is="categoryIcon(cat)" :size="48" class="text-neutral-600 group-hover:text-cyan-800 transition-colors" />
              </div>
              <div class="p-3 text-center">
                <h3 class="font-medium text-neutral-900 font-body">{{ cat.nombre_categoria || cat.name }}</h3>
              </div>
            </div>
          </RouterLink>
        </div>
      </section>

      <!-- Products & quick add (client) -->
      <section class="mb-12">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-2xl font-heading font-bold text-neutral-900">Productos destacados</h2>
          <div class="flex items-center gap-3">
            
            <div class="flex space-x-2">
            <button class="p-2 rounded-lg bg-neutral-100 hover:bg-neutral-200 transition-colors">
              <svg class="w-5 h-5 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
              </svg>
            </button>
            <button class="p-2 rounded-lg bg-neutral-100 hover:bg-neutral-200 transition-colors">
              <svg class="w-5 h-5 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </button>
            </div>
          </div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <div v-for="prod in filteredProducts" :key="prod.id" class="bg-white rounded-lg shadow-sm overflow-hidden transition-all duration-200 hover:shadow-lg hover:-translate-y-1 group border border-neutral-200">
            <div class="relative">
              <img :src="prod.imageUrl || '/placeholder.svg?height=200&width=300'" :alt="prod.name" class="w-full h-48 object-cover" />
            </div>
            <div class="p-4">
              <h3 class="font-medium text-neutral-900 mb-1 font-body">{{ prod.name }}</h3>
              <p class="text-sm text-neutral-500 mb-2 font-body">{{ prod.category || 'Sin categoría' }}</p>
              <div class="flex items-baseline justify-between">
                <div>
                  <span class="text-xl font-bold text-neutral-900 font-heading">${{ Number(prod.price || 0).toFixed(2) }}</span>
                  <span class="text-xs text-neutral-500 ml-2">Stock: {{ prod.stock ?? 0 }}</span>
                </div>
                <button class="p-2 rounded-full bg-cyan-100 text-cyan-800 hover:bg-cyan-200 transition-colors disabled:opacity-50" :disabled="(prod.stock ?? 0) < 1" @click="addToCart(prod.id)" aria-label="Agregar al carrito">
                  <span class="relative inline-block align-middle">
                    <ShoppingCart class="w-5 h-5" />
                    <Plus class="w-3 h-3 absolute -top-1 -right-1" />
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Add Product Modal -->
      <div v-if="showAddModal" class="fixed inset-0 z-50 flex items-start md:items-center justify-center bg-black/40 p-4 overflow-y-auto">
        <div class="bg-white rounded-lg shadow-xl w-full max-w-lg max-h-[90vh] flex flex-col">
          <div class="px-6 py-4 border-b border-neutral-200 flex items-center justify-between sticky top-0 bg-white z-10">
            <h3 class="text-lg font-heading font-bold">Agregar producto</h3>
            <button @click="closeAddModal" class="text-neutral-500 hover:text-neutral-700">✕</button>
          </div>
          <div class="px-6 py-4 overflow-y-auto flex-1 min-h-0">
          <form @submit.prevent="submitAddProduct" class="space-y-4">
            <div>
              <label for="add-name" class="block text-sm font-medium mb-1">Nombre</label>
              <input id="add-name" v-model="addForm.name" required class="w-full border border-neutral-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-600" />
            </div>
            <div>
              <label for="add-description" class="block text-sm font-medium mb-1">Descripción</label>
              <textarea id="add-description" v-model="addForm.description" rows="3" class="w-full border border-neutral-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-600"></textarea>
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label for="add-price" class="block text-sm font-medium mb-1">Precio</label>
                <input id="add-price" v-model.number="addForm.price" type="number" min="0" step="0.01" required class="w-full border border-neutral-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-600" />
              </div>
              <div>
                <label for="add-stock" class="block text-sm font-medium mb-1">Stock</label>
                <input id="add-stock" v-model.number="addForm.stock" type="number" min="0" step="1" required class="w-full border border-neutral-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-600" />
              </div>
            </div>
            <div>
              <label for="add-category" class="block text-sm font-medium mb-1">Categoría</label>
              <select id="add-category" v-model.number="addForm.categoryId" required class="w-full border border-neutral-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-600 bg-white">
                <option value="" disabled>Selecciona una categoría</option>
                <option v-for="cat in categories" :key="cat.id_categoria || cat.id" :value="Number(cat.id_categoria || cat.id)">
                  {{ cat.nombre_categoria || cat.name }}
                </option>
              </select>
            </div>
            <div>
              <label for="add-images" class="block text-sm font-medium mb-1">Imágenes</label>
              <div class="flex items-center gap-3">
                <input id="add-images" type="file" multiple accept="image/*" @change="onFilesChange" class="hidden" />
                <label for="add-images" class="inline-flex items-center px-3 py-2 rounded-md bg-neutral-100 hover:bg-neutral-200 text-neutral-700 border border-neutral-300 cursor-pointer">
                  <ImagePlus class="w-4 h-4 mr-2" /> Elegir imágenes
                </label>
                <span class="text-sm text-neutral-600" v-if="addImagesCount > 0">{{ addImagesCount }} seleccionada(s)</span>
                <span class="text-sm text-neutral-400" v-else>Ningún archivo seleccionado</span>
              </div>
              <p class="text-xs text-neutral-500 mt-1">Hasta 10 imágenes. PNG/JPG/WEBP. Máx 5MB c/u.</p>
            </div>
            <div class="flex items-center justify-end gap-3 pt-2">
              <button type="button" @click="closeAddModal" class="px-4 py-2 rounded-md border border-neutral-300 text-neutral-700">Cancelar</button>
              <button type="submit" :disabled="saving" class="px-4 py-2 rounded-md bg-cyan-800 text-white hover:bg-cyan-700 disabled:opacity-60">{{ saving ? 'Guardando...' : 'Guardar' }}</button>
            </div>
          </form>
          </div>
        </div>
      </div>

      <!-- Promos -->
      <section class="mb-12">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="bg-gradient-to-r from-cyan-50 to-cyan-100 rounded-xl overflow-hidden relative shadow-lg border border-cyan-200">
            <div class="p-6 md:p-8 relative z-10">
              <h3 class="text-2xl font-heading font-bold text-neutral-900 mb-2">Ahorra en tu próximo proyecto</h3>
              <p class="text-neutral-700 mb-4 font-body">Descuentos hasta del 30% en herramientas eléctricas</p>
              <a href="#" class="inline-flex items-center px-4 py-2 bg-cyan-800 hover:bg-cyan-700 text-white font-medium rounded-lg shadow-sm transition-all font-body">Ver ofertas</a>
            </div>
            <div class="absolute bottom-0 right-0 w-2/5 h-full">
              <img src="/placeholder.svg?height=200&width=200" alt="Herramientas en oferta" class="h-full object-cover object-left" />
            </div>
          </div>
          <div class="bg-gradient-to-r from-orange-50 to-orange-100 rounded-xl overflow-hidden relative shadow-lg border border-orange-200">
            <div class="p-6 md:p-8 relative z-10">
              <h3 class="text-2xl font-heading font-bold text-neutral-900 mb-2">Programa de profesionales</h3>
              <p class="text-neutral-700 mb-4 font-body">Regístrate y obtén beneficios exclusivos para contratistas</p>
              <a href="#" class="inline-flex items-center px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white font-medium rounded-lg shadow-sm transition-all font-body">Saber más</a>
            </div>
            <div class="absolute bottom-0 right-0 w-2/5 h-full">
              <img src="/placeholder.svg?height=200&width=200" alt="Profesional de la construcción" class="h-full object-cover object-left" />
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import apiClient from '../api/apiClient'
import { useAuthStore } from '../stores/auth'
import { useRouter } from 'vue-router'
// Lucide icons for epic-looking category visuals
import { Wrench, Hammer, Package, Paintbrush, Layers, Settings, Box, Zap, ShoppingCart, Plus, ImagePlus } from 'lucide-vue-next'

const auth = useAuthStore()
auth.initializeAuth()

// Reactive data
const searchQuery = ref('')
const favoriteCount = ref(0)
const cartCount = ref(0)
const categories = ref([])
const products = ref([])
const showAddModal = ref(false)
const saving = ref(false)
const addForm = ref({ name: '', description: '', price: 0, stock: 0, categoryId: '' })
const addFiles = ref([])
const addImagesCount = computed(() => addFiles.value.length)

const filteredProducts = computed(() => {
  const base = (products.value || []).filter(p => Number(p.stock ?? 0) > 0)
  const q = searchQuery.value.trim().toLowerCase()
  if (!q) return base
  return base.filter(p =>
    (p.name || '').toLowerCase().includes(q) || (p.category || '').toLowerCase().includes(q)
  )
})

// Methods
const router = useRouter()

// Choose an icon component based on the category name
function categoryIcon(cat) {
  const name = ((cat?.nombre_categoria || cat?.name || '') + '').toLowerCase()
  // Patterns for common categories in hardware stores
  if (name.includes('eléctrica') || name.includes('electrica') || name.includes('cable') || name.includes('corriente')) return Zap
  if (name.includes('pintur') || name.includes('pincel') || name.includes('pintura')) return Paintbrush
  if (name.includes('manual')) return Hammer
  if (name.includes('herramient')) return Wrench
  if (name.includes('constru') || name.includes('obra')) return Layers
  if (name.includes('ferreter')) return Wrench
  if (name.includes('paquete') || name.includes('empaque')) return Package
  if (name.includes('ajuste') || name.includes('config') || name.includes('tornillo')) return Settings
  // Fallback generic icon
  return Box
}

const addToCart = async (productId) => {
  try {
    await apiClient.post('/cart/items', { productId, quantity: 1 })
  await loadCartCount()
  window.dispatchEvent(new Event('cart-updated'))
  } catch (e) {
    console.error('Error adding to cart', e)
  }
}

async function loadCategories() {
  try {
    const res = await apiClient.get('/db/categorias')
    categories.value = res.data || []
  } catch (e) {
    console.error('Error loading categories', e)
  }
}

async function loadProducts() {
  try {
    const res = await apiClient.get('/products')
    const base = window.location.origin
    products.value = (res.data || []).map(p => {
      let url = null
      if (p && p.imageUrl) {
        url = p.imageUrl.startsWith('http') ? p.imageUrl : (base + p.imageUrl)
      }
      return { ...p, imageUrl: url }
    })
  } catch (e) {
    console.error('Error loading products', e)
  }
}

async function loadCartCount() {
  try {
    const res = await apiClient.get('/cart')
    const items = res.data?.items || []
    cartCount.value = items.reduce((sum, it) => sum + Number(it.quantity || 0), 0)
  } catch (e) {
    console.error('Error loading cart', e)
  }
}

onMounted(async () => {
  await Promise.all([loadCategories(), loadProducts(), loadCartCount()])
  // Escuchar búsqueda global desde Navbar
  const onGlobalSearch = (e) => {
    searchQuery.value = (e.detail || '').toString()
  }
  window.addEventListener('global-search', onGlobalSearch)
  // Guardar para removeEventListener
  ;(window)._client_onGlobalSearch = onGlobalSearch
})

onUnmounted(() => {
  if ((window)._client_onGlobalSearch) {
    window.removeEventListener('global-search', (window)._client_onGlobalSearch)
    delete (window)._client_onGlobalSearch
  }
})

// Add Product helpers
function openAddModal() {
  showAddModal.value = true
}
function closeAddModal() {
  showAddModal.value = false
  addForm.value = { name: '', description: '', price: 0, stock: 0, categoryId: '' }
  addFiles.value = []
}
function onFilesChange(e) {
  const files = e.target.files
  addFiles.value = Array.from(files).slice(0, 10)
}
async function submitAddProduct() {
  try {
    saving.value = true
    const fd = new FormData()
    fd.append('name', addForm.value.name)
    fd.append('description', addForm.value.description)
    fd.append('price', String(addForm.value.price))
    fd.append('stock', String(addForm.value.stock))
    if (addForm.value.categoryId !== '' && addForm.value.categoryId !== null && addForm.value.categoryId !== undefined) {
      fd.append('categoryId', String(addForm.value.categoryId))
    }
    addFiles.value.forEach(f => fd.append('images', f))
    await apiClient.post('/uploads/product', fd, { headers: { 'Content-Type': 'multipart/form-data' } })
    closeAddModal()
    await loadProducts()
  } catch (e) {
    console.error('Error creating product', e)
  } finally {
    saving.value = false
  }
}
</script>

<style scoped>
/* Updated to use new design system variables */

.font-heading {
  font-family: 'Montserrat', sans-serif;
}

.font-body {
  font-family: 'Open Sans', sans-serif;
}

/* Custom scrollbar for better UX */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f5f9;
}

::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}
</style>
