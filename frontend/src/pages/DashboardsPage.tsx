import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Trash2, Edit } from 'lucide-react';
import { Layout } from '../components/Layout';
import { dashboardService } from '../services/api';
import type { Dashboard } from '../types';

export const DashboardsPage = () => {
  const navigate = useNavigate();
  const [dashboards, setDashboards] = useState<Dashboard[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboards();
  }, []);

  const loadDashboards = async () => {
    try {
      const data = await dashboardService.getDashboards();
      setDashboards(data);
    } catch (error) {
      console.error('Failed to load dashboards:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this dashboard?')) {
      try {
        await dashboardService.deleteDashboard(id);
        loadDashboards();
      } catch (error) {
        console.error('Failed to delete dashboard:', error);
      }
    }
  };

  const handleCreateNew = async () => {
    try {
      const newDashboard = await dashboardService.createDashboard({
        name: 'New Dashboard',
        widgets: [],
        theme: 'light',
      });
      navigate(`/dashboard/${newDashboard.id}`);
    } catch (error) {
      console.error('Failed to create dashboard:', error);
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

  return (
    <Layout>
      <div>
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Dashboards</h1>
          <button
            onClick={handleCreateNew}
            className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus size={20} />
            <span>Create New</span>
          </button>
        </div>

        {dashboards.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <p className="text-gray-500 mb-4">No dashboards yet</p>
            <button
              onClick={handleCreateNew}
              className="text-blue-600 hover:text-blue-700"
            >
              Create your first dashboard
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dashboards.map((dashboard) => (
              <div
                key={dashboard.id}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => navigate(`/dashboard/${dashboard.id}`)}
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-semibold text-gray-800">{dashboard.name}</h3>
                  <div className="flex space-x-2" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/dashboard/${dashboard.id}/edit`);
                      }}
                      className="text-gray-600 hover:text-blue-600"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(dashboard.id);
                      }}
                      className="text-gray-600 hover:text-red-600"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
                {dashboard.description && (
                  <p className="text-gray-600 text-sm mb-4">{dashboard.description}</p>
                )}
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span>{dashboard.widgets.length} widgets</span>
                  <span className="capitalize">{dashboard.theme}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};
