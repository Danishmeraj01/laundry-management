import { useAuth } from '../../context/AuthContext';

const Navbar = ({ title }) => {
  const { user } = useAuth();
  return (
    <header style={{
      background: '#fff', borderBottom: '1px solid #e2e8f0',
      padding: '16px 32px', display: 'flex',
      justifyContent: 'space-between', alignItems: 'center',
    }}>
      <h1 style={{ margin: 0, fontSize: '20px', fontWeight: 700, color: '#1e293b' }}>{title}</h1>
      <div style={{ fontSize: '14px', color: '#64748b' }}>
        Welcome, <strong>{user?.name}</strong>
      </div>
    </header>
  );
};

export default Navbar;