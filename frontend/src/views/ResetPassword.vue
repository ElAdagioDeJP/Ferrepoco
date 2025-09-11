<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-neutral-100 to-neutral-200 p-4">
    <div class="w-full max-w-md bg-white rounded-xl shadow-lg border border-neutral-200 p-8 space-y-6">
      <div class="text-center space-y-2">
        <h1 class="text-2xl font-heading font-bold text-neutral-800">Nueva contraseña</h1>
        <p class="text-sm text-neutral-500">Ingresa y confirma tu nueva contraseña</p>
      </div>
      <form @submit.prevent="submit" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-neutral-700 mb-1">Contraseña</label>
          <input v-model="password" type="password" minlength="6" required class="w-full rounded-lg border border-neutral-300 px-3 py-2 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500" placeholder="••••••" />
        </div>
        <div>
          <label class="block text-sm font-medium text-neutral-700 mb-1">Confirmar contraseña</label>
          <input v-model="confirm" type="password" minlength="6" required class="w-full rounded-lg border border-neutral-300 px-3 py-2 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500" placeholder="••••••" />
        </div>
        <button :disabled="loading" class="w-full inline-flex justify-center items-center gap-2 bg-cyan-600 hover:bg-cyan-700 disabled:opacity-60 text-white font-medium px-4 py-2.5 rounded-lg transition-colors">
          <span v-if="!loading">Guardar contraseña</span>
          <span v-else>Cambiando...</span>
        </button>
      </form>
      <p v-if="message" class="text-sm text-green-600 text-center">{{ message }}</p>
      <p v-if="error" class="text-sm text-red-600 text-center">{{ error }}</p>
      <div class="text-center">
        <router-link to="/login" class="text-sm text-cyan-700 hover:underline">Ir al login</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import apiClient from '../api/apiClient';

const route = useRoute();
const router = useRouter();
const token = route.params.token;
const password = ref('');
const confirm = ref('');
const loading = ref(false);
const message = ref('');
const error = ref('');

async function submit(){
  if(password.value !== confirm.value){
    error.value = 'Las contraseñas no coinciden';
    return;
  }
  loading.value = true; message.value=''; error.value='';
  try {
    const res = await apiClient.post('/auth/reset-password', { token, password: password.value });
    message.value = res.data?.message || 'Contraseña actualizada';
    setTimeout(()=> router.push('/login'), 1800);
  } catch (e) {
    error.value = e.response?.data?.message || 'Error';
  } finally { loading.value = false; }
}
</script>
