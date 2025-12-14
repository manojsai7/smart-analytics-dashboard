import { Router } from 'express';
import { authenticateToken, AuthRequest } from '../middleware/auth';

const router = Router();

// In-memory dashboard store (replace with database in production)
const dashboards: any[] = [
  {
    id: '1',
    name: 'Sales Dashboard',
    description: 'Overview of sales metrics',
    userId: '1',
    theme: 'light',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    widgets: [
      {
        id: 'w1',
        type: 'line',
        title: 'Monthly Revenue',
        position: { x: 0, y: 0 },
        size: { width: 2, height: 1 },
        data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
          datasets: [
            {
              label: 'Revenue',
              data: [12000, 19000, 15000, 25000, 22000, 30000],
            },
          ],
        },
      },
      {
        id: 'w2',
        type: 'bar',
        title: 'Top Products',
        position: { x: 2, y: 0 },
        size: { width: 1, height: 1 },
        data: {
          labels: ['Product A', 'Product B', 'Product C', 'Product D'],
          datasets: [
            {
              label: 'Sales',
              data: [300, 450, 280, 520],
            },
          ],
        },
      },
      {
        id: 'w3',
        type: 'pie',
        title: 'Market Share',
        position: { x: 0, y: 1 },
        size: { width: 1, height: 1 },
        data: {
          labels: ['North', 'South', 'East', 'West'],
          datasets: [
            {
              label: 'Market Share',
              data: [35, 25, 20, 20],
            },
          ],
        },
      },
    ],
  },
];

// Get all dashboards
router.get('/', authenticateToken, (req: AuthRequest, res) => {
  // Filter by user role
  const userDashboards = dashboards.filter((d) => 
    req.user?.role === 'admin' || d.userId === req.user?.id
  );
  res.json(userDashboards);
});

// Get single dashboard
router.get('/:id', authenticateToken, (req: AuthRequest, res) => {
  const dashboard = dashboards.find((d) => d.id === req.params.id);
  
  if (!dashboard) {
    return res.status(404).json({ message: 'Dashboard not found' });
  }

  if (req.user?.role !== 'admin' && dashboard.userId !== req.user?.id) {
    return res.status(403).json({ message: 'Access denied' });
  }

  res.json(dashboard);
});

// Create dashboard
router.post('/', authenticateToken, (req: AuthRequest, res) => {
  const newDashboard = {
    id: String(dashboards.length + 1),
    name: req.body.name || 'New Dashboard',
    description: req.body.description || '',
    userId: req.user?.id,
    theme: req.body.theme || 'light',
    widgets: req.body.widgets || [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  dashboards.push(newDashboard);
  res.status(201).json(newDashboard);
});

// Update dashboard
router.put('/:id', authenticateToken, (req: AuthRequest, res) => {
  const index = dashboards.findIndex((d) => d.id === req.params.id);
  
  if (index === -1) {
    return res.status(404).json({ message: 'Dashboard not found' });
  }

  if (req.user?.role !== 'admin' && dashboards[index].userId !== req.user?.id) {
    return res.status(403).json({ message: 'Access denied' });
  }

  dashboards[index] = {
    ...dashboards[index],
    ...req.body,
    id: dashboards[index].id,
    userId: dashboards[index].userId,
    updatedAt: new Date().toISOString(),
  };

  res.json(dashboards[index]);
});

// Delete dashboard
router.delete('/:id', authenticateToken, (req: AuthRequest, res) => {
  const index = dashboards.findIndex((d) => d.id === req.params.id);
  
  if (index === -1) {
    return res.status(404).json({ message: 'Dashboard not found' });
  }

  if (req.user?.role !== 'admin' && dashboards[index].userId !== req.user?.id) {
    return res.status(403).json({ message: 'Access denied' });
  }

  dashboards.splice(index, 1);
  res.status(204).send();
});

export default router;
