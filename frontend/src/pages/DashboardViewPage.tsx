import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Download, Moon, Sun } from 'lucide-react';
import { Layout } from '../components/Layout';
import { Chart } from '../components/Chart';
import { dashboardService, exportService } from '../services/api';
import type { Dashboard } from '../types';

export const DashboardViewPage = () => {
  const { id } = useParams<{ id: string }>();
  const [dashboard, setDashboard] = useState<Dashboard | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      loadDashboard(id);
    }
  }, [id]);

  const loadDashboard = async (dashboardId: string) => {
    try {
      const data = await dashboardService.getDashboard(dashboardId);
      setDashboard(data);
    } catch (error) {
      console.error('Failed to load dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleTheme = async () => {
    if (!dashboard || !id) return;
    const newTheme = dashboard.theme === 'light' ? 'dark' : 'light';
    try {
      const updated = await dashboardService.updateDashboard(id, {
        theme: newTheme,
      });
      setDashboard(updated);
    } catch (error) {
      console.error('Failed to update theme:', error);
    }
  };

  const handleExport = async (widgetId?: string) => {
    if (!id) return;
    try {
      const blob = await exportService.exportWidget({
        format: 'png',
        dashboardId: id,
        widgetId,
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${dashboard?.name || 'dashboard'}-export.png`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Failed to export:', error);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-64">
          <div className="text-xl text-gray-600">Loading...</div>
        </div>
      </Layout>
    );
  }

  if (!dashboard) {
    return (
      <Layout>
        <div className="text-center py-12">
          <p className="text-gray-500">Dashboard not found</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className={dashboard.theme === 'dark' ? 'dark' : ''}>
        <div className={dashboard.theme === 'dark' ? 'bg-gray-900 text-white min-h-screen -m-8 p-8' : ''}>
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold">{dashboard.name}</h1>
              {dashboard.description && (
                <p className="text-gray-600 dark:text-gray-400 mt-2">{dashboard.description}</p>
              )}
            </div>
            <div className="flex space-x-2">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
              >
                {dashboard.theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
              </button>
              <button
                onClick={() => handleExport()}
                className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Download size={20} />
                <span>Export</span>
              </button>
            </div>
          </div>

          {dashboard.widgets.length === 0 ? (
            <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow">
              <p className="text-gray-500 dark:text-gray-400">No widgets in this dashboard</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {dashboard.widgets.map((widget) => (
                <div
                  key={widget.id}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow"
                  style={{
                    gridColumn: `span ${widget.size.width}`,
                    gridRow: `span ${widget.size.height}`,
                  }}
                >
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold">{widget.title}</h3>
                    <button
                      onClick={() => handleExport(widget.id)}
                      className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                    >
                      <Download size={16} />
                    </button>
                  </div>
                  <Chart
                    type={widget.type}
                    data={widget.data.datasets.map((ds, idx) => ({
                      name: widget.data.labels[idx] || `Item ${idx + 1}`,
                      value: ds.data[0] || 0,
                    }))}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};
