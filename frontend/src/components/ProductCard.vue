<template>
<<<<<<< HEAD
  <div class="product-card">
    <h3>{{ product.name }}</h3>
    <p>{{ product.description }}</p>
    <p>Precio: ${{ product.price.toFixed(2) }}</p>
    <p>Stock: {{ product.stock }}</p>
    <p>Categoría: {{ product.category }}</p>
    <slot name="actions"></slot>
  </div>
</template>

<script>
export default {
  name: 'ProductCard',
  props: {
    product: {
      type: Object,
      required: true
    }
  }
};
</script>

<style scoped>
.product-card {
  border: 1px solid #eee;
  padding: 15px;
  margin: 10px;
  border-radius: 8px;
  text-align: left;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  background-color: #fff;
}
h3 {
  color: #333;
  margin-top: 0;
}
p {
  color: #666;
  font-size: 0.9em;
=======
  <div class="bg-white border border-neutral-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
     Updated to use new design system colors instead of semantic tokens 
    <div class="flex flex-col h-full">
      <div class="flex-1">
        <div class="flex items-start justify-between mb-3">
          <h3 class="font-heading text-lg font-semibold text-neutral-900 line-clamp-2">{{ product.name }}</h3>
          <div class="flex items-center gap-1 px-2 py-1 bg-neutral-100 rounded-full">
            <div class="w-2 h-2 rounded-full" :class="stockStatusColor"></div>
            <span class="text-xs font-medium text-neutral-600">{{ product.stock }}</span>
          </div>
        </div>
        
        <p class="text-sm text-neutral-600 mb-4 line-clamp-2 font-body">{{ product.description }}</p>
        
        <div class="space-y-2 mb-4">
          <div class="flex items-center justify-between">
            <span class="text-sm font-medium text-neutral-700 font-body">Precio</span>
            <span class="font-heading text-lg font-bold text-cyan-800">${{ product.price.toFixed(2) }}</span>
          </div>
          
          <div class="flex items-center justify-between">
            <span class="text-sm font-medium text-neutral-700 font-body">Categoría</span>
            <span class="inline-flex items-center px-2 py-1 rounded-md bg-neutral-100 text-neutral-700 text-xs font-medium font-body">
              {{ product.category }}
            </span>
          </div>
        </div>
      </div>
      
       Improved actions slot with better spacing 
      <div class="pt-4 border-t border-neutral-200">
        <slot name="actions">
          <div class="flex gap-2">
            <button class="flex-1 bg-cyan-800 text-white hover:bg-cyan-700 px-3 py-2 rounded-md text-sm font-medium transition-colors font-body">
              Ver detalles
            </button>
          </div>
        </slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

const stockStatusColor = computed(() => {
  if (props.product.stock <= 5) return 'bg-red-500'
  if (props.product.stock <= 15) return 'bg-orange-500'
  return 'bg-green-500'
})
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.font-heading {
  font-family: 'Montserrat', sans-serif;
}

.font-body {
  font-family: 'Open Sans', sans-serif;
>>>>>>> unificado
}
</style>