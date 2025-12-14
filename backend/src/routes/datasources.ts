import { Router } from 'express';
import { authenticateToken, AuthRequest, requireAdmin } from '../middleware/auth.js';

const router = Router();

// In-memory data source store (replace with database in production)
const dataSources: any[] = [];

// Get all data sources
router.get('/', authenticateToken, (req: AuthRequest, res) => {
  res.json(dataSources);
});

// Create data source (admin only)
router.post('/', authenticateToken, requireAdmin, (req: AuthRequest, res) => {
  const newDataSource = {
    id: String(dataSources.length + 1),
    name: req.body.name,
    type: req.body.type,
    config: req.body.config || {},
    createdAt: new Date().toISOString(),
  };

  dataSources.push(newDataSource);
  res.status(201).json(newDataSource);
});

// Test connection
router.post('/test', authenticateToken, requireAdmin, async (req: AuthRequest, res) => {
  // Mock connection test
  // In production, implement actual connection tests for SQL, CSV, API
  const { type, config } = req.body;

  try {
    // Simulate connection test
    await new Promise((resolve) => setTimeout(resolve, 1000));
    res.json({ success: true, message: `Successfully connected to ${type} data source` });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Connection failed' });
  }
});

// Delete data source (admin only)
router.delete('/:id', authenticateToken, requireAdmin, (req: AuthRequest, res) => {
  const index = dataSources.findIndex((ds) => ds.id === req.params.id);
  
  if (index === -1) {
    return res.status(404).json({ message: 'Data source not found' });
  }

  dataSources.splice(index, 1);
  res.status(204).send();
});

export default router;
