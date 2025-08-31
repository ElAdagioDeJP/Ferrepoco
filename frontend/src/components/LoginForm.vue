<template>
  <div class="min-h-screen bg-gradient-to-br from-cyan-50 via-neutral-50 to-orange-50 flex items-center justify-center p-4">
    <div class="w-full max-w-md">
      <div class="bg-white border border-neutral-200 rounded-xl shadow-lg p-8">
        <div class="text-center mb-8">
          <div class="inline-flex items-center justify-center w-16 h-16 bg-cyan-100 rounded-full mb-4">
            <svg class="w-8 h-8 text-cyan-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"/>
            </svg>
          </div>
          <h1 class="font-heading text-2xl font-bold text-neutral-900 mb-2">Ferrepoco</h1>
          <p class="text-neutral-600 font-body">Inicia sesión en tu cuenta</p>
        </div>

        <form @submit.prevent="handleSubmit" class="space-y-6">
          <div class="space-y-4">
            <div>
              <label for="username" class="block text-sm font-medium text-neutral-700 mb-2 font-body">
                Correo electrónico
              </label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg class="h-5 w-5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"/>
                  </svg>
                </div>
                <input 
                  type="email" 
                  id="username" 
                  v-model="username" 
                  required
                  class="w-full pl-10 pr-4 py-3 bg-white border border-neutral-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-colors text-neutral-900 placeholder-neutral-400 font-body"
                  placeholder="tu@email.com"
                >
              </div>
            </div>

            <div>
              <label for="password" class="block text-sm font-medium text-neutral-700 mb-2 font-body">
                Contraseña
              </label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg class="h-5 w-5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                  </svg>
                </div>
                <input 
                  :type="showPassword ? 'text' : 'password'" 
                  id="password" 
                  v-model="password" 
                  required
                  class="w-full pl-10 pr-12 py-3 bg-white border border-neutral-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-colors text-neutral-900 placeholder-neutral-400 font-body"
                  placeholder="••••••••"
                >
                <button 
                  type="button" 
                  @click="showPassword = !showPassword"
                  class="absolute inset-y-0 right-0 pr-3 flex items-center text-neutral-400 hover:text-neutral-700 transition-colors"
                >
                  <svg v-if="!showPassword" class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                  </svg>
                  <svg v-else class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <div v-if="errorMessage" class="bg-red-50 border border-red-200 rounded-lg p-3">
            <div class="flex items-center gap-2">
              <svg class="h-5 w-5 text-red-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              <p class="text-sm text-red-800 font-body">{{ errorMessage }}</p>
            </div>
          </div>

          <button 
            type="submit" 
            :disabled="loading"
            class="w-full bg-cyan-800 hover:bg-cyan-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium py-3 px-4 rounded-lg transition-colors focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 font-body"
          >
            <span v-if="!loading">Iniciar Sesión</span>
            <div v-else class="flex items-center justify-center gap-2">
              <svg class="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Iniciando sesión...
            </div>
          </button>

          <div class="text-center">
            <p class="text-sm text-neutral-600 font-body">
              ¿No tienes cuenta? 
              <router-link to="/register" class="text-cyan-800 hover:text-cyan-700 font-medium transition-colors">
                Regístrate aquí
              </router-link>
            </p>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import apiClient from '../api/apiClient';
import { useAuthStore } from '../stores/auth';
import { useRouter } from 'vue-router';

const username = ref('');
const password = ref('');
const errorMessage = ref('');
const loading = ref(false);
const showPassword = ref(false);
const authStore = useAuthStore();
const router = useRouter();

const handleSubmit = async () => {
  errorMessage.value = '';
  loading.value = true;
  
  try {
    const response = await apiClient.post('/auth/login', {
      username: username.value,
      password: password.value
    });
    const user = response.data.user;
    authStore.login(user, user.role);

    if (user.role === 'admin') {
      router.push('/admin');
    } else if (user.role === 'employee') {
      router.push('/employee');
    } else if (user.role === 'client') {
      router.push('/client');
    } else {
      errorMessage.value = 'Rol de usuario no reconocido.';
    }

  } catch (error) {
    errorMessage.value = error.response?.data?.message || 'Error al iniciar sesión. Verifica tus credenciales.';
    console.error('Login error:', error);
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.font-heading {
  font-family: 'Montserrat', sans-serif;
}

.font-body {
  font-family: 'Open Sans', sans-serif;
}
</style>