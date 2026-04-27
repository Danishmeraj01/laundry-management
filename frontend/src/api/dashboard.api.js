import api from './axios';

export const getStatsApi = () => api.get('/dashboard/stats');