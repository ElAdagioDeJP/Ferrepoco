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

        <!-- Search -->
        <div class="col-span-12 md:col-span-5">
          <label class="relative block">
            <span class="absolute inset-y-0 left-0 pl-3 flex items-center text-neutral-400">
              <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-4.35-4.35M10 18a8 8 0 100-16 8 8 0 000 16z" />
              </svg>
            </span>
            <input type="search" placeholder="Buscar productos" class="w-full pl-10 pr-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent" />
          </label>
        </div>

        <!-- Actions -->
        <div class="col-span-12 md:col-span-3 flex items-center justify-end gap-2 md:gap-4">
          <button class="relative p-2 text-neutral-600 hover:text-cyan-800 hover:bg-neutral-100 rounded-lg transition-colors duration-200" aria-label="Notificaciones">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-5 5v-5zM10.07 2.82l3.12 3.12c.944.944.944 2.475 0 3.419L8.5 14.04a1 1 0 01-.707.293H6v-1.793c0-.265.105-.52.293-.707l4.69-4.69c.944-.944 2.475-.944 3.419 0z"></path>
            </svg>
            <span class="sr-only">Notificaciones</span>
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
