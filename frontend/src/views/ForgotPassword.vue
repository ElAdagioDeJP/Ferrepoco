<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-neutral-100 to-neutral-200 p-4">
    <div class="w-full max-w-md bg-white rounded-xl shadow-lg border border-neutral-200 p-8 space-y-6">
      <div class="text-center space-y-2">
        <h1 class="text-2xl font-heading font-bold text-neutral-800">Recuperar contraseña</h1>
        <p class="text-sm text-neutral-500">Ingresa tu correo y te enviaremos un enlace (simulado en logs del servidor)</p>
      </div>
      <form @submit.prevent="submit" class="space-y-4">
        <div>
          <label for="forgot-email" class="block text-sm font-medium text-neutral-700 mb-1">Correo</label>
          <input id="forgot-email" v-model="email" type="email" required class="w-full rounded-lg border border-neutral-300 px-3 py-2 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500" placeholder="tu@correo.com" />
        </div>
        <button :disabled="loading" class="w-full inline-flex justify-center items-center gap-2 bg-cyan-600 hover:bg-cyan-700 disabled:opacity-60 text-white font-medium px-4 py-2.5 rounded-lg transition-colors">
          <span v-if="!loading">Enviar instrucciones</span>
          <span v-else>Enviando...</span>
        </button>
      </form>
      <p v-if="message" class="text-sm text-green-600 text-center">{{ message }}</p>
      <p v-if="error" class="text-sm text-red-600 text-center">{{ error }}</p>
      <div class="text-center">
        <router-link to="/login" class="text-sm text-cyan-700 hover:underline">Volver al login</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import apiClient from '../api/apiClient';

const email = ref('');
const loading = ref(false);
const message = ref('');
const error = ref('');

async function submit(){
  loading.value = true; message.value = ''; error.value='';
  try {
    const res = await apiClient.post('/auth/forgot-password', { email: email.value });
    message.value = res.data?.message || 'Revisa tu correo';
  } catch (e) {
    error.value = e.response?.data?.message || 'Error';
  } finally { loading.value = false; }
}
</script>
