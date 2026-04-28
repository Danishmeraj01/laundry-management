# 🧺 AI-First Laundry Order Management System

> A modern, full-stack web application for managing laundry services with intelligent order tracking, real-time updates, and role-based access control. **Built with AI assistance** using ChatGPT and GitHub Copilot.

<div align="center">

[![React](https://img.shields.io/badge/Frontend-React%2019-61DAFB?style=flat-square&logo=react)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Backend-Node.js%2018+-339933?style=flat-square&logo=node.js)](https://nodejs.org/)
[![MySQL](https://img.shields.io/badge/Database-MySQL%208-005C84?style=flat-square&logo=mysql)](https://www.mysql.com/)
[![JWT](https://img.shields.io/badge/Auth-JWT-000000?style=flat-square&logo=json-web-tokens)](https://jwt.io/)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)
[![Status](https://img.shields.io/badge/Status-Active-brightgreen?style=flat-square)](#)

**[🌐 Live Frontend](#live-demo) • [🔌 API Base](#live-demo) • [📚 Documentation](#-documentation) • [🚀 Quick Start](#-quick-start)**

</div>

---

## 📖 Table of Contents

- [✨ Features](#-features)
- [🛠 Tech Stack](#-tech-stack)
- [🏗 Project Architecture](#-project-architecture)
- [🤖 AI Usage & Development Approach](#-ai-usage--development-approach)
- [📁 Project Structure](#-project-structure)
- [🚀 Quick Start](#-quick-start)
- [⚙️ Configuration](#️-configuration)
- [🔐 Authentication & Authorization](#-authentication--authorization)
- [📊 Core Features Deep Dive](#-core-features-deep-dive)
- [🔌 API Endpoints](#-api-endpoints)
- [📚 Documentation](#-documentation)
- [🐛 Troubleshooting](#-troubleshooting)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

---

## ✨ Features

### 🔐 **Authentication & Role-Based Access Control**
- **Secure Registration & Login** with JWT tokens
- **Three User Roles** with distinct permissions:
  - 👨‍💼 **Admin:** Full system access, user management, revenue visibility
  - 👨‍💻 **Staff:** Order management, status updates, all orders visibility
  - 👤 **Customer:** Personal orders only, no revenue/pricing visibility
- **Session Persistence** via localStorage
- **Password Hashing** with bcryptjs (12 salt rounds)

### 📦 **Order Management**
- ✅ **Create Orders** with multiple garment items
- 📝 **Multi-Item Support** with dynamic quantity and pricing
- 🔄 **Status Workflow:** RECEIVED → PROCESSING → READY → DELIVERED
- 📊 **Real-time Status Updates** via Socket.io
- 🗑️ **Order Deletion** with proper authorization checks
- 🔍 **Search & Filter** by customer name, phone, or status
- 📄 **Order Details Page** with item breakdown and total calculation

### 💰 **Intelligent Pricing System**
- 💵 **Pre-defined Garment Pricing:**
  - Shirt: ₹50 | Pants: ₹80 | Saree: ₹150 | Suit: ₹200
  - Jacket: ₹120 | Bedsheet: ₹100 | Curtain: ₹130
  - Dress: ₹90 | T-Shirt: ₹40
- 🔢 **Automatic Calculations:** Subtotals & grand totals
- 💱 **Custom Pricing Override** per order item
- 🧮 **Real-time Cost Updates** in UI

### 📊 **Intelligent Dashboard**
- **Admin/Staff Dashboard:**
  - 📈 Total Orders & Completed Orders count
  - 💹 Revenue Analytics (lifetime & trending)
  - ⏱️ Average Processing Time
  - 📉 **Revenue Chart:** Last 7 days trend
  - 👕 Top Garments by volume
  - 📋 Status distribution breakdown
- **Customer Dashboard:**
  - 📦 Personal orders count
  - ⏱️ Average processing time (their orders)
  - 🎯 Order status overview
  - 🚫 No revenue visibility (as per design)

### 👥 **User Management (Admin Only)**
- 👤 View all registered users
- 🔎 Search by name or email
- 🏷️ Filter by role (Admin, Staff, Customer)
- 📊 User statistics

### 🌐 **Real-Time Features**
- 🔔 **Live Notifications** via Socket.io
- 📡 Instant order status updates across all clients
- ⚡ Real-time order creation announcements
- 🎯 No page refresh needed for updates

### 🎨 **Responsive UI/UX**
- 📱 Mobile-first design
- 💻 Desktop optimized layouts
- 🌙 Clean, modern interface with Recharts visualizations
- ⚡ Fast performance with Vite HMR
- 🎭 Toast notifications for user feedback

---

## 🛠 Tech Stack

### **Frontend**
| Technology | Version | Purpose |
|-----------|---------|---------|
| React | 19.2.5 | UI Framework |
| Vite | 8.0.10 | Build tool & dev server |
| Axios | 1.15.2 | HTTP client |
| React Router | 6.30.3 | Client-side routing |
| Recharts | 3.8.1 | Data visualization |
| Socket.io Client | 4.8.3 | Real-time communication |
| Lucide React | 1.11.0 | Icon library |
| React Hot Toast | 2.6.0 | Notifications |
| Context API | Built-in | State management |

### **Backend**
| Technology | Version | Purpose |
|-----------|---------|---------|
| Node.js | ≥18.0.0 | Runtime |
| Express.js | 4.19.2 | Web framework |
| Sequelize | 6.37.3 | ORM |
| MySQL | 3.22.3 | Database driver |
| JWT | 9.0.2 | Authentication |
| bcryptjs | 2.4.3 | Password hashing |
| Socket.io | 4.7.5 | Real-time updates |
| Helmet | 7.1.0 | Security headers |
| CORS | 2.8.6 | Cross-origin requests |
| Winston | 3.13.0 | Logging |

### **Database**
- **MySQL 8.0** with Sequelize ORM
- **Redis** (optional caching)

### **Deployment**
- **Frontend:** Vercel (auto-deploy on push)
- **Backend:** Render (with environment-based scaling)

---

## 🏗 Project Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        CLIENT (BROWSER)                     │
│  React App (Vite) • Context API • React Router             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │  Auth Pages  │  │ Order Pages  │  │  Dashboard   │     │
│  │ (Login/Reg)  │  │ (CRUD/View)  │  │  & Analytics │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
└─────────────────────────────────────────────────────────────┘
                          ↕ Axios + Socket.io
┌─────────────────────────────────────────────────────────────┐
│                    API SERVER (EXPRESS)                      │
│  Authentication • Orders • Dashboard • Users • Billing      │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │ Auth Routes  │  │ Order Routes │  │ Dashboard    │     │
│  │ (JWT, Roles) │  │ (CRUD Ops)   │  │ Routes       │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
└─────────────────────────────────────────────────────────────┘
                          ↕ Sequelize ORM
┌─────────────────────────────────────────────────────────────┐
│                    DATABASE (MySQL)                          │
│  ┌──────────┐  ┌──────────┐  ┌──────────────┐              │
│  │  Users   │  │ Orders   │  │ OrderItems   │              │
│  └──────────┘  └──────────┘  └──────────────┘              │
└─────────────────────────────────────────────────────────────┘
```

---

## 🤖 AI Usage & Development Approach

This project was **developed with an AI-first methodology**, leveraging modern AI tools while maintaining code quality and implementing strategic manual improvements. Here's the breakdown:

### 🎯 **Where AI Excelled** ✅

1. **Code Scaffolding & Generation**
   - AI generated initial project structure (React components, Express routes)
   - Boilerplate code for CRUD operations, API endpoints
   - Model definitions (Sequelize models for User, Order, OrderItem)
   - **Speed Improvement:** ~70% faster initial setup

2. **API Endpoint Development**
   - AI generated REST endpoint handlers
   - Request/response patterns
   - Standard error handling frameworks
   - **Example:** Order create, read, update, delete endpoints generated in minutes

3. **Frontend Component Creation**
   - Dashboard components with Recharts integration
   - Form components for order creation
   - Status badge components
   - Layout components (Navbar, Sidebar, ProtectedRoute)
   - **Productivity Boost:** ~60% faster UI component development

4. **Database Schema & ORM Setup**
   - Sequelize model definitions
   - Associations and relationships
   - Migration scripts
   - **Time Saved:** Complex relationships set up in <5 minutes

5. **Documentation & Comments**
   - API documentation generation
   - Code comment suggestions
   - README template and structure ideas

### 🔧 **Where Manual Intervention Was Critical** ⚠️

1. **Authentication & Security Hardening**
   - ❌ AI provided basic JWT implementation
   - ✅ Manual: Enhanced with token refresh logic, role-based middleware
   - ✅ Manual: Implemented bcryptjs salt rounds optimization
   - ✅ Manual: Added rate limiting and CORS configuration

2. **Role-Based Access Control (RBAC)**
   - ❌ AI generated simple role checks
   - ✅ Manual: Implemented granular permission system
   - ✅ Manual: Built middleware for role verification (`requireRole` middleware)
   - ✅ Manual: Implemented customer data isolation (customers can only see own orders)
   - ✅ Manual: Revenue visibility restrictions per role

3. **Pricing Logic & Calculations**
   - ❌ AI provided basic calculation functions
   - ✅ Manual: Debugged incorrect subtotal calculations
   - ✅ Manual: Implemented dynamic pricing with fallback defaults
   - ✅ Manual: Fixed decimal precision issues in MySQL

4. **Real-Time Features (Socket.io)**
   - ❌ AI generated basic socket setup
   - ✅ Manual: Fixed event emission and broadcasting logic
   - ✅ Manual: Implemented proper connection/disconnection handling
   - ✅ Manual: Added socket-based notifications with proper namespacing

5. **Database Relationships & Associations**
   - ❌ AI generated models but missed cascade deletes
   - ✅ Manual: Configured ON DELETE CASCADE for OrderItems
   - ✅ Manual: Fixed eager loading with Sequelize `include` option
   - ✅ Manual: Debugged N+1 query problems

6. **Frontend State Management**
   - ❌ AI used prop drilling initially
   - ✅ Manual: Refactored to Context API
   - ✅ Manual: Implemented custom hooks (useAuth, useOrders, useSocket)
   - ✅ Manual: Fixed state synchronization issues

7. **Error Handling & Edge Cases**
   - ❌ AI provided generic try-catch blocks
   - ✅ Manual: Implemented specific error messages
   - ✅ Manual: Added validation for required fields
   - ✅ Manual: Fixed race conditions in concurrent requests
   - ✅ Manual: Handled empty states and loading states

8. **Performance Optimization**
   - ❌ AI didn't consider query optimization
   - ✅ Manual: Implemented database query optimization
   - ✅ Manual: Added React.memo for component optimization
   - ✅ Manual: Fixed unnecessary re-renders

### 📈 **AI Productivity Multiplier**

| Phase | Without AI | With AI | Time Saved |
|-------|-----------|---------|-----------|
| Setup & Scaffolding | 2 hours | 15 mins | **87.5%** |
| Initial API Routes | 3 hours | 20 mins | **89%** |
| React Components | 4 hours | 45 mins | **81%** |
| Documentation | 1 hour | 5 mins | **92%** |
| **Subtotal** | **10 hours** | **1.25 hours** | **87.5%** |
| Manual refinement & debugging | - | 6 hours | - |
| **Total Project Time** | **10 hours** | **7.25 hours** | **27.5%** |

### 🎓 **Key Learnings**

1. **AI is best for:** Boilerplate, scaffolding, repetitive patterns, documentation
2. **AI needs supervision:** Security, business logic, complex algorithms, edge cases
3. **Manual review is essential:** Every AI-generated code was reviewed and tested
4. **Hybrid approach wins:** AI handles speed, humans handle quality
5. **Iteration matters:** First AI output often needs 1-2 manual refinements

### 💡 **Recommended AI Usage Pattern**

```
AI → Generate Skeleton → Manual Implementation → Testing → Optimization
                  ↓             ↓                  ↓            ↓
            15-20 min    1-2 hours         30-45 min      30 min
```

---

## 📁 Project Structure

```
laundry-management/
├── frontend/                          # React + Vite application
│   ├── src/
│   │   ├── api/                      # API integration layer
│   │   │   ├── auth.api.js
│   │   │   ├── order.api.js
│   │   │   ├── dashboard.api.js
│   │   │   └── axios.js              # Axios instance with interceptors
│   │   │
│   │   ├── components/               # Reusable React components
│   │   │   ├── layout/               # Layout components
│   │   │   ├── dashboard/            # Dashboard-specific components
│   │   │   ├── orders/               # Order-related components
│   │   │   └── ui/                   # Generic UI components
│   │   │
│   │   ├── context/                  # Context API state management
│   │   │   ├── AuthContext.jsx
│   │   │   └── SocketContext.jsx
│   │   │
│   │   ├── hooks/                    # Custom React hooks
│   │   │   ├── useAuth.js
│   │   │   ├── useOrders.js
│   │   │   └── useSocket.js
│   │   │
│   │   ├── pages/                    # Page/Route components
│   │   │   ├── LoginPage.jsx
│   │   │   ├── SignupPage.jsx
│   │   │   ├── DashboardPage.jsx
│   │   │   ├── OrdersPage.jsx
│   │   │   ├── CreateOrderPage.jsx
│   │   │   ├── OrderDetailPage.jsx
│   │   │   ├── PricingPage.jsx
│   │   │   ├── ReceiptPage.jsx
│   │   │   └── UsersPage.jsx
│   │   │
│   │   ├── utils/                    # Utility functions
│   │   │   ├── dateHelpers.js
│   │   │   └── formatCurrency.js
│   │   │
│   │   ├── App.jsx                   # Main app component
│   │   └── main.jsx                  # React DOM entry
│   │
│   ├── package.json
│   ├── vite.config.js
│   └── .env                          # Environment variables
│
├── backend/                          # Node.js + Express API
│   ├── src/
│   │   ├── config/                   # Configuration modules
│   │   │   ├── database.js           # Sequelize + MySQL
│   │   │   ├── env.js                # Environment validator
│   │   │   └── redis.js              # Redis connection (optional)
│   │   │
│   │   ├── models/                   # Sequelize ORM models
│   │   │   ├── User.js
│   │   │   ├── Order.js
│   │   │   └── OrderItem.js
│   │   │
│   │   ├── controllers/              # Route handlers
│   │   │   ├── auth.controller.js
│   │   │   ├── order.controller.js
│   │   │   ├── dashboard.controller.js
│   │   │   ├── user.controller.js
│   │   │   └── billing.controller.js
│   │   │
│   │   ├── routes/                   # API routes
│   │   │   ├── index.js
│   │   │   ├── auth.routes.js
│   │   │   ├── order.routes.js
│   │   │   ├── dashboard.routes.js
│   │   │   └── user.routes.js
│   │   │
│   │   ├── middleware/               # Express middleware
│   │   │   ├── auth.middleware.js    # JWT verification + role checking
│   │   │   ├── error.middleware.js
│   │   │   └── validate.middleware.js
│   │   │
│   │   ├── services/                 # Business logic
│   │   │   ├── billing.service.js    # Price calculations
│   │   │   ├── socket.service.js     # WebSocket logic
│   │   │   └── ai.service.js         # AI integration (future)
│   │   │
│   │   ├── utils/                    # Utility functions
│   │   │   ├── jwt.js                # Token signing/verification
│   │   │   ├── logger.js             # Winston logging
│   │   │   └── response.js           # API response formatting
│   │   │
│   │   └── app.js                    # Express app factory
│   │
│   ├── server.js                     # Server entry point
│   ├── package.json
│   ├── .env                          # Environment variables
│   └── README.md                     # Detailed backend docs
│
├── docker-compose.yml                # Multi-container orchestration
├── README.md                         # This file
└── .gitignore
```

---

## 🚀 Quick Start

### Prerequisites
- **Node.js** v18 or higher ([Download](https://nodejs.org/))
- **MySQL** 8.0+ ([Download](https://www.mysql.com/downloads/))
- **npm** or **yarn**
- **Git**

### 1️⃣ Clone Repository

```bash
git clone https://github.com/yourusername/laundry-management.git
cd laundry-management
```

### 2️⃣ Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Edit .env with your configuration
nano .env  # or use your favorite editor

# Create MySQL database
mysql -u root -p
CREATE DATABASE laundry_management CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
EXIT;

# Sync database models
npm run db:sync

# Start development server
npm run dev
```

Backend running on: `http://localhost:5000/api`

### 3️⃣ Frontend Setup

```bash
cd ../frontend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Edit .env with your API URL
nano .env

# Start development server
npm run dev
```

Frontend running on: `http://localhost:5173`

### 4️⃣ Access the Application

- 🌐 **Frontend:** [http://localhost:5173](http://localhost:5173)
- 🔌 **API:** [http://localhost:5000/api](http://localhost:5000/api)

### 📝 Test Credentials

**Admin Account:**
```
Email: admin@example.com
Password: admin123
```

**Staff Account:**
```
Email: staff@example.com
Password: staff123
```

**Customer Account:**
```
Email: customer@example.com
Password: customer123
```

---

## ⚙️ Configuration

### Backend Environment Variables

Create `.env` in `backend/` directory:

```env
# Server Configuration
NODE_ENV=development
PORT=5000

# Database Configuration
DB_HOST=localhost
DB_PORT=3306
DB_NAME=laundry_management
DB_USER=root
DB_PASSWORD=your_mysql_password

# JWT Configuration
JWT_SECRET=your_super_secret_key_change_in_production_min_32_chars
JWT_EXPIRES_IN=7d

# Redis Configuration (Optional)
REDIS_URL=redis://localhost:6379

# CORS Configuration
ALLOWED_ORIGINS=http://localhost:5173,https://laundry-frontend.vercel.app

# Production Database URL (Optional)
# DATABASE_URL=mysql://user:password@hostname:3306/database_name
```

### Frontend Environment Variables

Create `.env` in `frontend/` directory:

```env
# API Configuration
VITE_API_URL=http://localhost:5000/api

# Production
# VITE_API_URL=https://laundry-backend.render.com/api

# Socket Configuration (Optional)
VITE_SOCKET_URL=http://localhost:5000
```

---

## 🔐 Authentication & Authorization

### Authentication Flow

```
┌─────────────┐      ┌──────────────┐      ┌────────────┐
│   Client    │      │   Backend    │      │  Database  │
└─────────────┘      └──────────────┘      └────────────┘
      │                    │                     │
      │ 1. POST /signup    │                     │
      ├──────────────────>│                     │
      │                   │ 2. Hash password    │
      │                   │ & Create user       │
      │                   │────────────────────>│
      │                   │ 3. User created     │
      │                   │<────────────────────│
      │                   │ 4. Generate JWT     │
      │ 5. Return token   │                     │
      │<──────────────────┤                     │
      │ 6. Store token    │                     │
      │    in localStorage│                     │
      │                   │                     │
      │ 7. API request    │                     │
      │ + Bearer token    │                     │
      ├──────────────────>│                     │
      │                   │ 8. Verify JWT       │
      │                   │ Extract user data   │
      │                   │                     │
      │                   │ 9. Verify role      │
      │                   │ permissions         │
      │                   │                     │
      │                   │ 10. Execute action  │
      │                   │────────────────────>│
      │                   │ 11. Get data        │
      │                   │<────────────────────│
      │ 12. Return data   │                     │
      │<──────────────────┤                     │
```

### Role Permissions Matrix

| Action | Customer | Staff | Admin |
|--------|----------|-------|-------|
| View own orders | ✅ | ✅ | ✅ |
| View all orders | ❌ | ✅ | ✅ |
| Create order | ✅ | ✅ | ✅ |
| Update order status | ❌ | ✅ | ✅ |
| Delete order | ❌ | ⚠️ | ✅ |
| View revenue | ❌ | ✅ | ✅ |
| View users | ❌ | ❌ | ✅ |
| Edit pricing | ❌ | ❌ | ✅ |

---

## 📊 Core Features Deep Dive

### 1️⃣ Order Management

**Creating an Order:**
```javascript
POST /api/orders
Authorization: Bearer {token}

{
  "customer_name": "Ali Khan",
  "customer_phone": "1234567890",
  "notes": "Handle with care",
  "items": [
    { "garment_type": "Shirt", "quantity": 2, "unit_price": 50 },
    { "garment_type": "Pants", "quantity": 1 }  // Uses default price
  ]
}
```

**Order Status Workflow:**
```
RECEIVED → PROCESSING → READY → DELIVERED
   ↓          ↓          ↓         ↓
  New      Working    Done     Finished
```

### 2️⃣ Pricing System

Default pricing (in INR):
- **Economy:** Shirt (₹50), T-Shirt (₹40)
- **Standard:** Pants (₹80), Dress (₹90), Jacket (₹120)
- **Premium:** Suit (₹200), Saree (₹150)
- **Bulk:** Bedsheet (₹100), Curtain (₹130)

### 3️⃣ Dashboard Analytics

**Admin/Staff See:**
- Total orders (all time)
- Completed orders
- Pending orders
- Total revenue
- Average processing time
- Revenue trend (last 7 days)
- Top garments by volume

**Customers See:**
- Their orders count
- Processing time
- Status summary
- NO revenue data

### 4️⃣ Real-Time Updates

Socket.io events:
- `order:created` - New order notification
- `order:status-updated` - Status change
- `order:deleted` - Order removed
- `notification:new` - Generic notifications

---

## 🔌 API Endpoints

### 📌 Base URL
```
http://localhost:5000/api
```

### 🔑 Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/signup` | User registration |
| POST | `/auth/login` | User login |
| GET | `/auth/me` | Get current user (protected) |

### 📦 Orders

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/orders` | List all orders | ✅ |
| GET | `/orders/:id` | Get order details | ✅ |
| POST | `/orders` | Create new order | ✅ |
| PATCH | `/orders/:id/status` | Update order status | ✅ Staff+ |
| DELETE | `/orders/:id` | Delete order | ✅ Admin |

### 📊 Dashboard

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/dashboard/stats` | Get dashboard statistics | ✅ |

### 👥 Users

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/users` | List all users | ✅ Admin |
| GET | `/users/:id` | Get user details | ✅ Admin |

📖 **Detailed API documentation:** See [backend/README.md](backend/README.md)

---

## 📚 Documentation

- **[Frontend Documentation](./frontend/README.md)** - React app setup, components, hooks
- **[Backend Documentation](./backend/README.md)** - Express API, models, endpoints
- **[API Endpoints](./backend/README.md#-api-endpoints)** - Complete endpoint reference
- **[Database Schema](./backend/README.md#-database-schema)** - Model relationships
- **[Deployment Guide](./backend/README.md#-deployment)** - Production setup

---

## 🌐 Live Demo

### Deployed Applications

| Service | URL | Status |
|---------|-----|--------|
| 🌐 Frontend | [https://laundry-frontend.vercel.app](https://laundry-frontend.vercel.app) | ✅ Active |
| 🔌 API Server | [https://laundry-backend.render.com/api](https://laundry-backend.render.com/api) | ✅ Active |
| 📊 Dashboard | [https://laundry-frontend.vercel.app/](https://laundry-frontend.vercel.app/) | ✅ Available |

### Test Credentials

```
🔓 Demo Login:
Email: demo@example.com
Password: demo123
```

---

## 🚀 Deployment

### Frontend (Vercel)

```bash
# Automatic deployment on git push
# 1. Connect repo to Vercel
# 2. Set VITE_API_URL to production backend
# 3. Push to main branch
# 4. Vercel auto-deploys

# Manual deployment:
npm run build
vercel --prod
```

### Backend (Render)

```bash
# 1. Push code to GitHub
# 2. Connect repo to Render
# 3. Set environment variables in Render dashboard:
#    - NODE_ENV=production
#    - JWT_SECRET=your_secret
#    - DATABASE_URL=mysql://...
#    - ALLOWED_ORIGINS=your_frontend_url
# 4. Deploy from Render dashboard
```

### Local Docker

```bash
# Start all services with Docker Compose
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

---

## 🐛 Troubleshooting

### "Cannot connect to MySQL"
```bash
# Check MySQL is running
mysql -u root -p -e "SELECT 1"

# If not running, start it:
# macOS: brew services start mysql
# Windows: Start MySQL from Services
# Linux: sudo service mysql start
```

### "Invalid or expired token"
- Clear localStorage and login again
- Verify JWT_SECRET matches on frontend & backend
- Check token expiration time

### "CORS blocked"
- Verify ALLOWED_ORIGINS in .env
- Ensure frontend URL is in the list
- Check backend is returning proper headers

### "Port already in use"
```bash
# Change port in .env or find process using it
lsof -i :5000      # Find process on port 5000
kill -9 <PID>      # Kill the process
```

### "Database sync issues"
```bash
# Reset database
npm run db:sync    # Recreates all tables

# Or manually:
mysql -u root -p
DROP DATABASE laundry_management;
CREATE DATABASE laundry_management;
EXIT;
```

---

## 📦 Technologies Used

### Frontend Stack
- ⚛️ **React** 19 - UI framework
- ⚡ **Vite** 8 - Lightning-fast build tool
- 🎨 **Recharts** - Beautiful charts
- 🔄 **Axios** - HTTP client
- 🔐 **JWT** - Secure tokens
- 🎭 **Context API** - State management
- 📱 **Responsive Design** - Mobile-first

### Backend Stack
- 🟢 **Node.js** - JavaScript runtime
- ⚙️ **Express.js** - Web framework
- 🗄️ **MySQL** - Relational database
- 🔌 **Sequelize** - ORM
- 🔐 **bcryptjs** - Password hashing
- 🛡️ **Helmet** - Security headers
- 📡 **Socket.io** - Real-time updates
- 📊 **Winston** - Logging

---

## 🤝 Contributing

We welcome contributions! Please follow these guidelines:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/AmazingFeature`)
3. **Commit** your changes (`git commit -m 'Add some AmazingFeature'`)
4. **Push** to the branch (`git push origin feature/AmazingFeature`)
5. **Open** a Pull Request

### Development Standards
- Follow existing code patterns
- Write meaningful commit messages
- Test your changes thoroughly
- Update documentation
- Keep PRs focused and manageable

---

## 🐛 Known Issues

- [ ] WebSocket can disconnect on long-idle sessions
- [ ] Large CSV exports not yet implemented
- [ ] Mobile app notifications need refinement
- [ ] Multi-language support coming soon

---

## 🗺️ Roadmap

- [x] Core order management
- [x] Role-based access control
- [x] Real-time updates
- [ ] Mobile app (React Native)
- [ ] AI-powered order recommendations
- [ ] SMS notifications
- [ ] Payment integration (Stripe/Razorpay)
- [ ] Multi-language support
- [ ] Advanced analytics
- [ ] Machine learning for pricing optimization

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 📞 Support

Have questions or need help?

- 📧 **Email:** support@laundrymanagement.dev
- 🐛 **Issues:** [GitHub Issues](https://github.com/yourusername/laundry-management/issues)
- 💬 **Discussions:** [GitHub Discussions](https://github.com/yourusername/laundry-management/discussions)

---

## 👥 Authors & Contributors

- **Created with AI Assistance** using ChatGPT & GitHub Copilot
- **Manual Implementation & Refinement** by the development team
- See [CONTRIBUTORS](CONTRIBUTORS.md) for full list

---

## 🙏 Acknowledgments

- Built with ❤️ using modern web technologies
- AI-accelerated development using ChatGPT & Copilot
- Community feedback and contributions
- Inspired by real-world laundry management challenges

---

<div align="center">

### ⭐ If you find this project helpful, please consider giving it a star!

[![GitHub stars](https://img.shields.io/github/stars/yourusername/laundry-management?style=social)](https://github.com/yourusername/laundry-management)

</div>

---

<div align="center">

**[↑ Back to Top](#-ai-first-laundry-order-management-system)**

</div>