# Quick Start Guide

Get the Smart Analytics Dashboard up and running in 5 minutes!

## Option 1: Using Docker (Recommended)

### Prerequisites
- Docker and docker-compose installed

### Steps
```bash
# Clone the repository
git clone https://github.com/manojsai7/smart-analytics-dashboard
cd smart-analytics-dashboard

# Start all services (PostgreSQL, Redis, Backend, Frontend)
docker-compose up -d

# Access the application
# Frontend: http://localhost
# Backend API: http://localhost:3000
```

That's it! The application will be running with all services.

## Option 2: Manual Setup (Development)

### Prerequisites
- Node.js 20+ and npm
- (Optional) PostgreSQL and Redis if you want to use real databases

### Steps

#### 1. Clone Repository
```bash
git clone https://github.com/manojsai7/smart-analytics-dashboard
cd smart-analytics-dashboard
```

#### 2. Setup Backend
```bash
cd backend
npm install
npm run dev
```
Backend will run on http://localhost:3000

#### 3. Setup Frontend (in a new terminal)
```bash
cd frontend
npm install
npm run dev
```
Frontend will run on http://localhost:5173

#### 4. Login
Open http://localhost:5173 in your browser and login with:
- **Admin**: admin@demo.com / admin123
- **Viewer**: viewer@demo.com / viewer123

## What's Included

### Pre-loaded Demo Data
- Sample dashboard with charts
- Two demo users (admin and viewer)
- Example widgets showing different chart types

### Available Features
- 📊 Multiple chart types (line, bar, area, pie, scatter, heatmap)
- 🎨 Dark/Light theme switcher
- 📥 Export to CSV/PNG
- 👥 Role-based access control
- 🔐 Secure JWT authentication

## Next Steps

1. **Explore the Dashboard**: Click on "Sales Dashboard" to see charts
2. **Create New Dashboard**: Click "Create New" to build your own
3. **Add Data Sources**: Navigate to "Data Sources" (admin only)
4. **Customize Theme**: Use the theme toggle on any dashboard
5. **Export Data**: Click export buttons on dashboards

## Troubleshooting

### Port Already in Use
If port 3000 or 5173 is already in use:
- Backend: Change `PORT` in `backend/.env`
- Frontend: Vite will automatically try next available port

### Dependencies Issues
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Docker Issues
```bash
# Stop all containers
docker-compose down

# Rebuild and restart
docker-compose up --build -d
```

## Production Deployment

For production deployment, see the main [README.md](README.md) for detailed instructions.

## Need Help?

- Check the main [README.md](README.md) for detailed documentation
- See [CONTRIBUTING.md](CONTRIBUTING.md) for development guidelines
- Open an issue on GitHub for questions

---

Happy analyzing! 📊
