import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const loginUser = (email: string, password: string) =>
  api.post('/auth/login', { email, password });

export const registerUser = (name: string, email: string, password: string, role: string) =>
  api.post('/auth/register', { name, email, password, role });

export const getProducts = (category?: string) =>
  api.get('/products', { params: category ? { category } : {} });

export const getProduct = (id: string) => api.get(`/products/${id}`);

export const createProduct = (data: any) => api.post('/products', data);

export const createOrder = (data: any) => api.post('/orders', data);

export const getMyOrders = () => api.get('/orders/my');

export const createPaymentIntent = (amount: number) =>
  api.post('/payments/create-payment-intent', { amount });

export const confirmPayment = (orderId: string, paymentIntentId: string) =>
  api.post('/payments/confirm', { orderId, paymentIntentId });

export default api;
