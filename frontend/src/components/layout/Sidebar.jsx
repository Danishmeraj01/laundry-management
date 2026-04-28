import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  LayoutDashboard,
  ShoppingBag,
  PlusCircle,
  LogOut,
  Shirt,
  IndianRupee,
  Users
} from 'lucide-react';

const baseLinks = [
  { to: '/',           label: 'Dashboard', icon: LayoutDashboard },
  { to: '/orders',     label: 'Orders',    icon: ShoppingBag },
  { to: '/orders/new', label: 'New Order', icon: PlusCircle },
  { to: '/pricing',    label: 'Pricing',   icon: IndianRupee },
];

const Sidebar = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // ✅ Admin-only link add
  const links = [
    ...baseLinks,
    ...(user?.role === 'admin'
      ? [{ to: '/users', label: 'Users', icon: Users }]
      : []),
  ];

  return (
    <aside style={{
      width: '240px',
      minHeight: '100vh',
      background: '#1e293b',
      color: '#fff',
      display: 'flex',
      flexDirection: 'column',
      position: 'fixed',
      top: 0,
      left: 0,
      zIndex: 100,
    }}>
      <div style={{
        padding: '24px 20px',
        borderBottom: '1px solid #334155',
        display: 'flex',
        alignItems: 'center',
        gap: '10px'
      }}>
        <Shirt size={28} color="#60a5fa" />
        <div>
          <div style={{ fontWeight: 700, fontSize: '16px' }}>LaundryPro</div>
          <div style={{ fontSize: '11px', color: '#94a3b8' }}>Management System</div>
        </div>
      </div>

      <div style={{ padding: '16px 20px', borderBottom: '1px solid #334155' }}>
        <div style={{ fontSize: '13px', color: '#94a3b8' }}>Logged in as</div>
        <div style={{ fontWeight: 600, fontSize: '14px' }}>{user?.name}</div>
        <div style={{
          fontSize: '11px',
          color: '#60a5fa',
          textTransform: 'uppercase'
        }}>
          {user?.role}
        </div>
      </div>

      <nav style={{ flex: 1, padding: '16px 12px' }}>
        {links.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            style={({ isActive }) => ({
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '10px 12px',
              borderRadius: '8px',
              marginBottom: '4px',
              textDecoration: 'none',
              fontSize: '14px',
              fontWeight: 500,
              background: isActive ? '#3b82f6' : 'transparent',
              color: isActive ? '#fff' : '#94a3b8',
            })}
          >
            <Icon size={18} />
            {label}
          </NavLink>
        ))}
      </nav>

      <div style={{ padding: '16px 12px', borderTop: '1px solid #334155' }}>
        <button
          onClick={handleLogout}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            width: '100%',
            padding: '10px 12px',
            borderRadius: '8px',
            background: 'transparent',
            border: 'none',
            color: '#f87171',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: 500,
          }}
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;