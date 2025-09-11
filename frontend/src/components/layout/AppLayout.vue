<template>
<<<<<<< HEAD
<<<<<<< HEAD
  <div class="flex h-screen bg-gray-100">
    <Sidebar />
    <div class="flex-1 flex flex-col overflow-hidden">
      <Navbar />
      <main class="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
=======
  <div class="flex h-screen bg-gradient-to-br from-neutral-50 to-neutral-100">
    <Sidebar />
    <div class="flex-1 flex flex-col overflow-hidden min-w-0">
  <Navbar />
      <main class="flex-1 min-h-0 overflow-x-hidden overflow-y-auto bg-neutral-50">
>>>>>>> unificado
=======
  <div class="flex h-screen bg-gradient-to-br from-neutral-50 to-neutral-100">
    <Sidebar />
    <div class="flex-1 flex flex-col overflow-hidden min-w-0">
      <Navbar />
      <main class="flex-1 min-h-0 overflow-x-hidden overflow-y-auto bg-neutral-50">
>>>>>>> unificado
        <div class="container mx-auto px-6 py-8">
          <router-view />
        </div>
      </main>
      <Footer />
<<<<<<< HEAD
<<<<<<< HEAD
    </div>
  </div>
</template>

<script setup>
import Navbar from './Navbar.vue';
import Sidebar from './Sidebar.vue';
import Footer from './Footer.vue';
</script>
=======
  <Carrito :open="cartOpen" @close="cartOpen=false" @checked-out="onCheckedOut" />
    </div>
  </div>
  
=======
      <Carrito :open="cartOpen" @close="cartOpen=false" @checked-out="onCheckedOut" />
    </div>
  </div>



>>>>>>> unificado
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import Navbar from './Navbar.vue';
import Sidebar from './Sidebar.vue';
import Footer from './Footer.vue';
import Carrito from './Carrito.vue';

const cartOpen = ref(false)
function onCheckedOut(){ cartOpen.value = false }
function toggleCart(){ cartOpen.value = !cartOpen.value }

function onOpenCart(){ cartOpen.value = true }
onMounted(() => { window.addEventListener('open-cart', onOpenCart) })
onUnmounted(() => { window.removeEventListener('open-cart', onOpenCart) })
</script>

<<<<<<< HEAD
>>>>>>> unificado
=======
<style>
  /* Sidebar transition */
.sidebar-fade-enter-active, .sidebar-fade-leave-active {
  transition: opacity 0.2s, transform 0.2s;
}
.sidebar-fade-enter-from, .sidebar-fade-leave-to {
  opacity: 0;
  transform: translateX(-100%);
}
.sidebar-fade-enter-to, .sidebar-fade-leave-from {
  opacity: 1;
  transform: translateX(0);
}
</style>
>>>>>>> unificado
