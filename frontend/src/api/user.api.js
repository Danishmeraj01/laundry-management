import api from './axios';

export const getUsersApi = () => api.get('/users');