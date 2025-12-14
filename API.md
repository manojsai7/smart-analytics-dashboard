# API Documentation

REST API documentation for Smart Analytics Dashboard backend.

## Base URL

```
http://localhost:3000/api
```

## Authentication

Most endpoints require authentication via JWT token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

## Rate Limiting

All endpoints are rate-limited to **100 requests per 15 minutes per IP**.

---

## Authentication Endpoints

### POST /auth/login

Login with email and password.

**Request:**
```json
{
  "email": "admin@demo.com",
  "password": "admin123"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "1",
    "email": "admin@demo.com",
    "name": "Admin User",
    "role": "admin"
  }
}
```

**Status Codes:**
- `200` - Success
- `401` - Invalid credentials
- `500` - Server error

---

### POST /auth/register

Register a new user (creates viewer role by default).

**Request:**
```json
{
  "email": "newuser@example.com",
  "password": "securepassword",
  "name": "New User"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "3",
    "email": "newuser@example.com",
    "name": "New User",
    "role": "viewer"
  }
}
```

**Status Codes:**
- `200` - Success
- `400` - User already exists
- `500` - Server error

---

### GET /auth/me

Get current authenticated user information.

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "id": "1",
  "email": "admin@demo.com",
  "name": "Admin User",
  "role": "admin"
}
```

**Status Codes:**
- `200` - Success
- `401` - Unauthorized (no token)
- `403` - Forbidden (invalid token)
- `404` - User not found

---

## Dashboard Endpoints

### GET /dashboards

Get all dashboards accessible to the current user.

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
[
  {
    "id": "1",
    "name": "Sales Dashboard",
    "description": "Overview of sales metrics",
    "userId": "1",
    "theme": "light",
    "widgets": [...],
    "createdAt": "2024-12-14T10:00:00Z",
    "updatedAt": "2024-12-14T10:00:00Z"
  }
]
```

**Status Codes:**
- `200` - Success
- `401` - Unauthorized

---

### GET /dashboards/:id

Get a specific dashboard by ID.

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "id": "1",
  "name": "Sales Dashboard",
  "description": "Overview of sales metrics",
  "userId": "1",
  "theme": "light",
  "widgets": [
    {
      "id": "w1",
      "type": "line",
      "title": "Monthly Revenue",
      "position": { "x": 0, "y": 0 },
      "size": { "width": 2, "height": 1 },
      "data": {
        "labels": ["Jan", "Feb", "Mar"],
        "datasets": [...]
      }
    }
  ],
  "createdAt": "2024-12-14T10:00:00Z",
  "updatedAt": "2024-12-14T10:00:00Z"
}
```

**Status Codes:**
- `200` - Success
- `401` - Unauthorized
- `403` - Access denied (not owner or admin)
- `404` - Dashboard not found

---

### POST /dashboards

Create a new dashboard.

**Headers:**
```
Authorization: Bearer <token>
```

**Request:**
```json
{
  "name": "New Dashboard",
  "description": "My custom dashboard",
  "theme": "light",
  "widgets": []
}
```

**Response:**
```json
{
  "id": "2",
  "name": "New Dashboard",
  "description": "My custom dashboard",
  "userId": "1",
  "theme": "light",
  "widgets": [],
  "createdAt": "2024-12-14T10:00:00Z",
  "updatedAt": "2024-12-14T10:00:00Z"
}
```

**Status Codes:**
- `201` - Created
- `401` - Unauthorized

---

### PUT /dashboards/:id

Update an existing dashboard.

**Headers:**
```
Authorization: Bearer <token>
```

**Request:**
```json
{
  "name": "Updated Dashboard Name",
  "theme": "dark"
}
```

**Response:**
```json
{
  "id": "1",
  "name": "Updated Dashboard Name",
  "theme": "dark",
  ...
}
```

**Status Codes:**
- `200` - Success
- `401` - Unauthorized
- `403` - Access denied (not owner or admin)
- `404` - Dashboard not found

---

### DELETE /dashboards/:id

Delete a dashboard.

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```
(empty body)
```

**Status Codes:**
- `204` - Success (no content)
- `401` - Unauthorized
- `403` - Access denied (not owner or admin)
- `404` - Dashboard not found

---

## Data Source Endpoints

### GET /datasources

Get all configured data sources.

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
[
  {
    "id": "1",
    "name": "Sales DB",
    "type": "sql",
    "config": {...},
    "createdAt": "2024-12-14T10:00:00Z"
  }
]
```

**Status Codes:**
- `200` - Success
- `401` - Unauthorized

---

### POST /datasources

Create a new data source (admin only).

**Headers:**
```
Authorization: Bearer <token>
```

**Request:**
```json
{
  "name": "My Data Source",
  "type": "csv",
  "config": {
    "url": "https://example.com/data.csv"
  }
}
```

**Response:**
```json
{
  "id": "2",
  "name": "My Data Source",
  "type": "csv",
  "config": {...},
  "createdAt": "2024-12-14T10:00:00Z"
}
```

**Status Codes:**
- `201` - Created
- `401` - Unauthorized
- `403` - Forbidden (not admin)

---

### POST /datasources/test

Test a data source connection (admin only).

**Headers:**
```
Authorization: Bearer <token>
```

**Request:**
```json
{
  "type": "sql",
  "config": {
    "host": "localhost",
    "port": 5432,
    "database": "mydb"
  }
}
```

**Response:**
```json
{
  "success": true,
  "message": "Successfully connected to sql data source"
}
```

**Status Codes:**
- `200` - Success
- `400` - Connection failed
- `401` - Unauthorized
- `403` - Forbidden (not admin)

---

### DELETE /datasources/:id

Delete a data source (admin only).

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```
(empty body)
```

**Status Codes:**
- `204` - Success (no content)
- `401` - Unauthorized
- `403` - Forbidden (not admin)
- `404` - Data source not found

---

## Export Endpoints

### POST /export

Export a dashboard or widget.

**Headers:**
```
Authorization: Bearer <token>
```

**Request:**
```json
{
  "format": "png",
  "dashboardId": "1",
  "widgetId": "w1"
}
```

**Response:**
Binary data (image or CSV file)

**Status Codes:**
- `200` - Success
- `400` - Unsupported format
- `401` - Unauthorized
- `500` - Export failed

---

## Error Response Format

All error responses follow this format:

```json
{
  "message": "Error description"
}
```

---

## Demo Credentials

For testing purposes, use these pre-configured accounts:

**Admin User:**
- Email: `admin@demo.com`
- Password: `admin123`
- Access: Full (can manage users, data sources, all dashboards)

**Viewer User:**
- Email: `viewer@demo.com`
- Password: `viewer123`
- Access: Read-only (can view dashboards)

---

## Notes

1. All timestamps are in ISO 8601 format
2. IDs are strings
3. The backend uses in-memory storage (data resets on restart)
4. For production, replace in-memory stores with database queries
5. JWT tokens expire after 7 days

## Support

For issues or questions, please open a GitHub issue.
