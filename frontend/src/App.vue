<template>
  <div id="app" class="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100">
    <!-- Updated to use new design system colors and fixed router logic -->
    <router-view v-if="isAuthRoute" />
    <AppLayout v-else>
      <router-view />
    </AppLayout>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useAuthStore } from './stores/auth';
import { useRouter, useRoute } from 'vue-router';
import AppLayout from './components/layout/AppLayout.vue';

const authStore = useAuthStore();
const router = useRouter();
const route = useRoute();

authStore.initializeAuth();

const logout = () => {
  authStore.logout();
  router.push('/login');
};

const isAuthRoute = computed(() => ['/login', '/register'].includes(route.path));

const { isAuthenticated, userRole } = authStore;
</script>

<style>
/* Global styles are handled by main.css */
</style>
