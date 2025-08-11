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

const canEdit = computed(() => ['admin', 'employee'].includes(auth.userRole));

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
  } catch (e) { error.value = e.response?.data?.message || 'Error actualizando producto'; }
}

async function deleteProduct(id) {
  if (!confirm('¿Eliminar producto?')) return;
  try {
    await apiClient.delete(`/products/${id}`);
    products.value = products.value.filter(p => p.id !== id);
  } catch (e) { error.value = e.response?.data?.message || 'Error eliminando producto'; }
}

const filtered = computed(() => {
  const q = search.value.trim().toLowerCase();
  if (!q) return products.value;
  return products.value.filter(p => [p.name, p.description, p.category].filter(Boolean).some(s => s.toLowerCase().includes(q)));
});

onMounted(loadProducts);
</script>

<template>
  <div class="max-w-7xl mx-auto p-4">
    <div class="flex items-center justify-between mb-4">
      <h1 class="text-2xl font-bold">Gestión de Productos</h1>
      <RouterLink to="/" class="text-sm text-gray-500 hover:text-gray-700">Volver</RouterLink>
    </div>
    <div class="bg-white rounded-lg shadow p-4 mb-4">
      <div class="flex gap-3 items-end flex-wrap">
        <div class="flex-1 min-w-[220px]">
          <label for="pm-search" class="block text-sm font-medium text-gray-700 mb-1">Buscar</label>
          <input id="pm-search" v-model="search" placeholder="Nombre, descripción o categoría" class="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500" />
        </div>
        <button @click="loadProducts" class="px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded">Recargar</button>
      </div>
    </div>

    <div class="grid lg:grid-cols-3 gap-6">
      <div class="lg:col-span-2 bg-white rounded-lg shadow overflow-hidden">
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Nombre</th>
                <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Precio</th>
                <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Stock</th>
                <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Categoría</th>
                <th class="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase">Acciones</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="p in filtered" :key="p.id" class="hover:bg-gray-50">
                <td class="px-4 py-2">{{ p.name }}</td>
                <td class="px-4 py-2">${{ Number(p.price).toFixed(2) }}</td>
                <td class="px-4 py-2">{{ p.stock }}</td>
                <td class="px-4 py-2">{{ p.category }}</td>
                <td class="px-4 py-2 text-right space-x-2">
                  <button v-if="canEdit" class="px-2 py-1 text-sm rounded bg-yellow-100 hover:bg-yellow-200" @click="resetForm(p); selected = p.id">Editar</button>
                  <button v-if="auth.userRole==='admin'" class="px-2 py-1 text-sm rounded bg-red-100 hover:bg-red-200" @click="deleteProduct(p.id)">Eliminar</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div v-if="loading" class="p-4 text-sm text-gray-500">Cargando...</div>
        <div v-if="error" class="p-4 text-sm text-red-600">{{ error }}</div>
      </div>

      <div class="bg-white rounded-lg shadow p-4">
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
              <input id="pm-stock" type="number" min="0" step="1" v-model="form.stock" required class="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500" />
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
          <p v-if="!canEdit" class="text-xs text-gray-500">Tu rol no permite editar.</p>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.material-symbols-outlined { font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24; }
</style>
