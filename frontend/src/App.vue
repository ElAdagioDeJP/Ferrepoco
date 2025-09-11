<template>
<<<<<<< HEAD
<<<<<<< HEAD
  <div id="app" class="h-full">
    <router-view v-if="isAuthRoute" />
    <AppLayout v-else />
  </div>
</template>

<script>
=======
=======
>>>>>>> unificado
  <div id="app" class="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100">
    <!-- Updated to use new design system colors and fixed router logic -->
    <router-view v-if="isAuthRoute" />
    <AppLayout v-else>
      <router-view />
    </AppLayout>
  </div>
</template>

<script setup>
<<<<<<< HEAD
>>>>>>> unificado
=======
>>>>>>> unificado
import { computed } from 'vue';
import { useAuthStore } from './stores/auth';
import { useRouter, useRoute } from 'vue-router';
import AppLayout from './components/layout/AppLayout.vue';

<<<<<<< HEAD
<<<<<<< HEAD
export default {
  components: { AppLayout },
  setup() {
    const authStore = useAuthStore();
    const router = useRouter();
    const route = useRoute();

    const logout = () => {
      authStore.logout();
      router.push('/');
    };

    const isAuthRoute = computed(() => ['/', '/register'].includes(route.path));

    return {
      authStore,
      logout,
      isAuthRoute
    };
  }
};
</script>

<style>
/* Global styles can remain minimal; layout handles most styling */
</style>
=======
=======
>>>>>>> unificado
const authStore = useAuthStore();
const router = useRouter();
const route = useRoute();

authStore.initializeAuth();

const logout = () => {
  authStore.logout();
  router.push('/login');
};

<<<<<<< HEAD
const isAuthRoute = computed(() => ['Login', 'Register'].includes(route.name));
=======
// Rutas "públicas" que no deben mostrar el layout (sin sidebar/navbar principal)
const isAuthRoute = computed(() => [
  'Login','Register','Terminos','ForgotPassword','ResetPassword','FAQs','ManualUsuario'
].includes(route.name));
>>>>>>> unificado

const { isAuthenticated, userRole } = authStore;
</script>

<style>
/* Global styles are handled by main.css */
</style>
<<<<<<< HEAD
>>>>>>> unificado
=======
>>>>>>> unificado
