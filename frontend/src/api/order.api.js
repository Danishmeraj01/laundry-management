import api from './axios';

export const getOrdersApi    = ()         => api.get('/orders');
export const getOrderByIdApi = (id)       => api.get(`/orders/${id}`);
export const createOrderApi  = (data)     => api.post('/orders', data);
export const updateStatusApi = (id, status) => api.patch(`/orders/${id}/status`, { status });
export const deleteOrderApi  = (id)       => api.delete(`/orders/${id}`);