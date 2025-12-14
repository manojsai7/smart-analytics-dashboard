# Smart Analytics Dashboard

Interactive analytics and visualization dashboard for business intelligence.

![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)

## 🚀 Features

- **Pluggable Data Sources**: Connect to SQL databases, CSV/Parquet files, and REST APIs
- **Chart Gallery**: Visualize data with line, bar, area, pie, scatter, and heatmap charts
- **Dashboard Builder**: Create custom dashboards with saved layouts and theming
- **Role-Based Access**: Granular permissions with admin and viewer roles
- **Export Capabilities**: Export dashboards and widgets to CSV or PNG
- **Scheduled Reports**: Automated email reports on a schedule
- **Extensible Widget System**: Easy to add new chart types and widgets
- **Dark/Light Theme**: User-customizable theme switcher
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## 🛠️ Tech Stack

### Frontend
- **React** with TypeScript for type-safe component development
- **Vite** for blazing-fast build tooling
- **Tailwind CSS** for utility-first styling
- **Recharts** for beautiful, responsive charts
- **React Router** for client-side routing
- **Zustand** for lightweight state management
- **Axios** for API communication

### Backend
- **Node.js** with Express and TypeScript
- **JWT** for secure authentication
- **bcryptjs** for password hashing
- **PostgreSQL** as primary database
- **Redis** for caching and session management

### DevOps
- **Docker** and **docker-compose** for containerization
- **Nginx** for frontend serving and reverse proxy

## 📋 Prerequisites

- Node.js 20+ and npm
- Docker and docker-compose (for containerized deployment)
- PostgreSQL 16+ (if running without Docker)
- Redis 7+ (if running without Docker)

## 🚀 Getting Started

### Quick Start with Docker

The easiest way to get started is using Docker Compose:

```bash
# Clone the repository
git clone https://github.com/manojsai7/smart-analytics-dashboard
cd smart-analytics-dashboard

# Start all services
docker-compose up -d

# Access the application
# Frontend: http://localhost
# Backend API: http://localhost:3000
```

### Manual Installation

#### 1. Clone the Repository

```bash
git clone https://github.com/manojsai7/smart-analytics-dashboard
cd smart-analytics-dashboard
```

#### 2. Setup Backend

```bash
cd backend

# Install dependencies
npm install

# Copy environment file and configure
cp .env.example .env
# Edit .env with your database and Redis credentials

# Initialize the database (if using PostgreSQL)
psql -U postgres -d analytics_db -f schema.sql

# Start the development server
npm run dev
```

The backend will start on `http://localhost:3000`

#### 3. Setup Frontend

```bash
cd frontend

# Install dependencies
npm install

# Copy environment file and configure
cp .env.example .env
# Edit .env to point to your backend API

# Start the development server
npm run dev
```

The frontend will start on `http://localhost:5173`

## 🔧 Configuration

### Backend Environment Variables

Create a `.env` file in the `backend` directory:

```env
PORT=3000
JWT_SECRET=your-secret-key-change-in-production

# Database (PostgreSQL)
DB_HOST=localhost
DB_PORT=5432
DB_NAME=analytics_db
DB_USER=postgres
DB_PASSWORD=postgres

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379

# CORS
CORS_ORIGIN=http://localhost:5173
```

### Frontend Environment Variables

Create a `.env` file in the `frontend` directory:

```env
VITE_API_URL=http://localhost:3000/api
```

## 👥 Demo Credentials

The application comes with pre-configured demo users:

- **Admin User**
  - Email: `admin@demo.com`
  - Password: `admin123`
  - Full access to all features

- **Viewer User**
  - Email: `viewer@demo.com`
  - Password: `viewer123`
  - Read-only access to dashboards

## 📊 Usage

### Creating a Dashboard

1. Log in with your credentials
2. Navigate to "Dashboards" in the sidebar
3. Click "Create New" button
4. Add widgets by selecting chart types and configuring data sources
5. Customize the layout and theme
6. Save your dashboard

### Connecting Data Sources

1. Navigate to "Data Sources" (admin only)
2. Click "Add Data Source"
3. Choose the source type (SQL, CSV, or API)
4. Configure connection settings
5. Test and save the connection

### Exporting Data

- Click the export button on any dashboard or widget
- Choose format (CSV or PNG)
- Download will start automatically

## 🗄️ Database Schema

The application uses PostgreSQL with the following main tables:

- `users` - User accounts and authentication
- `dashboards` - Dashboard configurations and widgets
- `data_sources` - Data source connections
- `scheduled_reports` - Automated report schedules

See `backend/schema.sql` for the complete schema definition.

## 🏗️ Project Structure

```
smart-analytics-dashboard/
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/           # Page components
│   │   ├── services/        # API service layer
│   │   ├── hooks/           # Custom React hooks
│   │   ├── types/           # TypeScript type definitions
│   │   └── utils/           # Utility functions
│   ├── Dockerfile
│   └── nginx.conf
├── backend/                  # Express backend API
│   ├── src/
│   │   ├── routes/          # API route handlers
│   │   ├── middleware/      # Express middleware
│   │   ├── models/          # Data models
│   │   └── services/        # Business logic
│   ├── schema.sql           # Database schema
│   └── Dockerfile
├── docker-compose.yml        # Docker orchestration
└── README.md
```

## 🔐 Security

- Passwords are hashed using bcrypt
- JWT tokens for stateless authentication
- Role-based access control (RBAC)
- CORS protection
- SQL injection prevention with parameterized queries
- XSS protection through React's built-in escaping

**Important**: Change the `JWT_SECRET` in production!

## 🚀 Production Deployment

### Using Docker

```bash
# Build production images
docker-compose build

# Start services in production mode
docker-compose up -d

# View logs
docker-compose logs -f
```

### Manual Deployment

#### Backend

```bash
cd backend
npm install
npm run build
npm start
```

#### Frontend

```bash
cd frontend
npm install
npm run build
# Serve the dist/ folder with nginx or any static file server
```

## 🗺️ Roadmap

- [ ] Drag-and-drop query builder for custom data exploration
- [ ] Data alerts and anomaly detection with notifications
- [ ] Multi-tenant support with isolated data
- [ ] Advanced dark/light theme customization
- [ ] Real-time data updates with WebSockets
- [ ] More chart types (gantt, treemap, sunburst)
- [ ] Dashboard templates and presets
- [ ] Collaborative editing and sharing
- [ ] Mobile app (React Native)
- [ ] Advanced filtering and drill-down capabilities

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📧 Support

For questions or support, please open an issue on GitHub.

---

**Built with ❤️ for the data community**
