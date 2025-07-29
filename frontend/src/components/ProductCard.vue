<template>
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
}
</style>