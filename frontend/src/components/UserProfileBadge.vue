<template>
  <div class="relative" v-if="isAuthenticated">
    <details class="group">
      <summary class="list-none cursor-pointer">
        <div class="flex items-center space-x-2">
          <div class="h-8 w-8 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center border border-primary-200">
            <span class="text-sm font-semibold">{{ roleLetter }}</span>
          </div>
          <span class="hidden md:block max-w-[180px] truncate">{{ displayName }}</span>
          <span class="material-symbols-outlined text-sm">expand_more</span>
        </div>
      </summary>
      <div class="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg z-10 border border-gray-200">
        <div class="px-4 py-3 border-b border-gray-100">
          <p class="text-sm text-gray-600">Sesión iniciada como</p>
          <p class="text-sm font-medium text-gray-900 truncate">{{ displayName }}</p>
          <p class="text-xs text-gray-500">Rol: {{ userRole }}</p>
        </div>
        <div class="py-1">
          <RouterLink to="/client" v-if="userRole==='client'" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Mi Panel</RouterLink>
          <RouterLink to="/employee" v-if="userRole==='employee'" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Panel Empleado</RouterLink>
          <RouterLink to="/admin" v-if="userRole==='admin'" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Panel Admin</RouterLink>
          <div class="border-t border-gray-100 my-1"></div>
          <button @click="logout" class="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100">Cerrar sesión</button>
        </div>
      </div>
    </details>
  </div>
  <div v-else>
    <RouterLink to="/" class="text-primary-600 hover:text-primary-700">Iniciar sesión</RouterLink>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';

const auth = useAuthStore();
auth.initializeAuth();
const router = useRouter();
const { isAuthenticated, displayName, userRole, roleLetter } = storeToRefs(auth);

function logout() {
  auth.logout();
  router.push('/');
}
</script>

<style scoped>
.material-symbols-outlined { font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24; }
</style>
