# Laundry Management System - Backend API

A robust, scalable Node.js/Express API for managing laundry services. This backend provides comprehensive REST endpoints for order management, billing, authentication, and real-time updates via WebSocket.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation & Setup](#installation--setup)
- [Environment Configuration](#environment-configuration)
- [Database Setup](#database-setup)
- [Development](#development)
- [API Documentation](#api-documentation)
- [Authentication](#authentication)
- [Database Schema](#database-schema)
- [Error Handling](#error-handling)
- [Security](#security)
- [Deployment](#deployment)
- [Contributing](#contributing)

---

## 🎯 Overview

The Laundry Management System Backend is a production-ready REST API built with Node.js and Express. It provides complete business logic for managing laundry orders, customer accounts, billing, and real-time order tracking. The API features JWT authentication, MySQL database persistence, Redis caching, and WebSocket support for live updates.

**API Base URL:** `https://laundry-management-44l4.onrender.com/api`

---

## ✨ Features

### 1. **User Management**
- User registration with email verification
- Secure login with JWT authentication
- Role-based access control (admin, staff, customer)
- User profile management
- Password hashing with bcryptjs

### 2. **Order Management**
- Create orders with multiple items
- Track order status (RECEIVED → PROCESSING → READY → DELIVERED)
- Update order status with real-time notifications
- Delete orders
- Retrieve all orders with filtering by user role
- Order details with associated items
- Customer information tracking

### 3. **Order Items**
- Associate multiple items with orders
- Support for diverse garment types
- Dynamic quantity and pricing
- Automatic subtotal calculation
- Unit price customization

### 4. **Financial Management**
- Automated billing calculation
- Pre-defined pricing per garment type (in INR):
  - Shirt: ₹50
  - Pants: ₹80
  - Saree: ₹150
  - Suit: ₹200
  - Jacket: ₹120
  - Bedsheet: ₹100
  - Curtain: ₹130
  - Dress: ₹90
  - T-Shirt: ₹40
- Dynamic pricing override
- Total amount calculation per order
- Revenue analytics

### 5. **Dashboard Analytics**
- Order statistics (total, completed, pending)
- Revenue metrics
- Processing time tracking
- Chart data for visualization

### 6. **Real-Time Updates**
- WebSocket integration via Socket.io
- Live order status updates
- Real-time notifications to all connected clients
- Broadcast order changes

### 7. **Security**
- JWT-based authentication
- Role-based authorization
- Input validation and sanitization
- Rate limiting on API endpoints
- CORS configuration
- Helmet.js security headers
- Bcryptjs password hashing
- HTTPS support in production

### 8. **Performance**
- Redis caching (optional)
- Compression middleware
- Morgan logging
- Query optimization with associations
- Connection pooling

---

## 🛠 Tech Stack

### Runtime & Framework
- **Node.js** ≥ 18.0.0 - JavaScript runtime
- **Express.js** 4.19.2 - Web framework
- **http** - HTTP server module

### Database & ORM
- **MySQL 2** 3.22.3 - Relational database
- **Sequelize** 6.37.3 - ORM for Node.js
- **mysql2** - MySQL driver

### Authentication & Security
- **jsonwebtoken** 9.0.2 - JWT token generation/verification
- **bcryptjs** 2.4.3 - Password hashing
- **helmet** 7.1.0 - Security headers
- **cors** 2.8.6 - CORS middleware
- **express-rate-limit** 7.3.1 - Rate limiting
- **express-validator** 7.1.0 - Input validation

### Real-Time Communication
- **socket.io** 4.7.5 - WebSocket library
- **ioredis** 5.4.1 - Redis client

### Utilities
- **dotenv** 16.4.5 - Environment variable management
- **compression** 1.7.4 - Gzip compression
- **morgan** 1.10.0 - HTTP request logger
- **winston** 3.13.0 - Logging library
- **uuid** 10.0.0 - UUID generation

### Development
- **nodemon** 3.1.4 - Auto-reload on file changes
- **eslint** 9.6.0 - Code linting

---

## 📁 Project Structure

```
backend/
├── src/
│   ├── config/                     # Configuration modules
│   │   ├── database.js            # Sequelize instance & MySQL connection
│   │   ├── env.js                 # Environment variable validator
│   │   └── redis.js               # Redis connection (optional)
│   │
│   ├── models/                    # Sequelize ORM models
│   │   ├── index.js               # Model definitions & associations
│   │   ├── User.js                # User model (auth, roles)
│   │   ├── Order.js               # Order model (status, customer info)
│   │   └── OrderItem.js           # OrderItem model (garments, pricing)
│   │
│   ├── controllers/               # Request handlers (business logic)
│   │   ├── auth.controller.js     # Signup, login, getMe
│   │   ├── order.controller.js    # CRUD operations for orders
│   │   ├── dashboard.controller.js# Statistics & analytics
│   │   ├── user.controller.js     # User management endpoints
│   │   └── billing.controller.js  # Billing calculations & history
│   │
│   ├── routes/                    # API route definitions
│   │   ├── index.js               # Main router setup
│   │   ├── auth.routes.js         # POST /auth/signup, /auth/login, GET /auth/me
│   │   ├── order.routes.js        # CRUD operations on /orders
│   │   ├── dashboard.routes.js    # GET /dashboard/stats
│   │   └── user.routes.js         # User endpoints
│   │
│   ├── middleware/                # Express middleware
│   │   ├── auth.middleware.js     # JWT verification & role checking
│   │   ├── error.middleware.js    # Global error handler
│   │   └── validate.middleware.js # Input validation
│   │
│   ├── services/                  # Business logic & external services
│   │   ├── billing.service.js     # Price calculations, invoicing
│   │   ├── socket.service.js      # WebSocket event handlers
│   │   └── ai.service.js          # AI/ML integration (future)
│   │
│   ├── utils/                     # Helper functions
│   │   ├── jwt.js                 # Token signing & verification
│   │   ├── logger.js              # Winston logging setup
│   │   └── response.js            # Standardized API response format
│   │
│   └── app.js                     # Express application factory
│
├── server.js                      # Server entry point (startup & initialization)
├── Dockerfile                     # Docker container configuration
├── docker-compose.yml             # Multi-container orchestration
├── package.json                   # Dependencies & scripts
├── .env                          # Environment configuration (ignored by git)
├── .env.example                  # Example environment file
└── README.md                     # This file
```

---

## 🚀 Installation & Setup

### Prerequisites
- Node.js v18 or higher
- npm or yarn
- MySQL Server 5.7+
- Redis (optional, for caching)
- Docker & Docker Compose (for containerized setup)

### Option 1: Local Development Setup

#### Step 1: Clone Repository

```bash
git clone <repository-url>
cd laundry-management/backend
```

#### Step 2: Install Dependencies

```bash
npm install
```

#### Step 3: Setup MySQL Database

```bash
# Option A: Using local MySQL
mysql -u root -p
CREATE DATABASE laundry_management CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
EXIT;

# Option B: Using Docker
docker run --name mysql-laundry -e MYSQL_ROOT_PASSWORD=root \
  -e MYSQL_DATABASE=laundry_management \
  -p 3306:3306 -d mysql:8.0
```

#### Step 4: Configure Environment Variables

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

Edit `.env` with your configuration (see [Environment Configuration](#environment-configuration))

#### Step 5: Sync Database Models

```bash
npm run db:sync
```

This creates tables based on Sequelize models.

#### Step 6: Start Development Server

```bash
npm run dev
```

Server runs on `http://localhost:5000/api`

---

### Option 2: Docker Compose Setup

```bash
# Start all services (frontend, backend, MySQL, Redis)
docker-compose up -d

# View logs
docker-compose logs -f backend

# Stop services
docker-compose down
```

---

## ⚙️ Environment Configuration

Create a `.env` file in the backend root directory:

```env
# ── Node Environment
NODE_ENV=development
PORT=5000

# ── Database Configuration
DB_HOST=localhost
DB_PORT=3306
DB_NAME=laundry_management
DB_USER=root
DB_PASSWORD=your_password

# ── JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRES_IN=7d

# ── Redis Configuration (Optional)
REDIS_URL=redis://localhost:6379

# ── CORS Configuration
ALLOWED_ORIGINS=http://localhost:5173,https://laundry-frontend-liart.vercel.app

# ── Production Database URL (if using managed database)
# DATABASE_URL=mysql://user:password@host:port/database
```

### Environment Variables Explained

| Variable | Description | Example |
|----------|-------------|---------|
| `NODE_ENV` | Environment mode | `development` or `production` |
| `PORT` | Server port | `5000` |
| `DB_HOST` | MySQL host | `localhost` or RDS endpoint |
| `DB_PORT` | MySQL port | `3306` |
| `DB_NAME` | Database name | `laundry_management` |
| `DB_USER` | MySQL username | `root` |
| `DB_PASSWORD` | MySQL password | Your password |
| `JWT_SECRET` | Secret key for JWT signing | Random 32+ char string |
| `JWT_EXPIRES_IN` | Token expiration | `7d` |
| `REDIS_URL` | Redis connection (optional) | `redis://localhost:6379` |
| `ALLOWED_ORIGINS` | CORS allowed domains | Comma-separated URLs |
| `DATABASE_URL` | Full DB connection string (production) | MySQL connection string |

---

## 📊 Database Setup

### Database Schema

The application uses MySQL with Sequelize ORM. Three main tables are created:

#### **Users Table**
```sql
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role ENUM('admin', 'staff', 'customer') DEFAULT 'staff',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

#### **Orders Table**
```sql
CREATE TABLE orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  customer_name VARCHAR(100) NOT NULL,
  customer_phone VARCHAR(15) NOT NULL,
  status ENUM('RECEIVED', 'PROCESSING', 'READY', 'DELIVERED') DEFAULT 'RECEIVED',
  total_amount DECIMAL(10, 2) DEFAULT 0.00,
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);
```

#### **OrderItems Table**
```sql
CREATE TABLE order_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  order_id INT NOT NULL,
  garment_type VARCHAR(50) NOT NULL,
  quantity INT NOT NULL,
  unit_price DECIMAL(10, 2),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
);
```

### Model Associations

```
User (1) ──── (Many) Order
Order (1) ──── (Many) OrderItem
```

---

## 💻 Development

### Available Scripts

```bash
# Start development server with auto-reload
npm run dev

# Start production server
npm start

# Sync database models
npm run db:sync

# Run migrations (if using sequelize-cli)
npm run db:migrate

# Lint code
npm run lint

# Build (placeholder)
npm run build
```

### Development Workflow

1. **Start dev server:** `npm run dev`
2. **Make changes** - Nodemon auto-reloads
3. **Test endpoints** - Use Postman, curl, or VS Code REST extension
4. **Check logs** - Winston logs in console
5. **Commit changes** - Follow git workflow

### Testing Endpoints

**Using curl:**
```bash
# Register
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@example.com","password":"123456"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"123456"}'

# Create Order (requires token)
curl -X POST http://localhost:5000/api/orders \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"customer_name":"Ali","customer_phone":"1234567890","items":[{"garment_type":"Shirt","quantity":2,"unit_price":50}]}'
```

**Using VS Code REST Client Extension:**

Create a `requests.http` file:
```http
@baseUrl = http://localhost:5000/api

### Signup
POST {{baseUrl}}/auth/signup
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepass123",
  "role": "staff"
}

### Login
POST {{baseUrl}}/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securepass123"
}
```

---

## 🔌 API Documentation

### Base URL
```
http://localhost:5000/api (Development)
https://laundry-management-44l4.onrender.com/api (Production)
```

### Authentication Endpoints

#### **POST /auth/signup**
Create a new user account.

**Request:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepass123",
  "role": "staff"  // Optional: admin, staff, customer (default: staff)
}
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "role": "staff"
    }
  },
  "message": "Account created successfully"
}
```

#### **POST /auth/login**
User login with credentials.

**Request:**
```json
{
  "email": "john@example.com",
  "password": "securepass123"
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "role": "staff"
    }
  },
  "message": "Login successful"
}
```

#### **GET /auth/me**
Get authenticated user profile.

**Headers:**
```
Authorization: Bearer {token}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "role": "staff"
  },
  "message": "User profile"
}
```

---

### Order Endpoints

#### **GET /orders**
Retrieve all orders (filtered by role).

**Headers:**
```
Authorization: Bearer {token}
```

**Query Parameters:**
- `status` - Filter by status (RECEIVED, PROCESSING, READY, DELIVERED)
- `page` - Pagination page number
- `limit` - Results per page

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "user_id": 1,
      "customer_name": "Ali Khan",
      "customer_phone": "1234567890",
      "status": "RECEIVED",
      "total_amount": 150.00,
      "notes": "Handle with care",
      "items": [
        {
          "id": 1,
          "garment_type": "Shirt",
          "quantity": 2,
          "unit_price": 50.00
        }
      ],
      "creator": {
        "id": 1,
        "name": "John Doe",
        "email": "john@example.com"
      },
      "created_at": "2024-01-15T10:30:00Z",
      "updated_at": "2024-01-15T10:30:00Z"
    }
  ],
  "message": "Orders fetched"
}
```

#### **GET /orders/:id**
Get a specific order with items.

**Headers:**
```
Authorization: Bearer {token}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "user_id": 1,
    "customer_name": "Ali Khan",
    "customer_phone": "1234567890",
    "status": "PROCESSING",
    "total_amount": 150.00,
    "items": [
      {
        "id": 1,
        "order_id": 1,
        "garment_type": "Shirt",
        "quantity": 2,
        "unit_price": 50.00
      },
      {
        "id": 2,
        "order_id": 1,
        "garment_type": "Pants",
        "quantity": 1,
        "unit_price": 80.00
      }
    ],
    "creator": {
      "id": 1,
      "name": "John Doe",
      "role": "staff"
    }
  }
}
```

#### **POST /orders**
Create a new order with multiple items.

**Headers:**
```
Authorization: Bearer {token}
Content-Type: application/json
```

**Request:**
```json
{
  "customer_name": "Ali Khan",
  "customer_phone": "1234567890",
  "notes": "Handle with care",
  "items": [
    {
      "garment_type": "Shirt",
      "quantity": 2,
      "unit_price": 50  // Optional: uses default if not provided
    },
    {
      "garment_type": "Pants",
      "quantity": 1
      // unit_price will be 80 (default)
    }
  ]
}
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "user_id": 1,
    "customer_name": "Ali Khan",
    "customer_phone": "1234567890",
    "status": "RECEIVED",
    "total_amount": 180.00,
    "items": [...]
  },
  "message": "Order created successfully"
}
```

#### **PATCH /orders/:id/status**
Update order status.

**Headers:**
```
Authorization: Bearer {token}
Content-Type: application/json
```

**Request:**
```json
{
  "status": "PROCESSING"  // RECEIVED, PROCESSING, READY, DELIVERED
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "status": "PROCESSING",
    "updated_at": "2024-01-15T11:00:00Z"
  },
  "message": "Order status updated"
}
```

#### **DELETE /orders/:id**
Delete an order.

**Headers:**
```
Authorization: Bearer {token}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Order deleted successfully"
}
```

---

### Dashboard Endpoints

#### **GET /dashboard/stats**
Retrieve dashboard statistics.

**Headers:**
```
Authorization: Bearer {token}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "total_orders": 25,
    "completed_orders": 18,
    "pending_orders": 7,
    "total_revenue": 4500.00,
    "average_time": 2.5,
    "revenue_trend": [
      { "date": "2024-01-01", "amount": 500 },
      { "date": "2024-01-02", "amount": 620 }
    ],
    "status_distribution": [
      { "status": "RECEIVED", "count": 3 },
      { "status": "PROCESSING", "count": 2 },
      { "status": "READY", "count": 2 },
      { "status": "DELIVERED", "count": 18 }
    ]
  }
}
```

---

### User Endpoints

#### **GET /users**
Get all users (admin only).

**Headers:**
```
Authorization: Bearer {token}
```

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "role": "staff"
    }
  ]
}
```

---

## 🔐 Authentication

### JWT Token Flow

```
1. User submits credentials (email, password)
   ↓
2. Backend validates credentials
   ↓
3. Backend generates JWT token (payload: id, email, role)
   ↓
4. Client stores token in localStorage
   ↓
5. Client includes token in Authorization header for protected routes
   ↓
6. Middleware verifies token and extracts user info
   ↓
7. Request proceeds or rejected if invalid
```

### Token Structure

```json
{
  "id": 1,
  "email": "john@example.com",
  "role": "staff",
  "iat": 1705334400,
  "exp": 1706539200
}
```

### Using Tokens

**Include in Header:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Token Expiration:**
- Default: 7 days
- Configurable via `JWT_EXPIRES_IN` env variable

### Protected Routes

Routes protected by `authMiddleware`:
```javascript
router.get('/orders', authMiddleware, orderController.getOrders);
```

All protected routes require valid JWT token in Authorization header.

---

## 📊 Database Schema

### Relationships

```
User (1) ──has many─→ (Many) Order
Order (1) ──has many─→ (Many) OrderItem
```

### Sequelize Associations

**User Model:**
```javascript
User.hasMany(Order, { as: 'orders', foreignKey: 'user_id' });
```

**Order Model:**
```javascript
Order.belongsTo(User, { as: 'creator', foreignKey: 'user_id' });
Order.hasMany(OrderItem, { as: 'items', foreignKey: 'order_id' });
```

**OrderItem Model:**
```javascript
OrderItem.belongsTo(Order, { foreignKey: 'order_id' });
```

---

## 🛡️ Security

### Implemented Security Measures

1. **Authentication:**
   - JWT tokens for stateless authentication
   - Bcryptjs for password hashing (12 salt rounds)
   - Secure token storage recommendations

2. **Authorization:**
   - Role-based access control (RBAC)
   - Routes protected by `authMiddleware` and `requireRole`
   - Customers can only view their own orders

3. **Input Validation:**
   - express-validator for request validation
   - Sanitization of user inputs
   - Type checking on request bodies

4. **HTTP Security:**
   - Helmet.js for security headers
   - CORS configuration with whitelisted origins
   - Rate limiting (200 req/15min global, 20 req/15min auth)

5. **Database Security:**
   - SQL injection prevention via ORM
   - Connection pooling
   - Encrypted password storage

6. **HTTPS:**
   - Enforced in production
   - Secure cookies (HttpOnly, SameSite)

### Best Practices

- Change `JWT_SECRET` in production
- Use strong passwords
- Enable HTTPS/SSL
- Regular security audits
- Monitor rate limits
- Update dependencies

---

## ⚡ Performance

### Optimization Techniques

1. **Database:**
   - Eager loading with Sequelize associations
   - Connection pooling
   - Query optimization

2. **Caching:**
   - Optional Redis caching
   - Response compression with gzip

3. **Rate Limiting:**
   - Prevents DDoS attacks
   - Configured per endpoint

4. **Logging:**
   - Winston for structured logging
   - SQL query logging in development

---

## 🚀 Deployment

### Option 1: Render.com (Recommended)

1. **Connect Repository**
   - Push code to GitHub
   - Connect repository to Render

2. **Environment Variables**
   - Set all `.env` variables in Render dashboard
   - Database URL for production MySQL

3. **Deploy**
   - Automatic deployment on push to main

4. **Verify**
   - Check logs in Render dashboard

### Option 2: Docker Deployment

```bash
# Build image
docker build -t laundry-backend .

# Run container
docker run -p 5000:5000 \
  -e NODE_ENV=production \
  -e DB_HOST=mysql-host \
  -e DB_USER=username \
  -e DB_PASSWORD=password \
  -e JWT_SECRET=your_secret \
  laundry-backend
```

### Option 3: Traditional VPS

```bash
# SSH into server
ssh user@server-ip

# Install Node.js & MySQL
curl -sL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install nodejs mysql-server

# Clone repository
git clone <repo-url>
cd backend

# Install dependencies
npm install

# Setup .env
nano .env  # Configure database & JWT

# Setup systemd service
sudo nano /etc/systemd/system/laundry-backend.service

# Start service
sudo systemctl start laundry-backend
sudo systemctl enable laundry-backend
```

---

## 📋 Deployment Checklist

Before deploying to production:

- [ ] Set `NODE_ENV=production`
- [ ] Change `JWT_SECRET` to a strong random string
- [ ] Configure `ALLOWED_ORIGINS` with production domain
- [ ] Set up production MySQL database
- [ ] Configure Redis (if using caching)
- [ ] Enable HTTPS/SSL certificate
- [ ] Set appropriate rate limits
- [ ] Test all API endpoints
- [ ] Verify error handling
- [ ] Set up monitoring/logging
- [ ] Configure backup strategy
- [ ] Load test the API
- [ ] Security audit

---

## 🔄 Data Flow

```
1. Client Request (with JWT token)
   ↓
2. CORS & Rate Limit Check
   ↓
3. Authentication Middleware (verify JWT)
   ↓
4. Authorization Check (role verification)
   ↓
5. Input Validation Middleware
   ↓
6. Route Handler (controller)
   ↓
7. Service Layer (business logic)
   ↓
8. Database Query (via Sequelize)
   ↓
9. Response Formation
   ↓
10. Error Handling (if any)
   ↓
11. Send JSON Response
```

---

## 🐛 Debugging & Troubleshooting

### Common Issues

#### Issue: "Connect ECONNREFUSED localhost:3306"
**Solution:**
```bash
# Check MySQL is running
mysql -u root -p

# Or start Docker MySQL
docker run --name mysql -e MYSQL_ROOT_PASSWORD=root -p 3306:3306 -d mysql:8.0
```

#### Issue: "Invalid or expired token"
**Solution:**
- Verify token is not expired
- Check JWT_SECRET is same on frontend and backend
- Regenerate token with new login

#### Issue: "CORS blocked"
**Solution:**
```
Update ALLOWED_ORIGINS in .env with frontend URL
```

#### Issue: "Port 5000 already in use"
**Solution:**
```bash
# Change port in .env
PORT=5001

# Or kill existing process
lsof -i :5000
kill -9 <PID>
```

### Debugging Tips

1. **Enable Debug Logging:**
   ```bash
   DEBUG=* npm run dev
   ```

2. **Check Request Body:**
   ```javascript
   console.log(req.body);
   ```

3. **Inspect Database:**
   ```bash
   mysql -u root -p laundry_management
   SELECT * FROM orders;
   ```

4. **Monitor API Requests:**
   - Use Postman Collection
   - Check Morgan logs in console

---

## 🤝 Contributing

### Code Style Guidelines
- Use ES6+ syntax
- Follow existing code patterns
- Add comments for complex logic
- Keep functions focused and reusable
- Use meaningful variable names

### Commit Message Format
```
type(scope): description

[optional body]
[optional footer]
```

Examples:
- `feat(orders): add order search functionality`
- `fix(auth): resolve token verification issue`
- `docs(api): update endpoint documentation`

### Pull Request Process
1. Create feature branch from `main`
2. Make changes with clear commits
3. Test thoroughly
4. Submit PR with description
5. Address review comments
6. Merge after approval

---

## 📚 Additional Resources

- [Express.js Documentation](https://expressjs.com/)
- [Sequelize Documentation](https://sequelize.org/)
- [JWT Documentation](https://jwt.io/)
- [MySQL Documentation](https://dev.mysql.com/doc/)
- [Socket.io Documentation](https://socket.io/)
- [Redis Documentation](https://redis.io/documentation)

---

## 📝 License

This project is part of the Laundry Management System. See main repository for license information.

---

## 🆘 Troubleshooting

### Database Connection Issues
```javascript
// Test connection
const { testConnection } = require('./src/config/database');
testConnection().then(() => console.log('✅ Connected')).catch(err => console.error('❌', err));
```

### JWT Token Issues
```javascript
// Decode token to verify payload
const jwt = require('jsonwebtoken');
const decoded = jwt.decode(token);
console.log(decoded);
```

### Redis Connection (Optional)
```javascript
// If Redis unavailable, app still works without caching
// Check logs for: "⚠️ Redis unavailable — caching disabled."
```

---

## 📞 Support

For issues, questions, or suggestions:
1. Check existing issues in repository
2. Review error logs with Winston logger
3. Create detailed issue with error stack trace
4. Contact development team

---

## 🔗 Related Repositories

- **Frontend:** [https://github.com/your-org/laundry-frontend](https://github.com/your-org/laundry-frontend)
- **Main Repository:** [https://github.com/your-org/laundry-management](https://github.com/your-org/laundry-management)

---

**Last Updated:** April 2026  
**Backend Version:** 1.0.0  
**API Version:** v1
