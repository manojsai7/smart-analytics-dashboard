-- PostgreSQL Database Schema for Smart Analytics Dashboard

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL CHECK (role IN ('admin', 'viewer')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Dashboards table
CREATE TABLE IF NOT EXISTS dashboards (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    theme VARCHAR(50) DEFAULT 'light' CHECK (theme IN ('light', 'dark')),
    widgets JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Data sources table
CREATE TABLE IF NOT EXISTS data_sources (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    type VARCHAR(50) NOT NULL CHECK (type IN ('sql', 'csv', 'api')),
    config JSONB NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Scheduled reports table
CREATE TABLE IF NOT EXISTS scheduled_reports (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    dashboard_id UUID REFERENCES dashboards(id) ON DELETE CASCADE,
    email_to VARCHAR(255) NOT NULL,
    schedule_cron VARCHAR(100) NOT NULL,
    format VARCHAR(50) DEFAULT 'csv' CHECK (format IN ('csv', 'png')),
    enabled BOOLEAN DEFAULT true,
    last_sent_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes
CREATE INDEX idx_dashboards_user_id ON dashboards(user_id);
CREATE INDEX idx_scheduled_reports_dashboard_id ON scheduled_reports(dashboard_id);
CREATE INDEX idx_scheduled_reports_enabled ON scheduled_reports(enabled);

-- Insert demo users
INSERT INTO users (email, password_hash, name, role) VALUES
    ('admin@demo.com', '$2a$10$XqZJQP.J3kX8J5XJ9K5X5O8X5J9K5X5O8X5J9K5X5O8X5J9K5X5O', 'Admin User', 'admin'),
    ('viewer@demo.com', '$2a$10$XqZJQP.J3kX8J5XJ9K5X5O8X5J9K5X5O8X5J9K5X5O8X5J9K5X5O', 'Viewer User', 'viewer')
ON CONFLICT (email) DO NOTHING;
