-- Test users for protected routes
-- Run this after setting up your database

-- Regular user
INSERT INTO users (name, email, password, role) VALUES
('John Customer', 'customer@example.com', 'password123', 'customer');

-- Admin user
INSERT INTO users (name, email, password, role) VALUES
('Admin User', 'admin@example.com', 'admin123', 'admin');

-- Staff user
INSERT INTO users (name, email, password, role) VALUES
('Staff Member', 'staff@example.com', 'staff123', 'staff');

-- Query to check users
-- SELECT id, name, email, role FROM users;