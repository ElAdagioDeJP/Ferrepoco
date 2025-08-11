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
                </td>
              </tr>
            </tbody>
          </table>
        </div>
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
</style>
