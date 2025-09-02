<<<<<<< HEAD
=======
<template>
  <div class="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 flex items-center justify-center p-4">
    <div class="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-0 bg-card border border-border rounded-2xl shadow-xl overflow-hidden">
      <div class="relative hidden lg:flex flex-col justify-between p-10 text-card-foreground bg-gradient-to-br from-primary via-primary/90 to-primary/80">
        <div>
          <div class="flex items-center gap-3 mb-10">
            <div class="w-12 h-12 bg-primary-foreground/20 rounded-xl flex items-center justify-center">
              <svg class="w-7 h-7 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 7.172V5L8 4z"/>
              </svg>
            </div>
            <h2 class="font-heading text-3xl font-bold text-primary-foreground">Ferrepoco</h2>
          </div>
          
          <div class="space-y-6">
            <h1 class="font-heading text-4xl font-bold leading-tight text-primary-foreground">
              Crear Cuenta de Cliente
            </h1>
            <p class="text-lg text-primary-foreground/90 leading-relaxed">
              Únete para gestionar tus pedidos, guardar productos y recibir atención personalizada.
            </p>
          </div>
        </div>
        
        <div class="space-y-4">
          <h3 class="font-heading text-lg font-semibold text-primary-foreground mb-4">Beneficios de registrarte:</h3>
          <ul class="space-y-3 text-primary-foreground/90">
            <li class="flex items-center gap-3">
              <div class="w-6 h-6 bg-secondary/20 rounded-full flex items-center justify-center">
                <svg class="w-4 h-4 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                </svg>
              </div>
              <span>Compras seguras y protegidas</span>
            </li>
            <li class="flex items-center gap-3">
              <div class="w-6 h-6 bg-secondary/20 rounded-full flex items-center justify-center">
                <svg class="w-4 h-4 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                </svg>
              </div>
              <span>Historial y seguimiento de pedidos</span>
            </li>
            <li class="flex items-center gap-3">
              <div class="w-6 h-6 bg-secondary/20 rounded-full flex items-center justify-center">
                <svg class="w-4 h-4 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                </svg>
              </div>
              <span>Ofertas exclusivas y novedades</span>
            </li>
          </ul>
        </div>
      </div>

      <div class="p-6 sm:p-8 lg:p-10 bg-background">
        <div class="mb-6">
          <h2 class="font-heading text-2xl font-bold text-foreground lg:hidden">Crear cuenta de cliente</h2>
          <p class="text-sm text-muted-foreground lg:hidden">Regístrate para acceder a Ferrepoco</p>
        </div>

        <form @submit.prevent="register" class="space-y-5">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label for="reg-nombre" class="block text-sm font-medium text-foreground mb-1">Nombre</label>
              <div class="relative">
                <span class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M10 10a4 4 0 1 0-4-4 4 4 0 0 0 4 4Zm-7 8a7 7 0 1 1 14 0H3Z"/></svg>
                </span>
                <input id="reg-nombre" v-model="form.nombre" class="h-11 w-full border border-border rounded-lg pl-11 pr-3 bg-input focus:ring-2 focus:ring-ring focus:border-primary outline-none text-foreground" />
              </div>
            </div>
            <div>
              <label for="reg-apellido" class="block text-sm font-medium text-foreground mb-1">Apellido</label>
              <div class="relative">
                <span class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M10 10a4 4 0 1 0-4-4 4 4 0 0 0 4 4Zm-7 8a7 7 0 1 1 14 0H3Z"/></svg>
                </span>
                <input id="reg-apellido" v-model="form.apellido" class="h-11 w-full border border-border rounded-lg pl-11 pr-3 bg-input focus:ring-2 focus:ring-ring focus:border-primary outline-none text-foreground" />
              </div>
            </div>
          </div>

          <div>
            <label for="reg-email" class="block text-sm font-medium text-foreground mb-1">Correo electrónico</label>
            <div class="relative">
              <span class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M2.25 6.75A2.25 2.25 0 0 1 4.5 4.5h15a2.25 2.25 0 0 1 2.25 2.25v10.5A2.25 2.25 0 0 1 19.5 19.5h-15A2.25 2.25 0 0 1 2.25 17.25V6.75Zm2.818-.75l6.432 5.144a.75.75 0 0 0 .96 0L18.892 6h-13.824Z"/></svg>
              </span>
              <input id="reg-email" type="email" v-model="form.correo_electronico" class="h-11 w-full border border-border rounded-lg pl-11 pr-3 bg-input focus:ring-2 focus:ring-ring focus:border-primary outline-none text-foreground" required />
            </div>
            <p class="mt-1 text-xs text-muted-foreground">No compartiremos tu correo. Solo lo usaremos para tu cuenta y notificaciones.</p>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div>
              <label for="reg-pass" class="block text-sm font-medium text-foreground mb-1">Contraseña</label>
              <div class="relative">
                <span class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a5 5 0 0 1 5 5v3h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h1V7a5 5 0 0 1 5-5Zm3 8V7a3 3 0 1 0-6 0v3h6Z"/></svg>
                </span>
                <input :type="showPass ? 'text' : 'password'" id="reg-pass" v-model="form.password" minlength="6" class="h-11 w-full border border-border rounded-lg pl-11 pr-10 bg-input focus:ring-2 focus:ring-ring focus:border-primary outline-none text-foreground" required />
                <button type="button" class="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground" @click="showPass = !showPass" aria-label="Mostrar u ocultar contraseña">
                  <svg v-if="!showPass" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12Z"/><circle cx="12" cy="12" r="3"/></svg>
                  <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17.94 17.94A10.94 10.94 0 0 1 12 20C5 20 1 12 1 12a21.81 21.81 0 0 1 5.06-6.94M9.9 4.24A10.94 10.94 0 0 1 12 4c7 0 11 8 11 8a21.72 21.72 0 0 1-5.06 6.94M1 1l22 22"/></svg>
                </button>
              </div>

              <div class="mt-2">
                <div class="flex gap-1" aria-hidden="true">
                  <span v-for="i in 5" :key="i" class="h-1.5 flex-1 rounded-full" :class="i <= strengthScore ? strengthColor : 'bg-muted'"></span>
                </div>
                <div class="mt-1 flex items-center justify-between text-xs text-muted-foreground">
                  <span>Fuerza: <strong :class="{'text-destructive': strengthScore<=1, 'text-secondary': strengthScore===2, 'text-accent': strengthScore===3, 'text-primary': strengthScore>=4}">{{ strengthLabel }}</strong></span>
                </div>
                <ul class="mt-2 grid grid-cols-2 gap-1 text-xs text-muted-foreground">
                  <li class="flex items-center gap-1" :class="passwordChecks.length ? 'text-primary' : ''">• 8+ caracteres</li>
                  <li class="flex items-center gap-1" :class="passwordChecks.number ? 'text-primary' : ''">• Número</li>
                  <li class="flex items-center gap-1" :class="passwordChecks.upper ? 'text-primary' : ''">• Mayúscula</li>
                  <li class="flex items-center gap-1" :class="passwordChecks.symbol ? 'text-primary' : ''">• Símbolo</li>
                </ul>
              </div>
            </div>

            <div>
              <label for="reg-pass2" class="block text-sm font-medium text-foreground mb-1">Confirmar contraseña</label>
              <div class="relative">
                <span class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M10 10a4 4 0 1 0-4-4 4 4 0 0 0 4 4Zm-7 8a7 7 0 1 1 14 0H3Z"/></svg>
                </span>
                <input :type="showPass2 ? 'text' : 'password'" id="reg-pass2" v-model="form.confirm" minlength="6" class="h-11 w-full border border-border rounded-lg pl-11 pr-10 bg-input focus:ring-2 focus:ring-ring focus:border-primary outline-none text-foreground" required />
                <button type="button" class="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground" @click="showPass2 = !showPass2" aria-label="Mostrar u ocultar confirmación">
                  <svg v-if="!showPass2" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12Z"/><circle cx="12" cy="12" r="3"/></svg>
                  <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17.94 17.94A10.94 10.94 0 0 1 12 20C5 20 1 12 1 12a21.81 21.81 0 0 1 5.06-6.94M9.9 4.24A10.94 10.94 0 0 1 12 4c7 0 11 8 11 8a21.72 21.72 0 0 1-5.06 6.94M1 1l22 22"/></svg>
                </button>
              </div>
              <p v-if="form.password && form.confirm && form.password !== form.confirm" class="mt-2 text-xs text-destructive">Las contraseñas no coinciden</p>
            </div>
          </div>

          <div v-if="error" class="rounded-lg border border-destructive/20 bg-destructive/10 text-destructive px-4 py-2 text-sm">{{ error }}</div>

          <button :disabled="loading || !canSubmit" type="submit" class="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-5 py-3 shadow-md focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
            <svg v-if="!loading" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
            </svg>
            <svg v-else class="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
            {{ loading ? 'Creando cuenta...' : 'Crear cuenta' }}
          </button>

          <p class="text-center text-sm text-muted-foreground">
            ¿Ya tienes cuenta?
            <RouterLink to="/" class="text-primary hover:text-primary/80 font-medium transition-colors">Inicia sesión</RouterLink>
          </p>
        </form>
      </div>
    </div>
  </div>
</template>

>>>>>>> unificado
<script setup>
import { ref, computed } from 'vue';
import { useRouter, RouterLink } from 'vue-router';
import apiClient from '../api/apiClient';
import { useAuthStore } from '../stores/auth';

<<<<<<< HEAD
// Estado del formulario
=======
>>>>>>> unificado
const form = ref({ nombre: '', apellido: '', correo_electronico: '', password: '', confirm: '' });
const loading = ref(false);
const error = ref('');
const showPass = ref(false);
const showPass2 = ref(false);
const router = useRouter();
const auth = useAuthStore();

<<<<<<< HEAD
// Validaciones básicas
=======
>>>>>>> unificado
const passwordChecks = computed(() => {
  const v = form.value.password || '';
  return {
    length: v.length >= 8,
    lower: /[a-z]/.test(v),
    upper: /[A-Z]/.test(v),
    number: /\d/.test(v),
    symbol: /[^A-Za-z0-9]/.test(v)
  };
});

const strengthScore = computed(() => Object.values(passwordChecks.value).filter(Boolean).length);
const strengthLabel = computed(() => {
  const s = strengthScore.value;
  return ['Muy débil', 'Débil', 'Aceptable', 'Fuerte', 'Muy fuerte'][s] || 'Muy débil';
});
const strengthColor = computed(() => {
  const s = strengthScore.value;
<<<<<<< HEAD
  return s <= 1 ? 'bg-red-500' : s === 2 ? 'bg-amber-500' : s === 3 ? 'bg-yellow-500' : s === 4 ? 'bg-emerald-500' : 'bg-emerald-600';
=======
  return s <= 1 ? 'bg-destructive' : s === 2 ? 'bg-secondary' : s === 3 ? 'bg-accent' : s === 4 ? 'bg-primary' : 'bg-primary';
>>>>>>> unificado
});

const canSubmit = computed(() => {
  const f = form.value;
<<<<<<< HEAD
  // Permitir registro solo con correo y contraseñas válidas (nombre opcional)
=======
>>>>>>> unificado
  return !!f.correo_electronico?.trim() && (f.password?.length >= 6) && f.password === f.confirm;
});

async function register() {
  error.value = '';
  if (!canSubmit.value) {
    error.value = 'Verifica los campos del formulario';
    return;
  }
  loading.value = true;
  try {
<<<<<<< HEAD
    // Crear siempre un cliente desde la UI pública
    const payload = { username: form.value.correo_electronico, password: form.value.password, role: 'client' };
=======
    const payload = { username: form.value.correo_electronico, password: form.value.password, role: 'client', nombre: form.value.nombre, apellido: form.value.apellido };
>>>>>>> unificado
    const { data } = await apiClient.post('/auth/register', payload);
    const user = data.user || { username: payload.username, role: 'client' };
    user.nombre = form.value.nombre;
    user.apellido = form.value.apellido;

<<<<<<< HEAD
    // Auto-login
=======
>>>>>>> unificado
    const loginRes = await apiClient.post('/auth/login', { username: user.username, password: form.value.password });
    const loggedUser = loginRes.data.user || { ...user };
    loggedUser.nombre = user.nombre;
    loggedUser.apellido = user.apellido;
    auth.login(loggedUser);
    router.push(`/${(loggedUser.role || 'client').toLowerCase()}`);
  } catch (e) {
    error.value = e?.response?.data?.message || 'Error al registrar';
  } finally {
    loading.value = false;
  }
}
</script>
<<<<<<< HEAD

<template>
  <!-- Fondo con gradiente profesional azul/gris -->
  <div class="reg-root text-left min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
    <div class="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-0 bg-white/5 rounded-2xl shadow-2xl ring-1 ring-white/10 overflow-hidden">
      <!-- Panel de marca -->
      <div class="relative hidden lg:flex flex-col justify-between p-10 text-white bg-gradient-to-br from-blue-700 via-blue-600 to-blue-500">
        <div>
          <div class="flex items-center gap-3">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-8 h-8"><path d="M12 2a1 1 0 0 1 .894.553l2.764 5.528 6.103.887a1 1 0 0 1 .554 1.705l-4.418 4.306 1.043 6.08a1 1 0 0 1-1.451 1.054L12 19.771l-5.489 2.882a1 1 0 0 1-1.451-1.054l1.043-6.08-4.418-4.306A1 1 0 0 1 1.239 8.97l6.103-.888L10.106 2.553A1 1 0 0 1 12 2Z"/></svg>
            <h2 class="text-2xl font-bold tracking-tight">Ferrepoco</h2>
          </div>
          <h1 class="mt-10 text-4xl font-extrabold leading-tight">Crear cuenta de cliente</h1>
          <p class="mt-3 text-blue-100/90">Únete para gestionar tus pedidos, guardar productos y recibir atención personalizada.</p>
        </div>
        <ul class="space-y-3 text-blue-50/90">
          <li class="flex items-center gap-3"><span class="inline-flex items-center justify-center w-6 h-6 rounded-full bg-white/20">✓</span> Compras seguras</li>
          <li class="flex items-center gap-3"><span class="inline-flex items-center justify-center w-6 h-6 rounded-full bg-white/20">✓</span> Historial y seguimiento</li>
          <li class="flex items-center gap-3"><span class="inline-flex items-center justify-center w-6 h-6 rounded-full bg-white/20">✓</span> Ofertas y novedades</li>
        </ul>
      </div>

      <!-- Panel de formulario -->
      <div class="p-6 sm:p-8 lg:p-10 bg-white">
        <div class="mb-6">
          <h2 class="text-2xl font-bold text-slate-900 lg:hidden">Crear cuenta de cliente</h2>
          <p class="text-sm text-slate-500 lg:hidden">Regístrate para acceder a Ferrepoco</p>
        </div>

        <form @submit.prevent="register" class="space-y-5">
          <!-- Nombre y Apellido -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label for="reg-nombre" class="block text-sm font-medium text-slate-700 mb-1">Nombre</label>
              <div class="relative">
                <span class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                  <!-- user icon -->
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M10 10a4 4 0 1 0-4-4 4 4 0 0 0 4 4Zm-7 8a7 7 0 1 1 14 0H3Z"/></svg>
                </span>
                <input id="reg-nombre" v-model="form.nombre" class="h-11 w-full border border-slate-300 rounded-lg pl-11 pr-3 focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none" />
              </div>
            </div>
            <div>
              <label for="reg-apellido" class="block text-sm font-medium text-slate-700 mb-1">Apellido</label>
              <div class="relative">
                <span class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M10 10a4 4 0 1 0-4-4 4 4 0 0 0 4 4Zm-7 8a7 7 0 1 1 14 0H3Z"/></svg>
                </span>
                <input id="reg-apellido" v-model="form.apellido" class="h-11 w-full border border-slate-300 rounded-lg pl-11 pr-3 focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none" />
              </div>
            </div>
          </div>

          <!-- Email -->
          <div>
            <label for="reg-email" class="block text-sm font-medium text-slate-700 mb-1">Correo electrónico</label>
            <div class="relative">
              <span class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                <!-- mail icon -->
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M2.25 6.75A2.25 2.25 0 0 1 4.5 4.5h15a2.25 2.25 0 0 1 2.25 2.25v10.5A2.25 2.25 0 0 1 19.5 19.5h-15A2.25 2.25 0 0 1 2.25 17.25V6.75Zm2.818-.75l6.432 5.144a.75.75 0 0 0 .96 0L18.892 6h-13.824Z"/></svg>
              </span>
              <input id="reg-email" type="email" v-model="form.correo_electronico" class="h-11 w-full border border-slate-300 rounded-lg pl-11 pr-3 focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none" required />
            </div>
            <p class="mt-1 text-xs text-slate-500">No compartiremos tu correo. Solo lo usaremos para tu cuenta y notificaciones.</p>
          </div>

          <!-- Passwords -->
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div>
              <label for="reg-pass" class="block text-sm font-medium text-slate-700 mb-1">Contraseña</label>
              <div class="relative">
                <span class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                  <!-- lock icon -->
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a5 5 0 0 1 5 5v3h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h1V7a5 5 0 0 1 5-5Zm3 8V7a3 3 0 1 0-6 0v3h6Z"/></svg>
                </span>
                <input :type="showPass ? 'text' : 'password'" id="reg-pass" v-model="form.password" minlength="6" class="h-11 w-full border border-slate-300 rounded-lg pl-11 pr-10 focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none" required />
                <button type="button" class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700" @click="showPass = !showPass" aria-label="Mostrar u ocultar contraseña">
                  <!-- eye icon -->
                  <svg v-if="!showPass" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12Z"/><circle cx="12" cy="12" r="3"/></svg>
                  <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17.94 17.94A10.94 10.94 0 0 1 12 20C5 20 1 12 1 12a21.81 21.81 0 0 1 5.06-6.94M9.9 4.24A10.94 10.94 0 0 1 12 4c7 0 11 8 11 8a21.72 21.72 0 0 1-5.06 6.94M1 1l22 22"/></svg>
                </button>
              </div>

              <!-- Indicador de fuerza de contraseña -->
              <div class="mt-2">
                <div class="flex gap-1" aria-hidden="true">
                  <span v-for="i in 5" :key="i" class="h-1.5 flex-1 rounded-full" :class="i <= strengthScore ? strengthColor : 'bg-slate-200'"></span>
                </div>
                <div class="mt-1 flex items-center justify-between text-xs text-slate-500">
                  <span>Fuerza: <strong :class="{'text-red-600': strengthScore<=1, 'text-amber-600': strengthScore===2, 'text-yellow-700': strengthScore===3, 'text-emerald-600': strengthScore>=4}">{{ strengthLabel }}</strong></span>
                </div>
                <ul class="mt-2 grid grid-cols-2 gap-1 text-xs text-slate-500">
                  <li class="flex items-center gap-1" :class="passwordChecks.length ? 'text-emerald-600' : ''">• 8+ caracteres</li>
                  <li class="flex items-center gap-1" :class="passwordChecks.number ? 'text-emerald-600' : ''">• Número</li>
                  <li class="flex items-center gap-1" :class="passwordChecks.upper ? 'text-emerald-600' : ''">• Mayúscula</li>
                  <li class="flex items-center gap-1" :class="passwordChecks.symbol ? 'text-emerald-600' : ''">• Símbolo</li>
                </ul>
              </div>
            </div>

            <div>
              <label for="reg-pass2" class="block text-sm font-medium text-slate-700 mb-1">Confirmar contraseña</label>
              <div class="relative">
                <span class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a5 5 0 0 1 5 5v3h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h1V7a5 5 0 0 1 5-5Zm3 8V7a3 3 0 1 0-6 0v3h6Z"/></svg>
                </span>
                <input :type="showPass2 ? 'text' : 'password'" id="reg-pass2" v-model="form.confirm" minlength="6" class="h-11 w-full border border-slate-300 rounded-lg pl-11 pr-10 focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none" required />
                <button type="button" class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700" @click="showPass2 = !showPass2" aria-label="Mostrar u ocultar confirmación">
                  <svg v-if="!showPass2" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12Z"/><circle cx="12" cy="12" r="3"/></svg>
                  <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17.94 17.94A10.94 10.94 0 0 1 12 20C5 20 1 12 1 12a21.81 21.81 0 0 1 5.06-6.94M9.9 4.24A10.94 10.94 0 0 1 12 4c7 0 11 8 11 8a21.72 21.72 0 0 1-5.06 6.94M1 1l22 22"/></svg>
                </button>
              </div>
              <p v-if="form.password && form.confirm && form.password !== form.confirm" class="mt-2 text-xs text-red-600">Las contraseñas no coinciden</p>
            </div>
          </div>

          <!-- Errores globales -->
          <div v-if="error" class="rounded-lg border border-red-200 bg-red-50 text-red-700 px-4 py-2 text-sm">{{ error }}</div>

          <!-- CTA -->
          <button :disabled="loading || !canSubmit" type="submit" class="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold px-5 py-3 shadow-md hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-200 disabled:opacity-50 disabled:cursor-not-allowed transition">
            <svg v-if="!loading" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a1 1 0 0 1 .894.553l2.764 5.528 6.103.887a1 1 0 0 1 .554 1.705l-4.418 4.306 1.043 6.08a1 1 0 0 1-1.451 1.054L12 19.771l-5.489 2.882a1 1 0 0 1-1.451-1.054l1.043-6.08-4.418-4.306A1 1 0 0 1 1.239 8.97l6.103-.888L10.106 2.553A1 1 0 0 1 12 2Z"/></svg>
            <svg v-else class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path></svg>
            {{ loading ? 'Creando cuenta...' : 'Crear cuenta' }}
          </button>

          <p class="text-center text-sm text-slate-600">¿Ya tienes cuenta?
            <RouterLink to="/" class="text-blue-600 hover:text-blue-700 font-medium">Inicia sesión</RouterLink>
          </p>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Ajustes menores para suavizar esquinas y sombras */
.shadow-2xl { box-shadow: 0 25px 50px -12px rgba(0,0,0,0.35); }
</style>
=======
>>>>>>> unificado
