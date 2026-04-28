import { useEffect, useState } from 'react';
import Navbar from '../components/layout/Navbar';
import { getUsersApi } from '../api/user.api';
import { Users, ShieldCheck, UserRound, Badge, Search } from 'lucide-react';
import toast from 'react-hot-toast';

const StatCard = ({ label, value, icon: Icon, color }) => (
  <div style={{
    background: '#fff', borderRadius: '12px', padding: '22px',
    boxShadow: '0 1px 8px rgba(0,0,0,0.06)',
    display: 'flex', alignItems: 'center', gap: '14px',
  }}>
    <div style={{ background: color + '20', borderRadius: '10px', padding: '12px' }}>
      <Icon size={22} color={color} />
    </div>
    <div>
      <div style={{ fontSize: '13px', color: '#64748b' }}>{label}</div>
      <div style={{ fontSize: '24px', fontWeight: 700, color: '#1e293b' }}>{value}</div>
    </div>
  </div>
);

const UsersPage = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');

  useEffect(() => {
    getUsersApi()
      .then(res => setData(res.data.data))
      .catch(() => toast.error('Only admin can access users'))
      .finally(() => setLoading(false));
  }, []);

  const users = data?.users || [];

  const filteredUsers = users.filter(user => {
    const matchesSearch =
      user.name?.toLowerCase().includes(search.toLowerCase()) ||
      user.email?.toLowerCase().includes(search.toLowerCase());

    const matchesRole =
      roleFilter === 'all' || user.role === roleFilter;

    return matchesSearch && matchesRole;
  });

  if (loading) {
    return (
      <div>
        <Navbar title="Users" />
        <div style={{ padding: '40px', textAlign: 'center', color: '#64748b' }}>Loading…</div>
      </div>
    );
  }

  return (
    <div>
      <Navbar title="Users" />
      <div style={{ padding: '32px' }}>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '20px',
          marginBottom: '32px',
        }}>
          <StatCard label="Total Users" value={data?.totalUsers || 0} icon={Users} color="#3b82f6" />
          <StatCard label="Admins" value={data?.totalAdmins || 0} icon={ShieldCheck} color="#8b5cf6" />
          <StatCard label="Staff" value={data?.totalStaff || 0} icon={Badge} color="#f59e0b" />
          <StatCard label="Customers" value={data?.totalCustomers || 0} icon={UserRound} color="#10b981" />
        </div>

        <div style={{
          background: '#fff',
          borderRadius: '12px',
          boxShadow: '0 1px 8px rgba(0,0,0,0.06)',
          padding: '16px',
          marginBottom: '20px',
          display: 'flex',
          gap: '12px',
          alignItems: 'center',
          flexWrap: 'wrap',
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            border: '1px solid #e2e8f0',
            borderRadius: '8px',
            padding: '10px 12px',
            flex: '1',
            minWidth: '260px',
          }}>
            <Search size={16} color="#64748b" />
            <input
              placeholder="Search by name or email..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{
                border: 'none',
                outline: 'none',
                width: '100%',
                fontSize: '14px',
              }}
            />
          </div>

          <select
            value={roleFilter}
            onChange={e => setRoleFilter(e.target.value)}
            style={{
              padding: '10px 12px',
              borderRadius: '8px',
              border: '1px solid #e2e8f0',
              fontSize: '14px',
              outline: 'none',
              minWidth: '160px',
            }}
          >
            <option value="all">All Roles</option>
            <option value="admin">Admin</option>
            <option value="staff">Staff</option>
            <option value="customer">Customer</option>
          </select>
        </div>

        <div style={{
          background: '#fff',
          borderRadius: '12px',
          boxShadow: '0 1px 8px rgba(0,0,0,0.06)',
          overflow: 'hidden',
        }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                {['ID', 'Name', 'Email', 'Role', 'Created At'].map(h => (
                  <th key={h} style={th}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={5} style={{ padding: '40px', textAlign: 'center', color: '#94a3b8' }}>
                    No users found
                  </td>
                </tr>
              ) : (
                filteredUsers.map(user => (
                  <tr key={user.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={td}>#{user.id}</td>
                    <td style={td}><strong>{user.name}</strong></td>
                    <td style={td}>{user.email}</td>
                    <td style={td}>
                      <span style={{
                        padding: '4px 10px',
                        borderRadius: '999px',
                        background: '#eff6ff',
                        color: '#2563eb',
                        fontSize: '12px',
                        fontWeight: 600,
                        textTransform: 'uppercase',
                      }}>
                        {user.role}
                      </span>
                    </td>
                    <td style={td}>
                      {user.created_at ? new Date(user.created_at).toLocaleString() : '-'}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
};

const th = {
  padding: '12px 16px',
  textAlign: 'left',
  fontSize: '13px',
  fontWeight: 600,
  color: '#64748b',
};

const td = {
  padding: '14px 16px',
  fontSize: '14px',
  color: '#1e293b',
};

export default UsersPage;