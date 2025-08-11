<template>
  <div id="app" class="h-full">
    <router-view v-if="isAuthRoute" />
    <AppLayout v-else />
  </div>
</template>

<script>
import { computed } from 'vue';
import { useAuthStore } from './stores/auth';
import { useRouter, useRoute } from 'vue-router';
import AppLayout from './components/layout/AppLayout.vue';

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