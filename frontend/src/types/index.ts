export interface User {
  id: string;
  email: string;
  role: 'admin' | 'viewer';
  name: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}

export type ChartType = 'line' | 'bar' | 'area' | 'pie' | 'scatter' | 'heatmap';

export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor?: string | string[];
    borderColor?: string;
    fill?: boolean;
  }[];
}

export interface Widget {
  id: string;
  type: ChartType;
  title: string;
  data: ChartData;
  position: { x: number; y: number };
  size: { width: number; height: number };
}

export interface Dashboard {
  id: string;
  name: string;
  description?: string;
  widgets: Widget[];
  theme: 'light' | 'dark';
  createdAt: string;
  updatedAt: string;
  userId: string;
}

export interface DataSource {
  id: string;
  name: string;
  type: 'sql' | 'csv' | 'api';
  config: Record<string, any>;
  createdAt: string;
}

export interface ExportOptions {
  format: 'csv' | 'png';
  widgetId?: string;
  dashboardId: string;
}
