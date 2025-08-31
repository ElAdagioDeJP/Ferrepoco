<template>
  <footer class="bg-white border-t border-neutral-200 mt-auto">
     Enhanced footer with better styling and additional info 
    <div class="container mx-auto px-6 py-6">
      <div class="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        <div class="flex items-center space-x-4">
          <div class="flex items-center space-x-2">
            <div class="w-6 h-6 bg-cyan-800 rounded flex items-center justify-center">
              <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path>
              </svg>
            </div>
            <span class="text-neutral-700 font-medium">Ferrepoco</span>
          </div>
          <span class="text-neutral-400">|</span>
          <p class="text-neutral-600 text-sm">© 2025 Todos los derechos reservados</p>
        </div>
        
        <div class="flex items-center space-x-6 text-sm text-neutral-500">
          <span>Versión 1.0.0</span>
          <div class="flex items-center space-x-1">
            <div class="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>Sistema Operativo</span>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
</script>
