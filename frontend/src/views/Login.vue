<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';
import axios from 'axios';

const email = ref('');
const password = ref('');
const rememberMe = ref(false);
const error = ref('');
const loading = ref(false);
const router = useRouter();
const authStore = useAuthStore();

const handleLogin = async () => {
  error.value = '';
  loading.value = true;
  try {
    const response = await axios.post('/api/auth/login', {
      username: email.value,
      password: password.value
    });
    // Use only the user object from the backend response
    const user = response.data.user;
    if (!user) {
      error.value = 'Respuesta inválida del servidor';
      return;
    }
    await authStore.login(user);
    if (rememberMe.value) {
      localStorage.setItem('rememberMe', 'true');
    } else {
      localStorage.removeItem('rememberMe');
    }
    // Only redirect if role is recognized
    if (user.role === 'admin') {
      router.push('/admin');
    } else if (user.role === 'employee') {
      router.push('/employee');
    } else if (user.role === 'client') {
      router.push('/client');
    } else {
      error.value = 'Rol de usuario no reconocido';
    }
  } catch (err) {
    error.value = err.response?.data?.message || 'Error al iniciar sesión';
  } finally {
    loading.value = false;
  }
};
</script>
<template>
  <div id="webcrumbs">
    <div class="flex items-center justify-center min-h-screen bg-gray-100">
      <div class="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-lg">
        <div class="text-center">
          <div class="flex justify-center">
            <img src="https://images.unsplash.com/photo-1519520104014-df63821cb6f9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MzkyNDZ8MHwxfHNlYXJjaHwxfHxmZXJyZXRlcmlhfGVufDB8fHx8MTc1NDAxNDg4Nnww&ixlib=rb-4.1.0&q=80&w=1080" alt="Ferrepoco Logo" class="h-16 w-16 rounded-md bg-primary-500 transition-transform hover:scale-105" keywords="ferreteria, logo, construccion, herramientas" />
          </div>
          <h2 class="mt-6 text-3xl font-extrabold text-gray-900">Ferrepoco</h2>
          <p class="mt-2 text-sm text-gray-600">Sistema de Gestión de Inventario</p>
        </div>
        <form class="mt-8 space-y-6" @submit.prevent="handleLogin">
          <div class="rounded-md shadow-sm space-y-4">
            <div>
              <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Correo Electrónico</label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span class="material-symbols-outlined text-gray-400">mail</span>
                </div>
                <input id="email" name="email" type="email" autoComplete="email" required class="pl-10 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors" placeholder="usuario@ferrepoco.com" v-model="email" />
              </div>
            </div>
            <div>
              <label for="password" class="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span class="material-symbols-outlined text-gray-400">lock</span>
                </div>
                <input id="password" name="password" type="password" autoComplete="current-password" required class="pl-10 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors" placeholder="••••••••" v-model="password" />
              </div>
            </div>
          </div>
          <div v-if="error" class="text-red-500 text-sm text-center">{{ error }}</div>
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <input id="remember-me" name="remember-me" type="checkbox" class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded transition-colors cursor-pointer" v-model="rememberMe" />
              <label for="remember-me" class="ml-2 block text-sm text-gray-700 cursor-pointer"> Recordar </label>
            </div>
            <div class="text-sm">
              <a href="#" class="font-medium text-primary-600 hover:text-primary-500 transition-colors"> ¿Olvidaste tu contraseña? </a>
            </div>
          </div>
          <div>
            <button type="submit" :disabled="loading" class="group relative w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all duration-200 transform hover:-translate-y-0.5">
              <span class="absolute left-0 inset-y-0 flex items-center pl-3">
                <span class="material-symbols-outlined text-primary-300 group-hover:text-primary-200 transition-colors">login</span>
              </span>
              <span v-if="loading">Iniciando...</span>
              <span v-else>Iniciar Sesión</span>
            </button>
          </div>
        </form>
        <div class="mt-6">
          <div class="relative">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-gray-300"></div>
            </div>
            <div class="relative flex justify-center text-sm">
              <span class="px-2 bg-white text-gray-500">O continúa con</span>
            </div>
          </div>
          <div class="mt-6 grid grid-cols-2 gap-3">
            <a href="#" class="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors">
              <i class="fa-brands fa-google text-lg"></i>
              <span class="ml-2">Google</span>
            </a>
            <a href="#" class="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors">
              <i class="fa-brands fa-microsoft text-lg"></i>
              <span class="ml-2">Microsoft</span>
            </a>
          </div>
        </div>
        <div class="text-center mt-4 text-sm text-gray-600">
          <p>¿No tienes una cuenta? <a href="#" class="font-medium text-primary-600 hover:text-primary-500 transition-colors">Solicitar acceso</a></p>
        </div>
        <div class="mt-8 text-center text-xs text-gray-500">
          <p>© 2024 Ferrepoco. Todos los derechos reservados.</p>
          <div class="mt-2 space-x-4">
            <a href="#" class="hover:text-gray-700 transition-colors">Términos y condiciones</a>
            <a href="#" class="hover:text-gray-700 transition-colors">Privacidad</a>
            <a href="#" class="hover:text-gray-700 transition-colors">Ayuda</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url(https://fonts.googleapis.com/css2?family=Lato&display=swap);
@import url(https://fonts.googleapis.com/css2?family=Open+Sans&display=swap);
@import url(https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined);
@import url(https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css);

*,
:after,
:before {
  --tw-border-spacing-x: 0;
  --tw-border-spacing-y: 0;
  --tw-translate-x: 0;
  --tw-translate-y: 0;
  --tw-rotate: 0;
  --tw-skew-x: 0;
  --tw-skew-y: 0;
  --tw-scale-x: 1;
  --tw-scale-y: 1;
  --tw-pan-x: ;
  --tw-pan-y: ;
  --tw-pinch-zoom: ;
  --tw-scroll-snap-strictness: proximity;
  --tw-gradient-from-position: ;
  --tw-gradient-via-position: ;
  --tw-gradient-to-position: ;
  --tw-ordinal: ;
  --tw-slashed-zero: ;
  --tw-numeric-figure: ;
  --tw-numeric-spacing: ;
  --tw-numeric-fraction: ;
  --tw-ring-inset: ;
  --tw-ring-offset-width: 0px;
  --tw-ring-offset-color: #fff;
  --tw-ring-color: rgba(59, 130, 246, 0.5);
  --tw-ring-offset-shadow: 0 0 #0000;
  --tw-ring-shadow: 0 0 #0000;
  --tw-shadow: 0 0 #0000;
  --tw-shadow-colored: 0 0 #0000;
  --tw-blur: ;
  --tw-brightness: ;
  --tw-contrast: ;
  --tw-grayscale: ;
  --tw-hue-rotate: ;
  --tw-invert: ;
  --tw-saturate: ;
  --tw-sepia: ;
  --tw-drop-shadow: ;
  --tw-backdrop-blur: ;
  --tw-backdrop-brightness: ;
  --tw-backdrop-contrast: ;
  --tw-backdrop-grayscale: ;
  --tw-backdrop-hue-rotate: ;
  --tw-backdrop-invert: ;
  --tw-backdrop-opacity: ;
  --tw-backdrop-saturate: ;
  --tw-backdrop-sepia: ;
  --tw-contain-size: ;
  --tw-contain-layout: ;
  --tw-contain-paint: ;
  --tw-contain-style: ;
}
::backdrop {
  --tw-border-spacing-x: 0;
  --tw-border-spacing-y: 0;
  --tw-translate-x: 0;
  --tw-translate-y: 0;
  --tw-rotate: 0;
  --tw-skew-x: 0;
  --tw-skew-y: 0;
  --tw-scale-x: 1;
  --tw-scale-y: 1;
  --tw-pan-x: ;
  --tw-pan-y: ;
  --tw-pinch-zoom: ;
  --tw-scroll-snap-strictness: proximity;
  --tw-gradient-from-position: ;
  --tw-gradient-via-position: ;
  --tw-gradient-to-position: ;
  --tw-ordinal: ;
  --tw-slashed-zero: ;
  --tw-numeric-figure: ;
  --tw-numeric-spacing: ;
  --tw-numeric-fraction: ;
  --tw-ring-inset: ;
  --tw-ring-offset-width: 0px;
  --tw-ring-offset-color: #fcfcfc;
  --tw-ring-color: rgba(59, 130, 246, 0.5);
  --tw-ring-offset-shadow: 0 0 #0000;
  --tw-ring-shadow: 0 0 #0000;
  --tw-shadow: 0 0 #0000;
  --tw-shadow-colored: 0 0 #0000;
  --tw-blur: ;
  --tw-brightness: ;
  --tw-contrast: ;
  --tw-grayscale: ;
  --tw-hue-rotate: ;
  --tw-invert: ;
  --tw-saturate: ;
  --tw-sepia: ;
  --tw-drop-shadow: ;
  --tw-backdrop-blur: ;
  --tw-backdrop-brightness: ;
  --tw-backdrop-contrast: ;
  --tw-backdrop-grayscale: ;
  --tw-backdrop-hue-rotate: ;
  --tw-backdrop-invert: ;
  --tw-backdrop-opacity: ;
  --tw-backdrop-saturate: ;
  --tw-backdrop-sepia: ;
  --tw-contain-size: ;
  --tw-contain-layout: ;
  --tw-contain-paint: ;
  --tw-contain-style: ;
} /*! tailwindcss v3.4.17 | MIT License | https://tailwindcss.com*/
*,
:after,
:before {
  border: 0 solid #e5e7eb;
  box-sizing: border-box;
}
:after,
:before {
  --tw-content: "";
}
:host,
html {
  line-height: 1.5;
  -webkit-text-size-adjust: 100%;
  font-family:
    Open Sans,
    ui-sans-serif,
    system-ui,
    sans-serif,
    Apple Color Emoji,
    Segoe UI Emoji,
    Segoe UI Symbol,
    Noto Color Emoji;
  font-feature-settings: normal;
  font-variation-settings: normal;
  -moz-tab-size: 4;
  tab-size: 4;
  -webkit-tap-highlight-color: transparent;
}
body {
  line-height: inherit;
  margin: 0;
}
hr {
  border-top-width: 1px;
  color: inherit;
  height: 0;
}
abbr:where([title]) {
  text-decoration: underline dotted;
}
h1,
h2,
h3,
h4,
h5,
h6 {
  font-size: inherit;
  font-weight: inherit;
}
a {
  color: inherit;
  text-decoration: inherit;
}
b,
strong {
  font-weight: bolder;
}
code,
kbd,
pre {
  font-family:
    ui-monospace,
    SFMono-Regular,
    Menlo,
    Monaco,
    Consolas,
    Liberation Mono,
    Courier New,
    monospace;
  font-feature-settings: normal;
  font-size: 1em;
  font-variation-settings: normal;
}
sup {
  font-size: 75%;
  line-height: 0;
  position: relative;
  vertical-align: baseline;
}
sub {
  bottom: -0.25em;
}
sup {
  top: -0.5em;
}
table {
  border-collapse: collapse;
  border-color: inherit;
  text-indent: 0;
}
button,
input,
optgroup,
select,
textarea {
  color: inherit;
  font-family: inherit;
  font-feature-settings: inherit;
  font-size: 100%;
  font-variation-settings: inherit;
  font-weight: inherit;
  letter-spacing: inherit;
  line-height: inherit;
  margin: 0;
  padding: 0;
}
button,
select {
  text-transform: none;
}
button,
input:where([type="button"]),
input:where([type="reset"]),
input:where([type="submit"]) {
  -webkit-appearance: button;
  background-color: transparent;
  background-image: none;
}
:-moz-focusring {
  outline: auto;
}
:-moz-ui-invalid {
  box-shadow: none;
}
progress {
  vertical-align: baseline;
}
::-webkit-inner-spin-button,
::-webkit-outer-spin-button {
  height: auto;
}
[type="search"] {
  -webkit-appearance: textfield;
  outline-offset: -2px;
}
::-webkit-search-decoration {
  -webkit-appearance: none;
}
::-webkit-file-upload-button {
  -webkit-appearance: button;
  font: inherit;
}
summary {
  display: list-item;
}
blockquote,
dd,
dl,
figure,
h1,
h2,
h3,
h4,
h5,
h6,
hr,
p,
pre {
  margin: 0;
}
fieldset {
  margin: 0;
}
fieldset,
legend {
  padding: 0;
}
menu,
ol,
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
dialog {
  padding: 0;
}
textarea {
  resize: vertical;
}
input::placeholder,
textarea::placeholder {
  color: #9ca3af;
  opacity: 1;
}
[role="button"],
button {
  cursor: pointer;
}
:disabled {
  cursor: default;
}
audio,
canvas,
embed,
iframe,
img,
object,
svg,
video {
  display: block;
  vertical-align: middle;
}
img,
video {
  height: auto;
  max-width: 100%;
}
[hidden]:where(:not([hidden="until-found"])) {
  display: none;
}
#webcrumbs .pointer-events-none {
  pointer-events: none;
}
#webcrumbs .absolute {
  position: absolute;
}
#webcrumbs .relative {
  position: relative;
}
#webcrumbs .inset-0 {
  inset: 0;
}
#webcrumbs .inset-y-0 {
  bottom: 0;
  top: 0;
}
#webcrumbs .left-0 {
  left: 0;
}
#webcrumbs .mb-1 {
  margin-bottom: 4px;
}
#webcrumbs .ml-2 {
  margin-left: 8px;
}
#webcrumbs .mt-2 {
  margin-top: 8px;
}
#webcrumbs .mt-4 {
  margin-top: 16px;
}
#webcrumbs .mt-6 {
  margin-top: 24px;
}
#webcrumbs .mt-8 {
  margin-top: 32px;
}
#webcrumbs .block {
  display: block;
}
#webcrumbs .flex {
  display: flex;
}
#webcrumbs .inline-flex {
  display: inline-flex;
}
#webcrumbs .grid {
  display: grid;
}
#webcrumbs .h-16 {
  height: 64px;
}
#webcrumbs .h-4 {
  height: 16px;
}
#webcrumbs .min-h-screen {
  min-height: 100vh;
}
#webcrumbs .w-16 {
  width: 64px;
}
#webcrumbs .w-4 {
  width: 16px;
}
#webcrumbs .w-full {
  width: 100%;
}
#webcrumbs .max-w-md {
  max-width: 28rem;
}
#webcrumbs .transform {
  transform: translate(var(--tw-translate-x), var(--tw-translate-y))
    rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y))
    scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
#webcrumbs .cursor-pointer {
  cursor: pointer;
}
#webcrumbs .grid-cols-2 {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}
#webcrumbs .flex-row {
  flex-direction: row;
}
#webcrumbs .items-center {
  align-items: center;
}
#webcrumbs .justify-center {
  justify-content: center;
}
#webcrumbs .justify-between {
  justify-content: space-between;
}
#webcrumbs .gap-3 {
  gap: 12px;
}
#webcrumbs .gap-4 {
  gap: 16px;
}
#webcrumbs :is(.space-x-4 > :not([hidden]) ~ :not([hidden])) {
  --tw-space-x-reverse: 0;
  margin-left: calc(16px * (1 - var(--tw-space-x-reverse)));
  margin-right: calc(16px * var(--tw-space-x-reverse));
}
#webcrumbs :is(.space-y-4 > :not([hidden]) ~ :not([hidden])) {
  --tw-space-y-reverse: 0;
  margin-bottom: calc(16px * var(--tw-space-y-reverse));
  margin-top: calc(16px * (1 - var(--tw-space-y-reverse)));
}
#webcrumbs :is(.space-y-6 > :not([hidden]) ~ :not([hidden])) {
  --tw-space-y-reverse: 0;
  margin-bottom: calc(24px * var(--tw-space-y-reverse));
  margin-top: calc(24px * (1 - var(--tw-space-y-reverse)));
}
#webcrumbs :is(.space-y-8 > :not([hidden]) ~ :not([hidden])) {
  --tw-space-y-reverse: 0;
  margin-bottom: calc(32px * var(--tw-space-y-reverse));
  margin-top: calc(32px * (1 - var(--tw-space-y-reverse)));
}
#webcrumbs .rounded {
  border-radius: 12px;
}
#webcrumbs .rounded-lg {
  border-radius: 24px;
}
#webcrumbs .rounded-md {
  border-radius: 18px;
}
#webcrumbs .border {
  border-width: 1px;
}
#webcrumbs .border-t {
  border-top-width: 1px;
}
#webcrumbs .border-gray-300 {
  --tw-border-opacity: 1;
  border-color: rgb(209 213 219 / var(--tw-border-opacity, 1));
}
#webcrumbs .border-transparent {
  border-color: transparent;
}
#webcrumbs .bg-gray-100 {
  --tw-bg-opacity: 1;
  background-color: rgb(243 244 246 / var(--tw-bg-opacity, 1));
}
#webcrumbs .bg-primary-500 {
  --tw-bg-opacity: 1;
  background-color: rgb(115 65 255 / var(--tw-bg-opacity, 1));
}
#webcrumbs .bg-primary-600 {
  --tw-bg-opacity: 1;
  background-color: rgb(99 27 255 / var(--tw-bg-opacity, 1));
}
#webcrumbs .bg-white {
  --tw-bg-opacity: 1;
  background-color: rgb(255 255 255 / var(--tw-bg-opacity, 1));
}
#webcrumbs .p-8 {
  padding: 32px;
}
#webcrumbs .px-2 {
  padding-left: 8px;
  padding-right: 8px;
}
#webcrumbs .px-3 {
  padding-left: 12px;
  padding-right: 12px;
}
#webcrumbs .px-4 {
  padding-left: 16px;
  padding-right: 16px;
}
#webcrumbs .py-2 {
  padding-bottom: 8px;
  padding-top: 8px;
}
#webcrumbs .pl-10 {
  padding-left: 40px;
}
#webcrumbs .pl-3 {
  padding-left: 12px;
}
#webcrumbs .text-center {
  text-align: center;
}
#webcrumbs .text-3xl {
  font-size: 30px;
  line-height: 36px;
}
#webcrumbs .text-lg {
  font-size: 18px;
  line-height: 27px;
}
#webcrumbs .text-sm {
  font-size: 14px;
  line-height: 21px;
}
#webcrumbs .text-xs {
  font-size: 12px;
  line-height: 19.200000000000003px;
}
#webcrumbs .font-extrabold {
  font-weight: 800;
}
#webcrumbs .font-medium {
  font-weight: 500;
}
#webcrumbs .text-gray-400 {
  --tw-text-opacity: 1;
  color: rgb(156 163 175 / var(--tw-text-opacity, 1));
}
#webcrumbs .text-gray-500 {
  --tw-text-opacity: 1;
  color: rgb(107 114 128 / var(--tw-text-opacity, 1));
}
#webcrumbs .text-gray-600 {
  --tw-text-opacity: 1;
  color: rgb(75 85 99 / var(--tw-text-opacity, 1));
}
#webcrumbs .text-gray-700 {
  --tw-text-opacity: 1;
  color: rgb(55 65 81 / var(--tw-text-opacity, 1));
}
#webcrumbs .text-gray-900 {
  --tw-text-opacity: 1;
  color: rgb(17 24 39 / var(--tw-text-opacity, 1));
}
#webcrumbs .text-primary-300 {
  --tw-text-opacity: 1;
  color: rgb(183 169 255 / var(--tw-text-opacity, 1));
}
#webcrumbs .text-primary-600 {
  --tw-text-opacity: 1;
  color: rgb(99 27 255 / var(--tw-text-opacity, 1));
}
#webcrumbs .text-white {
  --tw-text-opacity: 1;
  color: rgb(255 255 255 / var(--tw-text-opacity, 1));
}
#webcrumbs .placeholder-gray-400::placeholder {
  --tw-placeholder-opacity: 1;
  color: rgb(156 163 175 / var(--tw-placeholder-opacity, 1));
}
#webcrumbs .shadow-lg {
  --tw-shadow:
    0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1);
  --tw-shadow-colored:
    0 10px 15px -3px var(--tw-shadow-color),
    0 4px 6px -4px var(--tw-shadow-color);
}
#webcrumbs .shadow-lg,
#webcrumbs .shadow-sm {
  box-shadow:
    var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000),
    var(--tw-shadow);
}
#webcrumbs .shadow-sm {
  --tw-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --tw-shadow-colored: 0 1px 2px 0 var(--tw-shadow-color);
}
#webcrumbs .transition-all {
  transition-duration: 0.15s;
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}
#webcrumbs .transition-colors {
  transition-duration: 0.15s;
  transition-property:
    color, background-color, border-color, text-decoration-color, fill, stroke;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}
#webcrumbs .transition-transform {
  transition-duration: 0.15s;
  transition-property: transform;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}
#webcrumbs .duration-200 {
  transition-duration: 0.2s;
}
#webcrumbs {
  font-family: Open Sans !important;
  font-size: 16px !important;
}
#webcrumbs :is(.bg-primary-500) {
  color: hsla(0, 0%, 100%, 0.9) !important;
}
#webcrumbs :is(.bg-primary-600) {
  color: hsla(0, 0%, 100%, 0.9) !important;
}
#webcrumbs .hover\:-translate-y-0\.5:hover {
  --tw-translate-y: -2px;
}
#webcrumbs .hover\:-translate-y-0\.5:hover,
#webcrumbs .hover\:scale-105:hover {
  transform: translate(var(--tw-translate-x), var(--tw-translate-y))
    rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y))
    scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
#webcrumbs .hover\:scale-105:hover {
  --tw-scale-x: 1.05;
  --tw-scale-y: 1.05;
}
#webcrumbs .hover\:bg-gray-50:hover {
  --tw-bg-opacity: 1;
  background-color: rgb(249 250 251 / var(--tw-bg-opacity, 1));
}
#webcrumbs .hover\:bg-primary-700:hover {
  --tw-bg-opacity: 1;
  background-color: rgb(97 27 248 / var(--tw-bg-opacity, 1));
}
#webcrumbs .hover\:text-gray-700:hover {
  --tw-text-opacity: 1;
  color: rgb(55 65 81 / var(--tw-text-opacity, 1));
}
#webcrumbs .hover\:text-primary-500:hover {
  --tw-text-opacity: 1;
  color: rgb(115 65 255 / var(--tw-text-opacity, 1));
}
#webcrumbs .focus\:border-primary-500:focus {
  --tw-border-opacity: 1;
  border-color: rgb(115 65 255 / var(--tw-border-opacity, 1));
}
#webcrumbs .focus\:outline-none:focus {
  outline: 2px solid transparent;
  outline-offset: 2px;
}
#webcrumbs .focus\:ring-2:focus {
  --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0
    var(--tw-ring-offset-width) var(--tw-ring-offset-color);
  --tw-ring-shadow: var(--tw-ring-inset) 0 0 0
    calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);
  box-shadow:
    var(--tw-ring-offset-shadow), var(--tw-ring-shadow),
    var(--tw-shadow, 0 0 #0000);
}
#webcrumbs .focus\:ring-primary-500:focus {
  --tw-ring-opacity: 1;
  --tw-ring-color: rgb(115 65 255 / var(--tw-ring-opacity, 1));
}
#webcrumbs .focus\:ring-offset-2:focus {
  --tw-ring-offset-width: 2px;
}
#webcrumbs :is(.group:hover .group-hover\:text-primary-200) {
  --tw-text-opacity: 1;
  color: rgb(213 207 255 / var(--tw-text-opacity, 1));
}

</style>