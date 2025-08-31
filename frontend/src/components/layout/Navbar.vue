<template>
  <header class="bg-white shadow-lg border-b border-neutral-200">
    <div class="container mx-auto px-6 py-4">
      <div class="flex items-center justify-between">
         Updated logo with better typography and icon 
        <div class="flex items-center space-x-3">
          <div class="w-10 h-10 bg-gradient-to-br from-cyan-800 to-cyan-600 rounded-lg flex items-center justify-center">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path>
            </svg>
          </div>
          <div>
            <h1 class="text-2xl font-heading font-bold text-cyan-800">Ferrepoco</h1>
            <p class="text-xs text-neutral-500 font-body">Sistema de Gestión</p>
          </div>
        </div>
        
         Enhanced user profile section 
        <div class="flex items-center space-x-4">
           Notifications 
          <button class="relative p-2 text-neutral-600 hover:text-cyan-800 hover:bg-neutral-100 rounded-lg transition-colors duration-200">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-5 5v-5zM10.07 2.82l3.12 3.12c.944.944.944 2.475 0 3.419L8.5 14.04a1 1 0 01-.707.293H6v-1.793c0-.265.105-.52.293-.707l4.69-4.69c.944-.944 2.475-.944 3.419 0z"></path>
            </svg>
            <span class="absolute -top-1 -right-1 w-3 h-3 bg-orange-500 rounded-full"></span>
          </button>
          
          <UserProfileBadge />
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import UserProfileBadge from '../UserProfileBadge.vue';
</script>
