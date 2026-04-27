import { useEffect, useState } from 'react';
import { getStatsApi } from '../api/dashboard.api';
import Navbar from '../components/layout/Navbar';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { ShoppingBag, IndianRupee, Clock, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';

const StatCard = ({ label, value, icon: Icon, color }) => (
  <div style={{
    background: '#fff', borderRadius: '12px', padding: '24px',
    boxShadow: '0 1px 8px rgba(0,0,0,0.06)', display: 'flex',
    alignItems: 'center', gap: '16px',
  }}>
    <div style={{ background: color + '20', borderRadius: '10px', padding: '12px' }}>
      <Icon size={24} color={color} />
    </div>
    <div>
      <div style={{ fontSize: '13px', color: '#64748b', marginBottom: '4px' }}>{label}</div>
      <div style={{ fontSize: '24px', fontWeight: 700, color: '#1e293b' }}>{value}</div>
    </div>
  </div>
);

const DashboardPage = () => {
  const [stats, setStats]     = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getStatsApi()
      .then(res => setStats(res.data.data))
      .catch(() => toast.error('Failed to load dashboard'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return (
    <div>
      <Navbar title="Dashboard" />
      <div style={{ padding: '40px', textAlign: 'center', color: '#64748b' }}>Loading…</div>
    </div>
  );

  return (
    <div>
      <Navbar title="Dashboard" />
      <div style={{ padding: '32px' }}>

        {/* KPI Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '32px' }}>
          <StatCard label="Total Orders"     value={stats?.totalOrders}     icon={ShoppingBag}  color="#3b82f6" />
          <StatCard label="Total Revenue"    value={`₹${stats?.totalRevenue}`} icon={IndianRupee} color="#10b981" />
          <StatCard label="Pending Orders"   value={stats?.pendingOrders}   icon={Clock}        color="#f59e0b" />
          <StatCard label="Delivered"        value={stats?.deliveredOrders} icon={CheckCircle}  color="#8b5cf6" />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '32px' }}>
          {/* Revenue Chart */}
          <div style={{ background: '#fff', borderRadius: '12px', padding: '24px', boxShadow: '0 1px 8px rgba(0,0,0,0.06)' }}>
            <h3 style={{ margin: '0 0 20px', fontSize: '16px', fontWeight: 600 }}>Revenue (Last 7 Days)</h3>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={stats?.revenueByDay || []}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip formatter={(v) => [`₹${v}`, 'Revenue']} />
                <Line type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={2} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Top Garments */}
          <div style={{ background: '#fff', borderRadius: '12px', padding: '24px', boxShadow: '0 1px 8px rgba(0,0,0,0.06)' }}>
            <h3 style={{ margin: '0 0 20px', fontSize: '16px', fontWeight: 600 }}>Top Garments</h3>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={stats?.topGarments || []}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="garment_type" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="total_qty" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Status Breakdown */}
        <div style={{ background: '#fff', borderRadius: '12px', padding: '24px', boxShadow: '0 1px 8px rgba(0,0,0,0.06)' }}>
          <h3 style={{ margin: '0 0 16px', fontSize: '16px', fontWeight: 600 }}>Orders by Status</h3>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            {stats?.statusBreakdown?.map(s => (
              <div key={s.status} style={{
                background: '#f8fafc', borderRadius: '8px', padding: '16px 24px', textAlign: 'center',
              }}>
                <div style={{ fontSize: '24px', fontWeight: 700, color: '#1e293b' }}>{s.count}</div>
                <div style={{ fontSize: '13px', color: '#64748b' }}>{s.status}</div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default DashboardPage;