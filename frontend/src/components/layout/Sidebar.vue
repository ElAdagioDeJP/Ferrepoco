<template>
  <aside class="w-64 bg-gray-800 text-white flex-shrink-0">
    <div class="p-4">
      <h2 class="text-lg font-semibold">Menú</h2>
      <nav class="mt-4">
        <router-link to="/dashboard" class="block py-2 px-4 rounded hover:bg-gray-700">Dashboard</router-link>
        <router-link to="/products" class="block py-2 px-4 rounded hover:bg-gray-700">Productos</router-link>
        <router-link to="/orders" class="block py-2 px-4 rounded hover:bg-gray-700">Pedidos</router-link>
      </nav>
    </div>
  </aside>
</template>

<script setup>
</script>
