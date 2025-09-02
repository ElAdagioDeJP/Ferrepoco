<template>
  <aside v-if="showSidebar" class="w-64 bg-gradient-to-b from-cyan-900 to-cyan-800 text-white flex-shrink-0 shadow-xl relative">
    <div class="p-6 border-b border-cyan-700">
      <div class="flex items-center space-x-3">
        <img src="/iconoferre.png" alt="Ferrepoco" class="w-8 h-8 rounded-lg object-cover" />
        <h2 class="text-lg font-heading font-semibold">Navegación</h2>
      </div>
    </div>
    
  <nav class="mt-6 px-4 pb-16 overflow-y-auto">
      <div class="space-y-2">
        <!-- Dashboard Links -->
        <router-link 
          v-if="auth.userRole==='admin'" 
          to="/admin" 
          class="flex items-center space-x-3 py-3 px-4 rounded-lg hover:bg-white hover:bg-opacity-10 transition-all duration-200 group" 
          active-class="bg-white bg-opacity-20 text-white"
        >
          <svg class="w-5 h-5 text-cyan-300 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
          </svg>
          <span class="font-medium">Panel Admin</span>
        </router-link>
        
        <router-link 
          v-if="auth.userRole==='employee'" 
          to="/employee" 
          class="flex items-center space-x-3 py-3 px-4 rounded-lg hover:bg-white hover:bg-opacity-10 transition-all duration-200 group" 
          active-class="bg-white bg-opacity-20 text-white"
        >
          <svg class="w-5 h-5 text-cyan-300 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0H8m8 0v2a2 2 0 01-2 2H10a2 2 0 01-2-2V6m8 0H8"></path>
          </svg>
          <span class="font-medium">Panel Empleado</span>
        </router-link>
        
        <router-link 
          v-if="auth.userRole==='client'" 
          to="/client" 
          class="flex items-center space-x-3 py-3 px-4 rounded-lg hover:bg-white hover:bg-opacity-10 transition-all duration-200 group" 
          active-class="bg-white bg-opacity-20 text-white"
        >
          <svg class="w-5 h-5 text-cyan-300 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
          </svg>
          <span class="font-medium">Panel Cliente</span>
        </router-link>
        
        <!-- Divider -->
        <div v-if="auth.userRole==='admin' || auth.userRole==='employee'" class="border-t border-cyan-700 my-4"></div>
        
        <!-- Management Links -->
        <router-link 
          v-if="auth.userRole==='admin' || auth.userRole==='employee'" 
          to="/products" 
          class="flex items-center space-x-3 py-3 px-4 rounded-lg hover:bg-white hover:bg-opacity-10 transition-all duration-200 group" 
          active-class="bg-white bg-opacity-20 text-white"
        >
          <svg class="w-5 h-5 text-cyan-300 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
          </svg>
          <span class="font-medium">Productos</span>
        </router-link>
        
        <router-link 
          v-if="auth.userRole==='admin' || auth.userRole==='employee'" 
          to="/orders" 
          class="flex items-center space-x-3 py-3 px-4 rounded-lg hover:bg-white hover:bg-opacity-10 transition-all duration-200 group" 
          active-class="bg-white bg-opacity-20 text-white"
        >
          <svg class="w-5 h-5 text-cyan-300 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
          </svg>
          <span class="font-medium">Pedidos</span>
        </router-link>
        
        <router-link 
          v-if="auth.userRole==='admin'" 
          to="/admin/users" 
          class="flex items-center space-x-3 py-3 px-4 rounded-lg hover:bg-white hover:bg-opacity-10 transition-all duration-200 group" 
          active-class="bg-white bg-opacity-20 text-white"
        >
          <svg class="w-5 h-5 text-cyan-300 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path>
          </svg>
          <span class="font-medium">Usuarios</span>
        </router-link>
      </div>
    </nav>
    
  <div class="absolute bottom-0 left-0 right-0 p-4 border-t border-cyan-700 bg-cyan-900/80 backdrop-blur">
      <div class="flex items-center space-x-3 text-sm">
        <div class="w-2 h-2 bg-green-400 rounded-full"></div>
        <span class="text-cyan-200">Sistema Activo</span>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { useAuthStore } from '../../stores/auth';
import { onMounted, computed } from 'vue';

const auth = useAuthStore();

// Initialize auth on component mount instead of conditionally
onMounted(() => {
  auth.initializeAuth();
});

// Show sidebar only if NOT a client
const showSidebar = computed(() => auth.userRole !== 'client');
</script>