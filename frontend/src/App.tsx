import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { LoginPage } from './pages/LoginPage';
import { DashboardsPage } from './pages/DashboardsPage';
import { DashboardViewPage } from './pages/DashboardViewPage';
import { DataSourcesPage } from './pages/DataSourcesPage';
import { useAuthStore } from './hooks/useAuth';

const queryClient = new QueryClient();

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuthStore();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/dashboards"
            element={
              <ProtectedRoute>
                <DashboardsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/:id"
            element={
              <ProtectedRoute>
                <DashboardViewPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/datasources"
            element={
              <ProtectedRoute>
                <DataSourcesPage />
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<Navigate to="/dashboards" />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
