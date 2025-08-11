<template>
  <header class="bg-white shadow-md">
    <div class="container mx-auto px-6 py-4">
      <div class="flex items-center justify-between">
        <h1 class="text-xl font-semibold text-gray-700">Ferrepoco</h1>
        <UserProfileBadge />
      </div>
    </div>
  </header>
</template>

<script setup>
import UserProfileBadge from '../UserProfileBadge.vue';
</script>
