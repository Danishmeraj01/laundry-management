# Laundry Management System - Frontend

A modern, responsive React-based web application for managing laundry services. This frontend provides a comprehensive dashboard for order tracking, billing, user management, and real-time updates using WebSocket integration.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation & Setup](#installation--setup)
- [Configuration](#configuration)
- [Development](#development)
- [Build & Deployment](#build--deployment)
- [API Integration](#api-integration)
- [Key Features & Components](#key-features--components)
- [Authentication Flow](#authentication-flow)
- [Routing Architecture](#routing-architecture)
- [Contributing](#contributing)

---

## 🎯 Overview

The Laundry Management System Frontend is a professional web application designed for laundry business owners and managers. It provides a complete dashboard for managing laundry orders, tracking revenue, managing customers, and processing billing. The application features real-time updates, responsive UI, and comprehensive order management capabilities.

**Live Demo:** [https://laundry-management-44l4.onrender.com](https://laundry-management-44l4.onrender.com)

---

## ✨ Features

### 1. **Authentication & Authorization**
- Secure user registration (Signup)
- Email/password-based login
- JWT token-based authentication
- Protected routes with automatic redirection
- Session persistence using localStorage

### 2. **Dashboard**
- Real-time statistics display:
  - Total Orders
  - Revenue generated (in INR)
  - Average processing time
  - Completed orders count
- Interactive charts:
  - Revenue trend line chart
  - Order status distribution bar chart
- Quick access to key metrics
- Responsive card-based UI

### 3. **Order Management**
- **View All Orders:** Paginated list with status tracking
- **Create New Order:**
  - Multi-item order creation
  - Support for multiple garment types (Shirt, Pants, Saree, Suit, Jacket, Bedsheet, Curtain, Dress, T-Shirt)
  - Dynamic quantity and pricing
  - Customer information capture
  - Order notes
- **Order Details:** Comprehensive order information with item breakdown
- **Status Updates:** Change order status through workflow (RECEIVED → PROCESSING → READY → DELIVERED)
- **Order Deletion:** Remove orders from system
- **Search & Filter:** Find orders quickly

### 4. **Financial Management**
- **Pricing Page:** View service pricing and tariffs
- **Receipt Generation:** Digital receipts for completed orders
- **Billing Tracking:** Revenue dashboard with financial metrics
- **Currency Display:** All prices in INR (Indian Rupees)

### 5. **User Management**
- View all customers/users
- Customer information dashboard
- User profile management
- Customer history tracking

### 6. **Real-Time Updates**
- WebSocket integration for live order updates
- Instant notification system using React Hot Toast
- Real-time status changes across all connected clients

### 7. **Responsive UI**
- Mobile-friendly design
- Desktop-optimized layouts
- Flexible sidebar navigation
- Adaptive component sizing

---

## 🛠 Tech Stack

### Core Framework
- **React** 19.2.5 - UI framework
- **React Router DOM** 6.30.3 - Client-side routing
- **Vite** 8.0.10 - Build tool and dev server

### State Management & Hooks
- React Context API for authentication state
- Custom hooks for reusable logic (useAuth, useOrders, useSocket)
- React Hooks (useState, useEffect, useContext)

### UI & Styling
- **Tailwind CSS patterns** (inline styling with CSS-in-JS)
- **Lucide React** 1.11.0 - Modern icon library
- **React Hot Toast** 2.6.0 - Toast notifications

### Data Visualization
- **Recharts** 3.8.1 - Interactive charts and graphs

### API & Communication
- **Axios** 1.15.2 - HTTP client
- **Socket.io Client** 4.8.3 - WebSocket communication

### Development Tools
- **ESLint** 10.2.1 - Code quality
- **Vite React Plugin** 6.0.1 - React Fast Refresh

---

## 📁 Project Structure

```
frontend/
├── public/                          # Static assets
├── src/
│   ├── api/                        # API integration layer
│   │   ├── axios.js               # Axios instance with interceptors
│   │   ├── auth.api.js            # Authentication endpoints
│   │   ├── dashboard.api.js       # Dashboard statistics endpoints
│   │   ├── order.api.js           # Order CRUD operations
│   │   └── user.api.js            # User management endpoints
│   │
│   ├── components/                # Reusable React components
│   │   ├── layout/
│   │   │   ├── Navbar.jsx         # Top navigation bar
│   │   │   ├── Sidebar.jsx        # Left sidebar navigation
│   │   │   └── ProtectedRoute.jsx # Route protection wrapper
│   │   │
│   │   ├── dashboard/
│   │   │   ├── StatsCard.jsx      # Statistics display card
│   │   │   ├── RevenueChart.jsx   # Revenue trend visualization
│   │   │   └── InsightsPanel.jsx  # Analytics insights panel
│   │   │
│   │   ├── orders/
│   │   │   ├── OrderCard.jsx      # Order summary card
│   │   │   ├── OrderTable.jsx     # Orders list table
│   │   │   └── StatusBadge.jsx    # Order status indicator
│   │   │
│   │   └── ui/                    # Generic UI components
│   │       ├── Button.jsx         # Reusable button component
│   │       ├── Input.jsx          # Form input component
│   │       ├── Modal.jsx          # Modal dialog component
│   │       └── Spinner.jsx        # Loading indicator
│   │
│   ├── context/                   # React Context providers
│   │   ├── AuthContext.jsx        # Authentication state management
│   │   └── SocketContext.jsx      # WebSocket connection management
│   │
│   ├── hooks/                     # Custom React hooks
│   │   ├── useAuth.js             # Auth context hook
│   │   ├── useOrders.js           # Orders data hook
│   │   └── useSocket.js           # Socket connection hook
│   │
│   ├── pages/                     # Page/Screen components
│   │   ├── LoginPage.jsx          # User login screen
│   │   ├── SignupPage.jsx         # User registration screen
│   │   ├── DashboardPage.jsx      # Main dashboard with analytics
│   │   ├── OrdersPage.jsx         # Orders list and management
│   │   ├── CreateOrderPage.jsx    # New order creation form
│   │   ├── OrderDetailPage.jsx    # Individual order details
│   │   ├── PricingPage.jsx        # Service pricing display
│   │   ├── ReceiptPage.jsx        # Order receipt generation
│   │   └── UsersPage.jsx          # User/customer management
│   │
│   ├── utils/                     # Utility functions
│   │   ├── dateHelpers.js         # Date formatting utilities
│   │   └── formatCurrency.js      # Currency formatting (INR)
│   │
│   ├── App.jsx                    # Main app component with routing
│   ├── App.css                    # App-level styles
│   ├── main.jsx                   # React DOM entry point
│   └── index.css                  # Global styles
│
├── .env                           # Environment configuration
├── .gitignore                     # Git ignore rules
├── package.json                   # Dependencies and scripts
├── vite.config.js                 # Vite configuration
├── eslint.config.js               # ESLint rules
├── index.html                     # HTML entry point
└── README.md                      # This file
```

---

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager
- Backend API running on `http://localhost:5000` or configured via environment variables

### Step 1: Clone Repository

```bash
git clone <repository-url>
cd laundry-management/frontend
```

### Step 2: Install Dependencies

```bash
npm install
# or
yarn install
```

### Step 3: Configure Environment Variables

Create a `.env` file in the root directory:

```env
# Development
VITE_API_URL=http://localhost:5000/api

# Production (Render)
# VITE_API_URL=https://laundry-management-44l4.onrender.com/api
```

### Step 4: Start Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173` (or the port shown in terminal)

---

## ⚙️ Configuration

### Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API base URL | `http://localhost:5000/api` |

### API Configuration

The frontend uses Axios with interceptors for API communication. Configuration is in [src/api/axios.js](src/api/axios.js):

- **Base URL:** Set via `VITE_API_URL` environment variable
- **Headers:** Automatically includes Authorization Bearer token
- **Interceptors:** Handles token attachment and error handling

### Build Configuration

Build settings are configured in [vite.config.js](vite.config.js):
- React Fast Refresh for hot module reloading
- Asset optimization
- CSS preprocessing

---

## 💻 Development

### Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Run ESLint
npm run lint
```

### Development Workflow

1. **Start dev server:** `npm run dev`
2. **Make changes** - Auto-reload enabled via Vite HMR
3. **Test in browser** - Changes reflect immediately
4. **Run linter** - `npm run lint` to check code quality
5. **Commit changes** - Follow git workflow

### Code Quality

- **ESLint Configuration:** [eslint.config.js](eslint.config.js)
- **React Hooks Rules:** Enforced via eslint-plugin-react-hooks
- **React Refresh:** Ensures components update correctly

---

## 🏗️ Build & Deployment

### Build for Production

```bash
npm run build
```

This creates an optimized build in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

### Deployment Options

#### 1. **Vercel (Recommended)**
- Connected via [vercel.json](vercel.json)
- Auto-deploys on git push to main branch
- Environment variables configured in Vercel dashboard
- Live at: [https://laundry-management-44l4.onrender.com](https://laundry-management-44l4.onrender.com)

#### 2. **Docker**
- Dockerfile available in [Dockerfile](Dockerfile)
- Build: `docker build -t laundry-frontend .`
- Run: `docker run -p 80:5173 laundry-frontend`

#### 3. **Manual Deployment**
- Build: `npm run build`
- Upload `dist/` folder to hosting service
- Configure server to serve `index.html` for all routes (SPA requirement)

---

## 🔌 API Integration

### Authentication Endpoints

```javascript
// Login
POST /auth/login
{ email: string, password: string }

// Signup
POST /auth/signup
{ email: string, password: string, phone?: string }
```

### Order Endpoints

```javascript
// Get all orders
GET /orders

// Get order by ID
GET /orders/:id

// Create new order
POST /orders
{
  customer_name: string,
  customer_phone: string,
  notes?: string,
  items: [
    { garment_type: string, quantity: number, unit_price: number }
  ]
}

// Update order status
PATCH /orders/:id/status
{ status: 'RECEIVED' | 'PROCESSING' | 'READY' | 'DELIVERED' }

// Delete order
DELETE /orders/:id
```

### Dashboard Endpoints

```javascript
// Get statistics
GET /dashboard/stats
```

### User Endpoints

```javascript
// Get all users
GET /users

// Get user profile
GET /users/profile
```

### Error Handling

All API responses are standardized:

```javascript
// Success Response
{ success: true, data: {...} }

// Error Response
{ success: false, message: string, error: {...} }
```

Errors are caught and displayed as toast notifications to users.

---

## 🎨 Key Features & Components

### 1. Authentication Context ([src/context/AuthContext.jsx](src/context/AuthContext.jsx))

Manages global authentication state:
- User data
- JWT token
- Login/logout functions
- Persistence to localStorage

**Usage:**
```jsx
const { user, token, login, logout, isAuthenticated } = useAuth();
```

### 2. Protected Routes ([src/components/layout/ProtectedRoute.jsx](src/components/layout/ProtectedRoute.jsx))

Wraps routes requiring authentication:
- Checks if user is authenticated
- Redirects to login if not
- Displays component if authenticated

**Usage:**
```jsx
<Route path="/orders" element={<ProtectedRoute><OrdersPage /></ProtectedRoute>} />
```

### 3. Dashboard ([src/pages/DashboardPage.jsx](src/pages/DashboardPage.jsx))

Main analytics dashboard featuring:
- Statistics cards (orders, revenue, time, completion)
- Revenue trend chart (Recharts LineChart)
- Order status distribution (Recharts BarChart)
- Real-time updates

### 4. Order Management

**OrdersPage:** Display all orders with:
- Status filtering
- Customer search
- Status update capability
- Delete functionality
- Pagination support

**CreateOrderPage:** Multi-item order creation:
- Customer information form
- Dynamic item management
- Garment type selection
- Quantity and pricing
- Form validation

**OrderDetailPage:** Individual order view:
- Complete order information
- Item breakdown
- Customer details
- Status history

### 5. Toast Notifications ([react-hot-toast](https://react-hot-toast.com/))

Real-time user feedback:
```javascript
import toast from 'react-hot-toast';

toast.success('Order created!');
toast.error('Failed to load orders');
```

---

## 🔐 Authentication Flow

```
1. User navigates to /login or /signup
2. Submits credentials via loginApi() or signupApi()
3. Backend validates and returns JWT token
4. useAuth().login() stores user data and token
5. Token stored in localStorage for persistence
6. Axios interceptor adds token to all requests
7. Protected routes check isAuthenticated
8. User can access dashboard and orders
9. Logout clears token and redirects to login
```

---

## 🛣️ Routing Architecture

The application uses React Router v6 with the following structure:

```
/                      → Dashboard (Protected)
/login                 → Login Page (Public)
/signup                → Signup Page (Public)
/orders                → Orders List (Protected)
/orders/new            → Create Order (Protected)
/orders/:id            → Order Details (Protected)
/orders/:id/receipt    → Receipt View (Protected)
/pricing               → Pricing Page (Protected)
/users                 → Users Management (Protected)
*                      → Redirect to Home
```

**Layout:** Protected routes use the Layout component with Sidebar and Navbar

---

## 📊 State Management Strategy

### Global State (Context API)
- **AuthContext:** User authentication and session
- **SocketContext:** WebSocket connection (for real-time updates)

### Local State (useState)
- Page-level data (orders, stats, form inputs)
- UI state (loading, modals, filters)

### Custom Hooks
- **useAuth():** Access authentication context
- **useOrders():** Fetch and manage orders
- **useSocket():** WebSocket connection management

---

## 🎯 Component Hierarchy

```
App (Router Setup)
├── AuthProvider (Context)
├── AppRoutes
│   ├── LoginPage / SignupPage (Public)
│   └── ProtectedRoute
│       └── Layout
│           ├── Sidebar
│           ├── Navbar
│           └── Page Component
│               └── Child Components
```

---

## 🔄 Data Flow

```
1. User Action (click, form submit)
   ↓
2. Event Handler
   ↓
3. API Call via axios
   ↓
4. Backend Processing
   ↓
5. Response / Error
   ↓
6. State Update (useState/context)
   ↓
7. Component Re-render
   ↓
8. User Sees Updated UI
   ↓
9. Toast Notification (Success/Error)
```

---

## 🐛 Debugging Tips

### Check API Connection
```javascript
// In browser console
localStorage.getItem('token')  // Check if token is stored
```

### View Network Requests
- Open DevTools → Network tab
- Filter by XHR requests
- Check request headers for Authorization token
- Verify API responses

### Check Authentication State
```javascript
// In any component
const { user, isAuthenticated } = useAuth();
console.log(user, isAuthenticated);
```

### Enable React DevTools
Install React DevTools browser extension to inspect component state and props.

---

## 📦 Deployment Checklist

Before deploying to production:

- [ ] Set `VITE_API_URL` to production backend URL
- [ ] Run `npm run lint` - fix all warnings
- [ ] Test build locally: `npm run build && npm run preview`
- [ ] Test authentication flow
- [ ] Test order creation and updates
- [ ] Verify responsive design on mobile
- [ ] Check all API endpoints work
- [ ] Test error handling
- [ ] Verify socket.io connection (if using real-time features)
- [ ] Set up environment variables in deployment platform
- [ ] Enable HTTPS on production
- [ ] Configure CORS on backend if needed

---

## 🤝 Contributing

### Code Style Guidelines
- Use ES6+ syntax
- Follow existing component patterns
- Keep components focused and reusable
- Add comments for complex logic
- Use meaningful variable names

### Commit Message Format
```
type(scope): description

[optional body]
[optional footer]
```

Examples:
- `feat(orders): add order search functionality`
- `fix(auth): resolve token refresh issue`
- `docs(readme): update installation steps`

### Pull Request Process
1. Create feature branch from `main`
2. Make changes with clear commits
3. Test thoroughly
4. Submit PR with description
5. Address review comments
6. Merge after approval

---

## 📚 Additional Resources

- [React Documentation](https://react.dev/)
- [React Router Documentation](https://reactrouter.com/)
- [Vite Documentation](https://vitejs.dev/)
- [Recharts Documentation](https://recharts.org/)
- [Axios Documentation](https://axios-http.com/)

---

## 📝 License

This project is part of the Laundry Management System. See main repository for license information.

---

## 🆘 Troubleshooting

### Issue: "Cannot find module" errors

**Solution:** 
```bash
rm -rf node_modules package-lock.json
npm install
```

### Issue: Port 5173 already in use

**Solution:**
```bash
npm run dev -- --port 3000
```

### Issue: Token not persisting

**Solution:**
- Check if localStorage is enabled
- Verify token is being set correctly in AuthContext
- Check browser's local storage in DevTools

### Issue: API requests failing with CORS

**Solution:**
- Verify backend is running
- Check `VITE_API_URL` environment variable
- Ensure backend has CORS enabled
- Check network tab in DevTools for actual request URL

### Issue: Components not updating

**Solution:**
- Check if using `key` prop correctly in lists
- Verify state updates are happening
- Check React DevTools for component tree
- Ensure event handlers are bound correctly

---

## 📞 Support

For issues, questions, or suggestions, please:
1. Check existing issues in the repository
2. Create a detailed issue with steps to reproduce
3. Contact the development team

---

**Last Updated:** April 2026  
**Frontend Version:** 0.0.0
