# Sistemi i Menaxhimit të Inventarit (Full-Stack)

Ky projekt është ndërtuar për mbrojtjen e lëndës, duke përdorur **React (Vite)** në Frontend, **NestJS** në Backend dhe **Microsoft SQL Server** si Databazë.

# Inventory Management System (Full-Stack)

This project was developed as a graduation project, using React (Vite) for the Frontend, NestJS for the Backend, and Microsoft SQL Server as the Database.

Tech Stack
Frontend
React.js
React Router
CSS / Custom UI
Backend
Node.js
NestJS
TypeScript
TypeORM
REST API
Database
Microsoft SQL Server
Relational Database
3NF Normalization
SQL Queries
CRUD & JOIN Operations
Other
Exchange Rate API
Git & GitHub
Environment Variables
Asynchronous Processing
Features
JWT Authentication
Admin & Staff roles
Product management
Category management
Supplier management
Customer management
Order management
Dashboard & statistics
Search & filtering
Low-stock products
Currency conversion
Data validation
Error handling
Main Modules
Authentication & Users
Admin and Staff roles
Role-based access control
User management
Products
Create, read, update and delete products
Search and filtering
Stock management
Category & supplier relationships
Categories
CRUD operations
Search
One category → many products
Suppliers
CRUD operations
Search & filtering
One supplier → many products
Customers
CRUD operations
Search & filtering
Order history
Orders
Create and manage orders
Add products and quantities
Calculate order totals
Update order status
Dashboard

The dashboard provides an overview of the store, including:

Total products
Total categories
Total suppliers
Total customers
Total orders
Total stock
Inventory value
Low-stock products
Orders by customer
Currency

The application integrates with an Exchange Rate API to convert product prices between currencies.

The API key is stored securely in environment variables.

Database

The database is designed using a relational structure and normalized up to Third Normal Form (3NF).

Main Tables
Users
Categories
Suppliers
Products
Customers
Orders
OrderItems
Relationships
Category 1 ──── N Product
Supplier 1 ──── N Product
Customer 1 ──── N Order
Order 1 ──── N OrderItem
Product 1 ──── N OrderItem

OrderItems connects Orders and Products and allows one order to contain multiple products.

REST API

Main endpoints:

/auth
/users
/products
/categories
/suppliers
/customers
/orders


Example:

GET    /products
GET    /products/:id
POST   /products
PATCH  /products/:id
DELETE /products/:id


Search and filtering:

GET /products?search=laptop
GET /products?categoryId=1
GET /products?lowStock=true

GET /orders?customerId=1
GET /orders?status=COMPLETED

SQL Examples
Total Stock
SELECT SUM(Stock) AS TotalStock
FROM Products;

Low Stock Products
SELECT *
FROM Products
WHERE Stock < 10;

Orders by Customer
SELECT
    c.Name,
    COUNT(o.OrderId) AS TotalOrders
FROM Customers c
LEFT JOIN Orders o
    ON c.CustomerId = o.CustomerId
GROUP BY c.Name;

Getting Started
1. Backend
cd backend
npm run start:dev


Create a .env file:

PORT=your_port

DB_HOST=your_db_host
DB_PORT=your_db_port
DB_USERNAME=your_db_username
DB_PASSWORD=your_db_password
DB_DATABASE=your_db_database

JWT_SECRET=your_jwt_secret
EXCHANGE_RATE_API_KEY=your_api_key

3. Frontend
cd frontend
npm run dev

About the Project

Inventory & Order Management System is a full-stack application designed to simplify store management while demonstrating practical use of modern web development technologies.

Made with love and a little bit of code magic.