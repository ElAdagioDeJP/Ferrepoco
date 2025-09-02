<template>
  <div class="flex h-screen bg-gradient-to-br from-neutral-50 to-neutral-100">
    <Sidebar />
    <div class="flex-1 flex flex-col overflow-hidden min-w-0">
  <Navbar />
      <main class="flex-1 min-h-0 overflow-x-hidden overflow-y-auto bg-neutral-50">
        <div class="container mx-auto px-6 py-8">
          <router-view />
        </div>
      </main>
      <Footer />
  <Carrito :open="cartOpen" @close="cartOpen=false" @checked-out="onCheckedOut" />
    </div>
  </div>
  
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

