<template>
  <div class="container mx-auto p-4 max-w-3xl">
    <h2 class="text-2xl font-bold mb-6">Mi Panel</h2>

    <div class="bg-white rounded-lg shadow border p-6 space-y-8">
      <!-- Avatar -->
      <section class="flex items-center gap-6">
        <img :src="avatarPreview || userAvatar || placeholder" class="w-24 h-24 rounded-full object-cover border" alt="avatar" />
        <div>
          <input ref="fileInput" type="file" accept="image/*" class="hidden" @change="onFileChange" />
          <button @click="fileInput.click()" class="px-4 py-2 bg-neutral-100 hover:bg-neutral-200 rounded">Seleccionar foto</button>
          <button v-if="selectedFile" @click="uploadPhoto" class="ml-2 px-4 py-2 bg-cyan-600 text-white rounded hover:bg-cyan-700">Guardar foto</button>
        </div>
      </section>

      <!-- Datos personales -->
      <section>
        <h3 class="font-semibold mb-3">Datos personales</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label for="nombre" class="block text-sm text-neutral-600 mb-1">Nombre</label>
            <input id="nombre" v-model="form.nombre" class="w-full border rounded px-3 py-2" placeholder="Nombre" />
          </div>
          <div>
            <label for="apellido" class="block text-sm text-neutral-600 mb-1">Apellido</label>
            <input id="apellido" v-model="form.apellido" class="w-full border rounded px-3 py-2" placeholder="Apellido" />
          </div>
        </div>
        <div class="mt-4">
          <button @click="saveProfile" class="px-4 py-2 bg-cyan-600 text-white rounded hover:bg-cyan-700" :disabled="saving">
            {{ saving ? 'Guardando...' : 'Guardar cambios' }}
          </button>
        </div>
      </section>

      <!-- Cambiar contraseña -->
      <section>
        <h3 class="font-semibold mb-3">Cambiar contraseña</h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label for="pwdActual" class="block text-sm text-neutral-600 mb-1">Actual</label>
            <input id="pwdActual" v-model="pwd.current" type="password" class="w-full border rounded px-3 py-2" />
          </div>
          <div>
            <label for="pwdNueva" class="block text-sm text-neutral-600 mb-1">Nueva</label>
            <input id="pwdNueva" v-model="pwd.next" type="password" class="w-full border rounded px-3 py-2" />
          </div>
          <div>
            <label for="pwdConfirm" class="block text-sm text-neutral-600 mb-1">Repetir</label>
            <input id="pwdConfirm" v-model="pwd.confirm" type="password" class="w-full border rounded px-3 py-2" />
          </div>
        </div>
        <div class="mt-4">
          <button @click="changePassword" class="px-4 py-2 bg-neutral-800 text-white rounded hover:bg-black" :disabled="changingPwd">
            {{ changingPwd ? 'Actualizando...' : 'Actualizar contraseña' }}
          </button>
        </div>
      </section>
    </div>
  </div>
  </template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import apiClient from '../api/apiClient';
import { useAuthStore } from '../stores/auth';

const auth = useAuthStore();
auth.initializeAuth();

const placeholder = '/placeholder.svg';
const userAvatar = computed(() => auth.user?.imagen_url || null);

const form = ref({ nombre: auth.user?.nombre || '', apellido: auth.user?.apellido || '' });
const saving = ref(false);
const pwd = ref({ current: '', next: '', confirm: '' });
const changingPwd = ref(false);

const fileInput = ref(null);
const selectedFile = ref(null);
const avatarPreview = ref(null);

function onFileChange(e) {
  const f = e.target.files?.[0];
  selectedFile.value = f || null;
  if (f) {
    const reader = new FileReader();
    reader.onload = () => avatarPreview.value = reader.result;
    reader.readAsDataURL(f);
  } else {
    avatarPreview.value = null;
  }
}

async function uploadPhoto() {
  if (!selectedFile.value) return;
  const fd = new FormData();
  fd.append('photo', selectedFile.value);
  try {
    const res = await apiClient.post('/users/me/photo', fd, { headers: { 'Content-Type': 'multipart/form-data' } });
    const url = res.data?.imagen_url;
    if (url) auth.setAvatar(url);
    selectedFile.value = null;
    avatarPreview.value = null;
  } catch (e) {
    console.error(e);
  }
}

async function saveProfile() {
  saving.value = true;
  try {
    await apiClient.put('/users/me', { nombre: form.value.nombre, apellido: form.value.apellido });
    await auth.refreshMe();
  } catch (e) {
    console.error(e);
  } finally {
    saving.value = false;
  }
}

async function changePassword() {
  if (!pwd.value.current || !pwd.value.next || pwd.value.next !== pwd.value.confirm) return;
  changingPwd.value = true;
  try {
    await apiClient.put('/users/me/password', { currentPassword: pwd.value.current, newPassword: pwd.value.next });
    pwd.value = { current: '', next: '', confirm: '' };
  } catch (e) {
    console.error(e);
  } finally {
    changingPwd.value = false;
  }
}

onMounted(async () => {
  await auth.refreshMe();
  form.value.nombre = auth.user?.nombre || '';
  form.value.apellido = auth.user?.apellido || '';
});
</script>


