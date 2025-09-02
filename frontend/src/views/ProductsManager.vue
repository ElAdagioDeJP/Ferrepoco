<<<<<<< HEAD
<script setup>
import { onMounted, reactive, ref, computed } from 'vue';
import apiClient from '../api/apiClient';
import { useAuthStore } from '../stores/auth';

const auth = useAuthStore();
auth.initializeAuth();

const products = ref([]);
const loading = ref(false);
const error = ref('');
const search = ref('');
const selected = ref(null);
const form = reactive({ id: null, name: '', description: '', price: 0, stock: 0, category: '' });
// Roles
const isAdmin = computed(() => auth.userRole === 'admin');
const canAdjustStock = computed(() => ['admin', 'employee'].includes(auth.userRole));

// Stock adjustment form
const stockForm = reactive({ productId: null, quantity: 0, motivo: '' });
const adjustingName = computed(() => products.value.find(p => p.id === stockForm.productId)?.name || '');

// Alerts
const alerts = ref([]);
const alertsLoading = ref(false);
const alertsMessage = ref('');

// UI state for modals
const showProductModal = ref(false);
const showStockModal = ref(false);
const showDeleteConfirm = ref(false);
const deleteTargetId = ref(null);

async function loadProducts() {
  loading.value = true;
  error.value = '';
  try {
    const { data } = await apiClient.get('/products');
    products.value = data;
  } catch (e) { error.value = e.response?.data?.message || 'Error cargando productos'; }
  finally { loading.value = false; }
}

function resetForm(p = null) {
  if (p) Object.assign(form, p);
  else Object.assign(form, { id: null, name: '', description: '', price: 0, stock: 0, category: '' });
}

async function createProduct() {
  try {
    const payload = { name: form.name, description: form.description, price: Number(form.price), stock: Number(form.stock), category: form.category };
    const { data } = await apiClient.post('/products', payload);
    products.value.push(data.product);
    resetForm();
  } catch (e) { error.value = e.response?.data?.message || 'Error creando producto'; }
}

async function updateProduct() {
  try {
    const { data } = await apiClient.put(`/products/${form.id}`, {
      name: form.name,
      description: form.description,
      price: Number(form.price),
      stock: Number(form.stock),
      category: form.category
    });
    const idx = products.value.findIndex(p => p.id === form.id);
    if (idx !== -1) products.value[idx] = data.product;
    resetForm();
    selected.value = null;
    showProductModal.value = false;
  } catch (e) { error.value = e.response?.data?.message || 'Error actualizando producto'; }
}

async function confirmDelete(id) {
  deleteTargetId.value = id;
  showDeleteConfirm.value = true;
}

async function deleteProduct(id) {
  try {
    const target = id || deleteTargetId.value;
    if (!target) return;
    await apiClient.delete(`/products/${target}`);
    products.value = products.value.filter(p => p.id !== target);
    showDeleteConfirm.value = false;
    deleteTargetId.value = null;
  } catch (e) { error.value = e.response?.data?.message || 'Error eliminando producto'; }
}

const filtered = computed(() => {
  const q = search.value.trim().toLowerCase();
  if (!q) return products.value;
  return products.value.filter(p => [p.name, p.description, p.category].filter(Boolean).some(s => s.toLowerCase().includes(q)));
});

async function loadAlerts() {
  alertsLoading.value = true;
  alertsMessage.value = '';
  try {
    const { data } = await apiClient.get('/inventory/alerts');
    if (Array.isArray(data)) {
      alerts.value = data;
    } else {
      alerts.value = [];
      alertsMessage.value = data?.message || '';
    }
  } catch (e) {
    alerts.value = [];
    alertsMessage.value = e.response?.data?.message || 'Error cargando alertas';
  } finally {
    alertsLoading.value = false;
  }
}

function resetStockForm(p = null) {
  if (p) {
    stockForm.productId = p.id;
  } else {
    stockForm.productId = null;
  }
  stockForm.quantity = 0;
  stockForm.motivo = '';
}

async function adjustStock() {
  error.value = '';
  if (!stockForm.productId) {
    error.value = 'Seleccione un producto para ajustar stock';
    return;
  }
  try {
    const payload = { quantity: Number(stockForm.quantity) };
    if (stockForm.motivo?.trim()) payload.motivo = stockForm.motivo.trim();
    const { data } = await apiClient.put(`/inventory/stock/${stockForm.productId}`, payload);
    // Update product in list
    const idx = products.value.findIndex(p => p.id === stockForm.productId);
    if (idx !== -1) products.value[idx] = data.product;
    await loadAlerts();
    resetStockForm();
  showStockModal.value = false;
  } catch (e) {
    error.value = e.response?.data?.message || 'Error ajustando stock';
  }
}

onMounted(async () => {
  await loadProducts();
  if (canAdjustStock.value) await loadAlerts();
});
</script>

<template>
  <div class="max-w-7xl mx-auto p-6">
    <div class="flex items-center justify-between mb-6">
      <div>
        <h1 class="text-3xl font-bold tracking-tight text-slate-900">Gestión de Productos</h1>
        <p class="text-sm text-slate-600">Administra catálogo, stock y alertas de inventario</p>
      </div>
      <div class="flex gap-2">
        <RouterLink to="/" class="px-3 py-2 rounded-md border border-slate-300 text-slate-700 hover:bg-slate-50">Volver</RouterLink>
        <button v-if="isAdmin" @click="resetForm(); showProductModal = true" class="px-3 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700">Nuevo producto</button>
      </div>
    </div>
    <div class="bg-white rounded-xl shadow p-4 mb-6">
      <div class="flex gap-3 items-end flex-wrap">
        <div class="flex-1 min-w-[220px]">
          <label for="pm-search" class="block text-sm font-medium text-slate-700 mb-1">Buscar</label>
          <input id="pm-search" v-model="search" placeholder="Nombre, descripción o categoría" class="w-full border border-slate-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" />
        </div>
        <button @click="loadProducts" class="px-3 py-2 bg-slate-100 hover:bg-slate-200 rounded-md">Recargar</button>
      </div>
    </div>

    <div class="grid lg:grid-cols-3 gap-6">
      <div class="lg:col-span-2 bg-white rounded-xl shadow overflow-hidden">
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-slate-200">
            <thead class="bg-slate-50">
              <tr>
                <th class="px-4 py-2 text-left text-xs font-semibold text-slate-600 uppercase">Nombre</th>
                <th class="px-4 py-2 text-left text-xs font-semibold text-slate-600 uppercase">Precio</th>
                <th class="px-4 py-2 text-left text-xs font-semibold text-slate-600 uppercase">Stock</th>
                <th class="px-4 py-2 text-left text-xs font-semibold text-slate-600 uppercase">Categoría</th>
                <th class="px-4 py-2 text-right text-xs font-semibold text-slate-600 uppercase">Acciones</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-slate-200">
              <tr v-for="p in filtered" :key="p.id" class="hover:bg-slate-50">
                <td class="px-4 py-3">
                  <div class="font-medium text-slate-900">{{ p.name }}</div>
                  <div class="text-xs text-slate-500">{{ p.description }}</div>
                </td>
                <td class="px-4 py-3">${{ Number(p.price).toFixed(2) }}</td>
                <td class="px-4 py-3">
                  <span class="inline-flex items-center px-2 py-1 text-xs rounded-full" :class="p.stock <= 10 ? 'bg-red-50 text-red-700' : p.stock <= 25 ? 'bg-yellow-50 text-yellow-700' : 'bg-green-50 text-green-700'">{{ p.stock }}</span>
                </td>
                <td class="px-4 py-3">
                  <span class="inline-flex items-center px-2 py-1 text-xs rounded-md bg-slate-100 text-slate-700">{{ p.category }}</span>
                </td>
                <td class="px-4 py-3 text-right space-x-2">
                  <button v-if="isAdmin" class="px-2 py-1 text-xs rounded-md bg-indigo-50 text-indigo-700 hover:bg-indigo-100" @click="resetForm(p); selected = p.id; showProductModal = true">Editar</button>
                  <button v-if="canAdjustStock" class="px-2 py-1 text-xs rounded-md bg-blue-50 text-blue-700 hover:bg-blue-100" @click="resetStockForm(p); showStockModal = true">Stock +/-</button>
                  <button v-if="isAdmin" class="px-2 py-1 text-xs rounded-md bg-rose-50 text-rose-700 hover:bg-rose-100" @click="confirmDelete(p.id)">Eliminar</button>
=======
<template>
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
>>>>>>> unificado
                </td>
              </tr>
            </tbody>
          </table>
        </div>
<<<<<<< HEAD
        <div v-if="loading" class="p-4 text-sm text-gray-500">Cargando...</div>
        <div v-if="error" class="p-4 text-sm text-red-600">{{ error }}</div>
      </div>

      <div class="space-y-6">
        <!-- Product details form (Admin only) -->
        <div class="bg-white rounded-lg shadow p-4" v-if="isAdmin">
          <h2 class="font-semibold mb-3">{{ form.id ? 'Editar producto' : 'Nuevo producto' }}</h2>
          <form class="space-y-3" @submit.prevent="form.id ? updateProduct() : createProduct()">
            <div>
              <label for="pm-name" class="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
              <input id="pm-name" v-model="form.name" required class="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500" />
            </div>
            <div>
              <label for="pm-description" class="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
              <textarea id="pm-description" v-model="form.description" rows="3" class="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"></textarea>
            </div>
            <div class="grid grid-cols-2 gap-3">
              <div>
                <label for="pm-price" class="block text-sm font-medium text-gray-700 mb-1">Precio</label>
                <input id="pm-price" type="number" min="0" step="0.01" v-model="form.price" required class="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500" />
              </div>
              <div>
                <label for="pm-stock" class="block text-sm font-medium text-gray-700 mb-1">Stock</label>
                <input id="pm-stock" type="number" step="1" v-model="form.stock" required class="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500" />
              </div>
            </div>
            <div>
              <label for="pm-category" class="block text-sm font-medium text-gray-700 mb-1">Categoría</label>
              <input id="pm-category" v-model="form.category" required class="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500" />
            </div>
            <div class="flex gap-2">
              <button type="submit" class="px-4 py-2 rounded bg-primary-600 hover:bg-primary-700 text-white">{{ form.id ? 'Guardar cambios' : 'Crear producto' }}</button>
              <button type="button" @click="resetForm(); selected=null" class="px-4 py-2 rounded bg-gray-100 hover:bg-gray-200">Limpiar</button>
            </div>
          </form>
        </div>

        <!-- Alerts (Admin + Employee) -->
        <div class="bg-white rounded-xl shadow p-4" v-if="canAdjustStock">
          <div class="flex items-center justify-between mb-2">
            <h2 class="font-semibold">Alertas de Inventario</h2>
            <button class="px-3 py-2 bg-slate-100 hover:bg-slate-200 rounded-md" @click="loadAlerts" :disabled="alertsLoading">{{ alertsLoading ? 'Cargando…' : 'Actualizar' }}</button>
          </div>
          <div v-if="alerts.length > 0" class="space-y-2">
            <div v-for="a in alerts" :key="a.productId + '-' + a.type" class="border rounded p-3 flex items-center gap-3" :class="a.type==='low_stock' ? 'border-yellow-300 bg-yellow-50' : 'border-slate-200'">
              <div class="text-sm">
                <p class="font-medium">{{ a.productName }}</p>
                <p class="text-slate-600">{{ a.message }}</p>
                <p class="text-xs text-slate-500">Stock actual: {{ a.currentStock }} • Umbral: {{ a.threshold }}</p>
              </div>
            </div>
          </div>
          <p v-else class="text-sm text-slate-500">{{ alertsMessage || 'Sin alertas por ahora.' }}</p>
        </div>
      </div>
    </div>
    <!-- Product Modal -->
    <div v-if="showProductModal" class="fixed inset-0 z-50 flex items-center justify-center">
      <div class="absolute inset-0 bg-black/40" @click="showProductModal=false"></div>
      <div class="relative bg-white rounded-xl shadow-xl w-full max-w-xl p-6">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-semibold">{{ form.id ? 'Editar producto' : 'Nuevo producto' }}</h3>
          <button class="text-slate-500 hover:text-slate-800" @click="showProductModal=false">✕</button>
        </div>
        <form class="space-y-4" @submit.prevent="form.id ? updateProduct() : createProduct()">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label for="pm-name" class="block text-sm font-medium text-slate-700 mb-1">Nombre</label>
              <input id="pm-name" v-model="form.name" required class="w-full border border-slate-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" />
            </div>
            <div>
              <label for="pm-category" class="block text-sm font-medium text-slate-700 mb-1">Categoría</label>
              <input id="pm-category" v-model="form.category" required class="w-full border border-slate-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" />
            </div>
          </div>
          <div>
            <label for="pm-description" class="block text-sm font-medium text-slate-700 mb-1">Descripción</label>
            <textarea id="pm-description" v-model="form.description" rows="3" class="w-full border border-slate-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"></textarea>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label for="pm-price" class="block text-sm font-medium text-slate-700 mb-1">Precio</label>
              <input id="pm-price" type="number" min="0" step="0.01" v-model="form.price" required class="w-full border border-slate-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" />
            </div>
            <div>
              <label for="pm-stock" class="block text-sm font-medium text-slate-700 mb-1">Stock</label>
              <input id="pm-stock" type="number" step="1" v-model="form.stock" required class="w-full border border-slate-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" />
            </div>
          </div>
          <div class="flex items-center justify-end gap-2 pt-2">
            <button type="button" @click="showProductModal=false" class="px-4 py-2 rounded-md border border-slate-300 text-slate-700 hover:bg-slate-50">Cancelar</button>
            <button type="submit" class="px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700">{{ form.id ? 'Guardar cambios' : 'Crear producto' }}</button>
          </div>
        </form>
      </div>
    </div>

    <!-- Stock Modal -->
    <div v-if="showStockModal" class="fixed inset-0 z-50 flex items-center justify-center">
      <div class="absolute inset-0 bg-black/40" @click="showStockModal=false"></div>
      <div class="relative bg-white rounded-xl shadow-xl w-full max-w-xl p-6">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-semibold">Ajuste de Stock</h3>
          <button class="text-slate-500 hover:text-slate-800" @click="showStockModal=false">✕</button>
        </div>
        <form class="space-y-4" @submit.prevent="adjustStock">
          <div>
            <label for="pm-stock-product" class="block text-sm font-medium text-slate-700 mb-1">Producto</label>
            <select id="pm-stock-product" v-model="stockForm.productId" class="w-full border border-slate-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
              <option disabled value="">Seleccione un producto</option>
              <option v-for="p in products" :key="p.id" :value="p.id">{{ p.name }} (Stock: {{ p.stock }})</option>
            </select>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label for="pm-quantity" class="block text-sm font-medium text-slate-700 mb-1">Cantidad (+/-)</label>
              <input id="pm-quantity" type="number" step="1" v-model="stockForm.quantity" required class="w-full border border-slate-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" />
            </div>
            <div>
              <label for="pm-motivo" class="block text-sm font-medium text-slate-700 mb-1">Motivo (opcional)</label>
              <input id="pm-motivo" v-model="stockForm.motivo" placeholder="Ingreso, venta, pérdida..." class="w-full border border-slate-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" />
            </div>
          </div>
          <div class="flex items-center justify-end gap-2 pt-2">
            <button type="button" @click="showStockModal=false" class="px-4 py-2 rounded-md border border-slate-300 text-slate-700 hover:bg-slate-50">Cancelar</button>
            <button type="submit" class="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700">Actualizar stock</button>
          </div>
        </form>
      </div>
    </div>

    <!-- Delete Confirm Modal -->
    <div v-if="showDeleteConfirm" class="fixed inset-0 z-50 flex items-center justify-center">
      <div class="absolute inset-0 bg-black/40" @click="showDeleteConfirm=false"></div>
      <div class="relative bg-white rounded-xl shadow-xl w-full max-w-md p-6">
        <h3 class="text-lg font-semibold mb-2">Eliminar producto</h3>
        <p class="text-sm text-slate-600 mb-4">Esta acción no se puede deshacer. ¿Deseas continuar?</p>
        <div class="flex items-center justify-end gap-2">
          <button class="px-4 py-2 rounded-md border border-slate-300 text-slate-700 hover:bg-slate-50" @click="showDeleteConfirm=false">Cancelar</button>
          <button class="px-4 py-2 rounded-md bg-rose-600 text-white hover:bg-rose-700" @click="deleteProduct()">Eliminar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.material-symbols-outlined { font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24; }
=======
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
authStore.initializeAuth()
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
    const response = await apiClient.get('/products');
    const allProducts = response.data;
    const lowStockProducts = allProducts.filter(p => p.stock <= 50);
    console.log('Low stock products:', lowStockProducts);
    alerts.value = lowStockProducts.map(p => ({
      productId: p.id,
      productName: p.name,
      type: 'low_stock',
      message: `Stock crítico: ${p.stock} unidades restantes`,
      currentStock: p.stock,
      threshold: 10
    }));
    console.log('Alerts value:', alerts.value);
    if (alerts.value.length === 0) {
      alertsMessage.value = 'No hay productos con stock bajo';
    }
  } catch (err) {
    console.error('Error loading alerts:', err);
  } finally {
    alertsLoading.value = false;
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
  const token = localStorage.getItem('token');
  if (!token) {
    error.value = 'No hay token de autenticación. Por favor inicia sesión.';
    return;
  }
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
  const token = localStorage.getItem('token');
  if (!token) {
    error.value = 'No hay token de autenticación. Por favor inicia sesión.';
    return;
  }
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
  const token = localStorage.getItem('token');
  if (!token) {
    error.value = 'No hay token de autenticación. Por favor inicia sesión.';
    return;
  }
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
  const token = localStorage.getItem('token');
  if (!token) {
    error.value = 'No hay token de autenticación. Por favor inicia sesión.';
    return;
  }
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
  loadProducts();
  loadAlerts();
})
</script>

<style scoped>
.font-heading {
  font-family: 'Montserrat', sans-serif;
}

.font-body {
  font-family: 'Open Sans', sans-serif;
}
>>>>>>> unificado
</style>
