<template>
   Enhanced layout with better background and structure 
  <div class="flex h-screen bg-gradient-to-br from-neutral-50 to-neutral-100">
    <Sidebar />
    <div class="flex-1 flex flex-col overflow-hidden">
      <Navbar />
      <main class="flex-1 overflow-x-hidden overflow-y-auto bg-neutral-50">
        <div class="container mx-auto px-6 py-8">
          <router-view />
        </div>
      </main>
      <Footer />
    </div>
  </div>
</template>

<script setup>
import Navbar from './Navbar.vue';
import Sidebar from './Sidebar.vue';
import Footer from './Footer.vue';
</script>

