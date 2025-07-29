<template>
  <div class="dashboard">
    <h2>Panel de Cliente</h2>
    <p>Bienvenido, {{ authStore.user?.username }} (Rol: {{ authStore.user?.role }})</p>

    <h3>Buscar y Comprar Productos</h3>
    <div class="search-filters">
      <input type="text" v-model="searchQuery" placeholder="Buscar por nombre o categoría..." @input="performSearch">
      <input type="number" v-model.number="minPrice" placeholder="Precio Mín." @input="performSearch">
      <input type="number" v-model.number="maxPrice" placeholder="Precio Máx." @input="performSearch">
      <button @click="resetSearch">Resetear Filtros</button>
    </div>
    <div v-if="products.length" class="product-grid">
      <ProductCard v-for="product in products" :key="product.id" :product="product">
        <template #actions>
          <button @click="addToCart(product)" :disabled="product.stock === 0">
            Añadir al Carrito
          </button>
        </template>
      </ProductCard>
    </div>
    <p v-else>No se encontraron productos.</p>

    <h3>Carrito de Compras</h3>
    <div v-if="cart.length">
      <ul>
        <li v-for="item in cart" :key="item.productId">
          {{ item.name }} x {{ item.quantity }} - ${{ (item.price * item.quantity).toFixed(2) }}
          <button @click="removeFromCart(item.productId)">Eliminar</button>
        </li>
      </ul>
      <p>Total del Carrito: ${{ cartTotal.toFixed(2) }}</p>
      <button @click="placeOrder" :disabled="isPlacingOrder">
        {{ isPlacingOrder ? 'Procesando...' : 'Realizar Compra' }}
      </button>
      <p v-if="orderMessage">{{ orderMessage }}</p>
    </div>
    <p v-else>Tu carrito está vacío.</p>

    <h3>Mis Pedidos</h3>
    <button @click="loadMyOrders">Cargar Mis Pedidos</button>
    <div v-if="myOrders.length">
      <ul>
        <li v-for="order in myOrders" :key="order.id">
          Pedido #{{ order.id.substring(0, 6) }} - Total: ${{ order.total.toFixed(2) }} - Estado: {{ order.status }} - Fecha: {{ new Date(order.date).toLocaleDateString() }}
        </li>
      </ul>
    </div>
    <p v-else-if="myOrdersLoaded">No tienes pedidos aún.</p>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import { useAuthStore } from '../stores/auth';
import apiClient from '../api/apiClient';
import ProductCard from '@/components/ProductCard.vue'; // Usar el alias @

export default {
  name: 'ClientDashboard',
  components: {
    ProductCard
  },
  setup() {
    const authStore = useAuthStore();
    const products = ref([]);
    const cart = ref([]);
    const orderMessage = ref('');
    const isPlacingOrder = ref(false);
    const myOrders = ref([]);
    const myOrdersLoaded = ref(false);

    // Búsqueda y Filtros
    const searchQuery = ref('');
    const minPrice = ref(null);
    const maxPrice = ref(null);

    const cartTotal = computed(() => {
      return cart.value.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    });

    // --- Polimorfismo en Tiempo de Compilación (Sobrecarga de buscarProducto en backend simulado) ---
    // El frontend construye los parámetros para que el backend "simule" la sobrecarga
    const loadProducts = async (query = '') => {
      try {
        let response;
        if (query) {
          response = await apiClient.get(`/products?query=${query}`); // Simula buscar por nombre/categoría
        } else if (minPrice.value !== null || maxPrice.value !== null) {
          // Si hay rango de precios, ajusta la query params para el backend
          const params = {};
          if (minPrice.value !== null) params.priceMin = minPrice.value;
          if (maxPrice.value !== null) params.priceMax = maxPrice.value;
          response = await apiClient.get('/products', { params }); // Simula buscar por rango de precios
        } else {
          response = await apiClient.get('/products'); // Sin filtros, todos los productos
        }
        products.value = response.data;
      } catch (error) {
        console.error('Error loading products:', error);
      }
    };

    const performSearch = () => {
      loadProducts(searchQuery.value);
    };

    const resetSearch = () => {
      searchQuery.value = '';
      minPrice.value = null;
      maxPrice.value = null;
      loadProducts();
    };

    const addToCart = (product) => {
      const existingItem = cart.value.find(item => item.productId === product.id);
      if (existingItem) {
        if (existingItem.quantity < product.stock) {
          existingItem.quantity++;
        } else {
          orderMessage.value = `No hay suficiente stock de ${product.name}.`;
        }
      } else {
        if (product.stock > 0) {
          cart.value.push({
            productId: product.id,
            name: product.name,
            price: product.price,
            quantity: 1
          });
        } else {
          orderMessage.value = `${product.name} está agotado.`;
        }
      }
      setTimeout(() => orderMessage.value = '', 3000); // Limpiar mensaje
    };

    const removeFromCart = (productId) => {
      cart.value = cart.value.filter(item => item.productId !== productId);
    };

    const placeOrder = async () => {
      if (cart.value.length === 0) {
        orderMessage.value = 'El carrito está vacío.';
        return;
      }
      isPlacingOrder.value = true;
      orderMessage.value = '';
      try {
        const response = await apiClient.post('/orders', {
          clientId: authStore.user.id,
          products: cart.value
        });
        orderMessage.value = response.data.message || 'Pedido realizado con éxito.';
        cart.value = []; // Vaciar carrito
        await loadProducts(); // Recargar productos para reflejar el stock
        await loadMyOrders(); // Cargar los nuevos pedidos
      } catch (error) {
        orderMessage.value = error.response?.data?.message || 'Error al realizar el pedido.';
        console.error('Order error:', error);
      } finally {
        isPlacingOrder.value = false;
      }
    };

    const loadMyOrders = async () => {
        myOrders.value = [];
        myOrdersLoaded.value = false;
        try {
            const response = await apiClient.get(`/orders/my-orders/${authStore.user.id}`);
            myOrders.value = response.data;
            myOrdersLoaded.value = true;
        } catch (error) {
            console.error('Error loading my orders:', error);
            myOrdersLoaded.value = true;
        }
    };

    onMounted(() => {
      loadProducts();
      loadMyOrders();
    });

    return {
      authStore,
      products,
      cart,
      cartTotal,
      orderMessage,
      isPlacingOrder,
      myOrders,
      myOrdersLoaded,
      loadProducts,
      performSearch,
      resetSearch,
      searchQuery,
      minPrice,
      maxPrice,
      addToCart,
      removeFromCart,
      placeOrder,
      loadMyOrders
    };
  }
};
</script>

<style scoped>
.dashboard {
  padding: 20px;
  text-align: left;
}
.dashboard h2, .dashboard h3 {
  color: #2c3e50;
  text-align: center;
  margin-bottom: 20px;
}
.search-filters {
  margin-bottom: 20px;
  text-align: center;
}
.search-filters input {
  margin: 0 5px;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}
.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 20px;
}
button {
  background-color: #42b983;
  color: white;
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9em;
  margin: 5px;
}
button:hover:not(:disabled) {
  background-color: #368a68;
}
button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}
ul {
  list-style: none;
  padding: 0;
}
li {
  background-color: #f0f0f0;
  margin-bottom: 5px;
  padding: 8px;
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>