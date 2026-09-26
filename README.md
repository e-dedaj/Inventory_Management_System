# Inventory Management System (Full-Stack)

This project was developed using React (Vite) for the Frontend, NestJS for the Backend, and Microsoft SQL Server as the Database.

# 🚀 Tech Stack
# Frontend
* React.js
* React Router
* CSS / Custom UI
# Backend
* NestJS
* Node.js
* TypeScript
* TypeORM
* REST API
# Database
* Microsoft SQL Server
* Relational Database
* 3NF Normalization
* SQL Queries
* CRUD & JOIN Operations
# Other
* Exchange Rate API
* Git & GitHub
* Environment Variables
* Asynchronous Processing
# ✨Features
* JWT Authentication
* Admin & Staff roles
* Product management
* Category management
* Supplier management
* Customer management
* Order management
* Dashboard & statistics
* Search & filtering
* Low-stock products
* Currency conversion
* Data validation
* Error handling
# 🧩Main Modules
# Authentication & Users
* Admin and Staff roles
* Role-based access control
* User management
# Products
* Create, read, update and delete products
* Search and filvetetering
* Stock management
* Category & supplier relationships
# Categories
* CRUD operations
* Search
* One category → many products
# Suppliers
* CRUD operations
* Search & filtering
* One supplier → many products
# Customers
* CRUD operations
* Search & filtering
* Order history
# Orders
* Create and manage orders
* Add products and quantities
* Calculate order totals
* Update order status
# Dashboard
The dashboard provides an overview of the store, including:

* Total products
* Total categories
* Total suppliers
* Total customers
* Total orders
* Total stock
* Inventory value
* Low-stock products
* Orders by customer
* Currency

The application integrates with an Exchange Rate API to convert product prices between currencies.

The API key is stored securely in environment variables.

# Database
The database is designed using a relational structure and normalized up to Third Normal Form (3NF).

# Main Tables
* Users
* Categories
* Suppliers
* Products
* Customers
* Orders
* OrderItems

# Relationships
Category 1 ──── N Product<br>
Supplier 1 ──── N Product<br>
Customer 1 ──── N Order<br>
Order 1 ──── N OrderItem<br>
Product 1 ──── N OrderItem<br>

OrderItems connects Orders and Products and allows one order to contain multiple products.

# 🌐REST API
# Main endpoints:

/auth<br>
/users<br>
/products<br>
/categories<br>
/suppliers<br>
/customers<br>
/orders<br>

# Example:

GET    /products<br>
GET    /products/:id<br>
POST   /products<br>
PATCH  /products/:id<br>
DELETE /products/:id<br>

# Search and filtering:

GET /products?search=laptop<br>
GET /products?categoryId=1<br>
GET /products?lowStock=true<br>
<br>
GET /orders?customerId=1<br>
GET /orders?status=COMPLETED<br>

# SQL Examples
# Total Stock
SELECT SUM(Stock) AS TotalStock<br>
FROM Products;<br>

# Low Stock Products
SELECT *<br>
FROM Products<br>
WHERE Stock < 10;<br>

# Orders by Customer
SELECT c.Name, COUNT(o.OrderId) AS TotalOrders<br>
FROM Customers c<br>
LEFT JOIN Orders o ON c.CustomerId = o.CustomerId<br>
GROUP BY c.Name;<br>


# 📌Getting Started
# 1. Backend
cd backend<br>
npm run start:dev<br>

Create a .env file:

PORT=your_port<br>
DB_HOST=your_db_host<br>
DB_PORT=your_db_port<br>
DB_USERNAME=your_db_username<br>
DB_PASSWORD=your_db_password<br>
DB_DATABASE=your_db_database<br>
JWT_SECRET=your_jwt_secret<br>
EXCHANGE_RATE_API_KEY=your_api_key<br>

# 2. Frontend
cd frontend<br>
npm run dev<br>

# Preview
<img width="1917" height="913" alt="image" src="https://github.com/user-attachments/assets/df4afec4-1fc5-4d20-b930-f7ba798057dd" />
<img width="1918" height="917" alt="image" src="https://github.com/user-attachments/assets/abc4f262-d68b-4af3-bc87-75f67f409701" />
<img width="1918" height="915" alt="image" src="https://github.com/user-attachments/assets/bed26c2f-b77f-49ec-b1ae-7d775438c903" />



# 🎓 About the Project

The purpose of this project is to build a full-stack Inventory & Order Management System that simplifies store management while demonstrating the practical use of modern web development technologies.
It provides tools for managing products, categories, suppliers, customers, and orders, while also offering authentication, role-based access, currency conversion, statistics, and data validation.

Made with love and a little bit of code magic✨.
