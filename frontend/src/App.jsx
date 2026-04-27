import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './context/AuthContext';
import ProtectedRoute from './components/layout/ProtectedRoute';
import Sidebar from './components/layout/Sidebar';

import LoginPage       from './pages/LoginPage';
import SignupPage      from './pages/SignupPage';
import DashboardPage   from './pages/DashboardPage';
import OrdersPage      from './pages/OrdersPage';
import CreateOrderPage from './pages/CreateOrderPage';
import OrderDetailPage from './pages/OrderDetailPage';
import PricingPage     from './pages/PricingPage';
import ReceiptPage     from './pages/ReceiptPage';

const Layout = ({ children }) => (
  <div style={{ display: 'flex', minHeight: '100vh', background: '#f1f5f9' }}>
    <Sidebar />
    <main style={{ flex: 1, marginLeft: '240px', minHeight: '100vh' }}>
      {children}
    </main>
  </div>
);

const AppRoutes = () => {
  const { isAuthenticated } = useAuth();
  return (
    <Routes>
      <Route path="/login"  element={isAuthenticated ? <Navigate to="/" /> : <LoginPage />} />
      <Route path="/signup" element={isAuthenticated ? <Navigate to="/" /> : <SignupPage />} />

      <Route path="/" element={<ProtectedRoute><Layout><DashboardPage /></Layout></ProtectedRoute>} />
      <Route path="/orders" element={<ProtectedRoute><Layout><OrdersPage /></Layout></ProtectedRoute>} />
      <Route path="/orders/new" element={<ProtectedRoute><Layout><CreateOrderPage /></Layout></ProtectedRoute>} />
      <Route path="/orders/:id" element={<ProtectedRoute><Layout><OrderDetailPage /></Layout></ProtectedRoute>} />
      <Route path="/orders/:id/receipt" element={<ProtectedRoute><ReceiptPage /></ProtectedRoute>} />
      <Route path="/pricing" element={<ProtectedRoute><Layout><PricingPage /></Layout></ProtectedRoute>} />

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

const App = () => (
  <BrowserRouter>
    <AuthProvider>
      <Toaster position="top-right" />
      <AppRoutes />
    </AuthProvider>
  </BrowserRouter>
);

export default App;