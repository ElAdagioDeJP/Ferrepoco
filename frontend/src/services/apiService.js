const BASE_URL = '/api';

async function fetchApi(endpoint, options = {}) {
  const response = await fetch(`${BASE_URL}${endpoint.startsWith('/') ? '' : '/'}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers
    },
    ...options
  });

  if (!response.ok) {
    throw new Error(`Error fetching ${endpoint}: ${response.statusText}`);
  }
  return response.json();
}

export const apiService = {
  getUsers: () => fetchApi('/users'),
  getProducts: () => fetchApi('/products'),
  getOrders: () => fetchApi('/orders'),

  // Agregar función para actualizar orden
  updateOrderStatus: (orderId, status) =>
    fetchApi(`/orders/${orderId}`, {
      method: 'PUT',
      body: JSON.stringify({ status })
    })
};