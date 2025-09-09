<template>
  <header class="bg-white shadow-lg border-b border-neutral-200">
    <div class="container mx-auto px-6 py-4">
      <div class="grid grid-cols-12 items-center gap-4">
        <!-- Brand -->
        <div class="col-span-12 md:col-span-4 flex items-center gap-3 min-w-0 cursor-pointer" @click="goToDashboard">
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
          <!-- Desktop: acciones visibles -->
          <a
            href="https://github.com/ElAdagioDeJP/Ferrepoco/blob/unificado/doc.md"
            target="_blank"
            rel="noopener noreferrer"
            class="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-50 text-cyan-800 font-medium hover:bg-cyan-100 transition-colors border border-cyan-200"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 20h9"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16.5 3.5A2.121 2.121 0 0119 6v12a2.121 2.121 0 01-2.5 2.5H7A2.121 2.121 0 014.5 18V6A2.121 2.121 0 017 3.5h9.5z"/></svg>
            Docs
          </a>
          <template v-if="userRole === 'client'">
            <button class="hidden md:inline-flex p-2 rounded-lg hover:bg-neutral-100 transition-colors relative" @click="openCart" aria-label="Carrito">
              <ShoppingCart class="w-6 h-6 text-neutral-600" />
              <span class="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">{{ cartCount }}</span>
            </button>
          </template>
          <UserProfileBadge class="hidden md:inline-flex" />

          <!-- Mobile: menú hamburguesa -->
          <div class="md:hidden relative">
            <button @click="toggleMenu" class="p-2 rounded-lg hover:bg-neutral-100 transition-colors" aria-label="Menú">
              <svg class="w-7 h-7 text-cyan-800" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/></svg>
            </button>
            <transition name="fade">
              <div v-if="menuOpen" class="absolute right-0 mt-2 w-48 bg-white border border-neutral-200 rounded-lg shadow-lg z-50 py-2 flex flex-col gap-1 animate-fade-in">
                <a
                  href="https://github.com/ElAdagioDeJP/Ferrepoco/blob/unificado/doc.md"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-cyan-50 text-cyan-800 font-medium"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 20h9"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16.5 3.5A2.121 2.121 0 0119 6v12a2.121 2.121 0 01-2.5 2.5H7A2.121 2.121 0 014.5 18V6A2.121 2.121 0 017 3.5h9.5z"/></svg>
                  Docs
                </a>
                <button v-if="userRole === 'client'" @click="openCart; closeMenu()" class="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-cyan-50 text-cyan-800 font-medium">
                  <ShoppingCart class="w-5 h-5" />
                  Carrito
                  <span class="ml-auto bg-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">{{ cartCount }}</span>
                </button>
                <div class="px-4 py-2">
                  <UserProfileBadge />
                </div>
              </div>
            </transition>
          </div>
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


const menuOpen = ref(false);
function toggleMenu() { menuOpen.value = !menuOpen.value; }
function closeMenu() { menuOpen.value = false; }

const auth = useAuthStore();
auth.initializeAuth();

const router = useRouter();

const searchQuery = ref('');
const favoriteCount = ref(Number(localStorage.getItem('favoritesCount') || 0));
const cartCount = ref(0);

const userRole = auth.userRole;

function goToDashboard() {
  if (userRole === 'admin') {
    router.push({ name: 'AdminDashboard' });
  } else if (userRole === 'employee') {
    router.push({ name: 'EmployeeDashboard' });
  } else if (userRole === 'client') {
    router.push({ name: 'ClientDashboard' });
  } else {
    router.push({ name: 'Login' });
  }
}

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

<style>
@keyframes fade-in {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in {
  animation: fade-in 0.2s ease;
}
</style>
