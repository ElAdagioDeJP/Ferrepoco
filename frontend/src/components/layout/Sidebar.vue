<template>
  <aside class="w-64 bg-gray-800 text-white flex-shrink-0">
    <div class="p-4">
      <h2 class="text-lg font-semibold">Menú</h2>
      <nav class="mt-4">
  <router-link v-if="auth.userRole==='admin'" to="/admin" class="block py-2 px-4 rounded hover:bg-gray-700" active-class="bg-gray-700">Admin</router-link>
  <router-link v-if="auth.userRole==='employee'" to="/employee" class="block py-2 px-4 rounded hover:bg-gray-700" active-class="bg-gray-700">Empleado</router-link>
  <router-link v-if="auth.userRole==='client'" to="/client" class="block py-2 px-4 rounded hover:bg-gray-700" active-class="bg-gray-700">Cliente</router-link>
  <router-link v-if="auth.userRole==='admin' || auth.userRole==='employee'" to="/products" class="block py-2 px-4 rounded hover:bg-gray-700" active-class="bg-gray-700">Productos</router-link>
  <router-link v-if="auth.userRole==='admin' || auth.userRole==='employee'" to="/orders" class="block py-2 px-4 rounded hover:bg-gray-700" active-class="bg-gray-700">Pedidos</router-link>
  <router-link v-if="auth.userRole==='admin'" to="/admin/users" class="block py-2 px-4 rounded hover:bg-gray-700" active-class="bg-gray-700">Usuarios</router-link>
      </nav>
    </div>
  </aside>
</template>

<script setup>
import { useAuthStore } from '../../stores/auth';
const auth = useAuthStore();
auth.initializeAuth();
</script>
