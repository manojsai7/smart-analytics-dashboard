import axios from 'axios';
import type { User, Dashboard, DataSource, ExportOptions } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth endpoints
export const authService = {
  login: async (email: string, password: string) => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },
  register: async (email: string, password: string, name: string) => {
    const response = await api.post('/auth/register', { email, password, name });
    return response.data;
  },
  getCurrentUser: async (): Promise<User> => {
    const response = await api.get('/auth/me');
    return response.data;
  },
};

// Dashboard endpoints
export const dashboardService = {
  getDashboards: async (): Promise<Dashboard[]> => {
    const response = await api.get('/dashboards');
    return response.data;
  },
  getDashboard: async (id: string): Promise<Dashboard> => {
    const response = await api.get(`/dashboards/${id}`);
    return response.data;
  },
  createDashboard: async (dashboard: Partial<Dashboard>): Promise<Dashboard> => {
    const response = await api.post('/dashboards', dashboard);
    return response.data;
  },
  updateDashboard: async (id: string, dashboard: Partial<Dashboard>): Promise<Dashboard> => {
    const response = await api.put(`/dashboards/${id}`, dashboard);
    return response.data;
  },
  deleteDashboard: async (id: string): Promise<void> => {
    await api.delete(`/dashboards/${id}`);
  },
};

// Data source endpoints
export const dataSourceService = {
  getDataSources: async (): Promise<DataSource[]> => {
    const response = await api.get('/datasources');
    return response.data;
  },
  createDataSource: async (dataSource: Partial<DataSource>): Promise<DataSource> => {
    const response = await api.post('/datasources', dataSource);
    return response.data;
  },
  testConnection: async (config: Record<string, any>): Promise<boolean> => {
    const response = await api.post('/datasources/test', config);
    return response.data.success;
  },
};

// Export endpoints
export const exportService = {
  exportWidget: async (options: ExportOptions): Promise<Blob> => {
    const response = await api.post('/export', options, {
      responseType: 'blob',
    });
    return response.data;
  },
};

export default api;
