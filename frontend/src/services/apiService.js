const BASE_URL = '/api';

async function fetchApi(endpoint) {
  const response = await fetch(`${BASE_URL}${endpoint.startsWith('/') ? '' : '/'}${endpoint}`);
  if (!response.ok) {
    throw new Error(`Error fetching ${endpoint}: ${response.statusText}`);
  }
  return response.json();
}

export const apiService = {
  getUsers: () => fetchApi('/users'),
  getProducts: () => fetchApi('/products'),
  getOrders: () => fetchApi('/orders'),
};
