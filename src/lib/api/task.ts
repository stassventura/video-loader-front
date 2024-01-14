import api from './index';

export const taskApi = {
  getAll: async () => {
    const response = await api.get('/api/status-info');
    return response;
  },
  clearAll: async () => {
    const response = await api.get('/api/clear');
    return response;
  },
};
