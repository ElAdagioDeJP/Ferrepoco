<template>
  <div class="dashboard">
    <h2>Panel de Empleado</h2>
    <p>Bienvenido, {{ authStore.user?.username }} (Rol: {{ authStore.user?.role }})</p>

    <h3>Gestión de Pedidos</h3>
    <button @click="loadOrders">Cargar Pedido</button>
    <div v-if="orders.length">
      <ul>
        <li v-for="order in orders" :key="order.id">
          Pedido #{{ order.id.substring(0, 6) }} - Cliente: {{ order.clientId.substring(0,6) }} - Total: ${{ order.total.toFixed(2) }} - Estado: {{ order.status }}
          <button @click="updateOrderStatus(order.id, 'completed')" v-if="order.status !== 'completed'">Marcar como Completado</button>
        </li>
      </ul>
      <p v-if="orderMessage">{{ orderMessage }}</p>
    </div>
    <p v-else-if="ordersLoaded">No hay pedidos pendientes.</p>


    <h3>Gestión de Stock</h3>
    <button @click="loadProducts">Cargar Producto</button>
    <div v-if="products.length">
      <div class="product-grid">
        <ProductCard v-for="product in products" :key="product.id" :product="product">
          <template #actions>
            <button @click="updateStockEmployee(product.id, -1)">Vender 1</button>
            <button @click="updateStockEmployee(product.id, 10)">Añadir 10</button>
          </template>
        </ProductCard>
      </div>
      <p v-if="productMessage">{{ productMessage }}</p>
    </div>

    <h3>Alertas de Inventario</h3>
    <button @click="loadAlerts">Cargar Alertas de Bajo Stock</button>
    <div v-if="alerts.length">
      <ul>
        <li v-for="alert in alerts" :key="alert.productId">
          {{ alert.message }} (Stock: {{ alert.currentStock }})
        </li>
      </ul>
    </div>
    <p v-else-if="alertsLoaded">No hay alertas de bajo stock.</p>

  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useAuthStore } from '../stores/auth';
import apiClient from '../api/apiClient';
import ProductCard from '@/components/ProductCard.vue'; 

export default {
  name: 'EmployeeDashboard',
  components: {
    ProductCard
  },
  setup() {
    const authStore = useAuthStore();
    const orders = ref([]);
    const orderMessage = ref('');
    const ordersLoaded = ref(false);
    const products = ref([]);
    const productMessage = ref('');
    const alerts = ref([]);
    const alertsLoaded = ref(false);

    // Cargar Pedidos
    const loadOrders = async () => {
        orderMessage.value = '';
        ordersLoaded.value = false;
        try {
            const response = await apiClient.get('/orders'); // Empleado puede ver todos los pedidos
            orders.value = response.data;
            ordersLoaded.value = true;
        } catch (error) {
            orderMessage.value = error.response?.data?.message || 'Error al cargar pedidos.';
            console.error('Error loading orders:', error);
            ordersLoaded.value = true;
        }
    };

    // Actualizar Estado de Pedido
    const updateOrderStatus = async (orderId, status) => {
        orderMessage.value = '';
        try {
            const response = await apiClient.put(`/orders/${orderId}/status`, { status });
            orderMessage.value = response.data.message;
            await loadOrders(); // Recargar pedidos
        } catch (error) {
            orderMessage.value = error.response?.data?.message || 'Error al actualizar estado del pedido.';
            console.error('Error updating order status:', error);
        }
    };

    // Cargar Productos (para gestión de stock)
    const loadProducts = async () => {
      productMessage.value = '';
      try {
        const response = await apiClient.get('/products');
        products.value = response.data;
      } catch (error) {
        productMessage.value = error.response?.data?.message || 'Error al cargar productos.';
        console.error('Error loading products:', error);
      }
    };

    // --- Polimorfismo en Tiempo de Compilación (Sobrecarga de actualizarStock en backend) ---
    // Este frontend no envía 'motivo', activando la versión sin motivo en el backend
    const updateStockEmployee = async (productId, quantity) => {
      productMessage.value = '';
      try {
        const response = await apiClient.put(`/inventory/stock/${productId}`, { quantity });
        productMessage.value = response.data.message;
        await loadProducts(); // Recargar la lista de productos para ver el stock actualizado
      } catch (error) {
        productMessage.value = error.response?.data?.message || 'Error al actualizar stock.';
        console.error('Error updating stock:', error);
      }
    };

    // Cargar alertas de inventario
    const loadAlerts = async () => {
        alerts.value = [];
        alertsLoaded.value = false;
        try {
            const response = await apiClient.get('/inventory/alerts?type=low_stock');
            alerts.value = response.data;
            alertsLoaded.value = true;
        } catch (error) {
            console.error('Error loading alerts:', error);
            alertsLoaded.value = true;
        }
    };

    onMounted(() => {
      loadOrders();
      loadProducts();
      loadAlerts();
    });

    return {
      authStore,
      orders,
      orderMessage,
      ordersLoaded,
      loadOrders,
      updateOrderStatus,
      products,
      productMessage,
      loadProducts,
      updateStockEmployee,
      alerts,
      alertsLoaded,
      loadAlerts
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
  font-size: 0.87em;
  margin: 5px;
}
button:hover {
  background-color: #388c6a;
}
ul {
  list-style: none;
  padding: 0;
}
li {
  background-color: #f2f1f1;
  margin-bottom: 5px;
  padding: 8px;
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>