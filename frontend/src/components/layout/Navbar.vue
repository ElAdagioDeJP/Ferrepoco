<template>
  <header class="bg-white shadow-lg border-b border-neutral-200">
    <div class="container mx-auto px-6 py-4">
      <div class="grid grid-cols-12 items-center gap-4">
        <!-- Brand -->
        <div class="col-span-12 md:col-span-4 flex items-center gap-3 min-w-0">
          <img src="/logo.png" alt="Ferrepoco" class="w-10 h-10 rounded-lg object-cover flex-shrink-0" />
          <div class="truncate">
            <h1 class="text-2xl font-heading font-bold text-cyan-800 truncate">Ferrepoco</h1>
            <p class="text-xs text-neutral-500 font-body truncate">Sistema de Gestión</p>
          </div>
        </div>

        <!-- Search (emite evento global) -->
        <div class="col-span-12 md:col-span-5">
          <label class="relative block">
            <span class="absolute inset-y-0 left-0 pl-3 flex items-center text-neutral-400">
              <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-4.35-4.35M10 18a8 8 0 100-16 8 8 0 000 16z" />
              </svg>
            </span>
            <input
              v-model="searchQuery"
              @input="emitGlobalSearch"
              type="search"
              placeholder="Buscar productos"
              class="w-full pl-10 pr-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
            />
          </label>
        </div>

        <!-- Actions -->
        <div class="col-span-12 md:col-span-3 flex items-center justify-end gap-2 md:gap-4">
          <!-- Cliente: favoritos y carrito -->
          <template v-if="userRole === 'client'">
            <button class="p-2 rounded-lg hover:bg-neutral-100 transition-colors relative" @click="openCart" aria-label="Carrito">
              <ShoppingCart class="w-6 h-6 text-neutral-600" />
              <span class="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">{{ cartCount }}</span>
            </button>
          </template>

          <!-- Notificaciones (admin/employee) -->
          

          <UserProfileBadge />
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../../stores/auth';
import apiClient from '../../api/apiClient';
import UserProfileBadge from '../UserProfileBadge.vue';
import { ShoppingCart } from 'lucide-vue-next';

const auth = useAuthStore();
auth.initializeAuth();

const router = useRouter();
const searchQuery = ref('');
const favoriteCount = ref(Number(localStorage.getItem('favoritesCount') || 0));
const cartCount = ref(0);

const userRole = auth.userRole;

const emitGlobalSearch = () => {
  const event = new CustomEvent('global-search', { detail: searchQuery.value });
  window.dispatchEvent(event);
};

async function loadCartCount() {
  try {
    if (userRole !== 'client') return;
    const res = await apiClient.get('/cart');
    const items = res.data?.items || [];
    cartCount.value = items.reduce((sum, it) => sum + Number(it.quantity || 0), 0);
  } catch (e) {
    console.debug('Failed to load cart count', e);
  }
}

function onCartUpdated() {
  loadCartCount();
}

function openCart() {
  const evt = new Event('open-cart')
  window.dispatchEvent(evt)
}

function goToFavorites() {
  router.push({ name: 'ClientDashboard' });
}

onMounted(() => {
  loadCartCount();
  // Refresh user profile (including avatar) on load
  if (auth.isAuthenticated) auth.refreshMe();
  window.addEventListener('cart-updated', onCartUpdated);
});

onUnmounted(() => {
  window.removeEventListener('cart-updated', onCartUpdated);
});
</script>
