import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getOrdersApi, updateStatusApi, deleteOrderApi } from '../api/order.api';
import Navbar from '../components/layout/Navbar';
import StatusBadge from '../components/orders/StatusBadge';
import toast from 'react-hot-toast';
import { Trash2, Eye, PlusCircle } from 'lucide-react';

const STATUSES = ['RECEIVED', 'PROCESSING', 'READY', 'DELIVERED'];

const OrdersPage = () => {
  const [orders,  setOrders]  = useState([]);
  const [loading, setLoading] = useState(true);
  const [search,  setSearch]  = useState('');
  const navigate = useNavigate();

  const fetchOrders = () => {
    getOrdersApi()
      .then(res => setOrders(res.data.data))
      .catch(() => toast.error('Failed to load orders'))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchOrders(); }, []);

  const handleStatusChange = async (id, status) => {
    try {
      await updateStatusApi(id, status);
      toast.success('Status updated');
      fetchOrders();
    } catch {
      toast.error('Failed to update status');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this order?')) return;
    try {
      await deleteOrderApi(id);
      toast.success('Order deleted');
      fetchOrders();
    } catch {
      toast.error('Failed to delete');
    }
  };

  const filtered = orders.filter(o =>
    o.customer_name.toLowerCase().includes(search.toLowerCase()) ||
    o.customer_phone.includes(search)
  );

  return (
    <div>
      <Navbar title="Orders" />
      <div style={{ padding: '32px' }}>

        {/* Toolbar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px', gap: '16px' }}>
          <input
            placeholder="Search by name or phone…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              padding: '10px 16px', borderRadius: '8px', border: '1px solid #e2e8f0',
              fontSize: '14px', width: '300px', outline: 'none',
            }}
          />
          <button onClick={() => navigate('/orders/new')} style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            padding: '10px 20px', borderRadius: '8px', background: '#3b82f6',
            color: '#fff', border: 'none', fontSize: '14px', fontWeight: 600, cursor: 'pointer',
          }}>
            <PlusCircle size={16} /> New Order
          </button>
        </div>

        {/* Table */}
        <div style={{ background: '#fff', borderRadius: '12px', boxShadow: '0 1px 8px rgba(0,0,0,0.06)', overflow: 'hidden' }}>
          {loading ? (
            <div style={{ padding: '40px', textAlign: 'center', color: '#64748b' }}>Loading…</div>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                  {['ID', 'Customer', 'Phone', 'Items', 'Total', 'Status', 'Actions'].map(h => (
                    <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontSize: '13px', fontWeight: 600, color: '#64748b' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr><td colSpan={7} style={{ padding: '40px', textAlign: 'center', color: '#94a3b8' }}>No orders found</td></tr>
                ) : filtered.map(order => (
                  <tr key={order.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={td}>#{order.id}</td>
                    <td style={td}><strong>{order.customer_name}</strong></td>
                    <td style={td}>{order.customer_phone}</td>
                    <td style={td}>{order.items?.length || 0} item(s)</td>
                    <td style={td}>₹{order.total_amount}</td>
                    <td style={td}>
                      <select
                        value={order.status}
                        onChange={e => handleStatusChange(order.id, e.target.value)}
                        style={{ padding: '4px 8px', borderRadius: '6px', border: '1px solid #e2e8f0', fontSize: '13px' }}
                      >
                        {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </td>
                    <td style={td}>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button onClick={() => navigate(`/orders/${order.id}`)}
                          style={{ ...iconBtn, color: '#3b82f6' }}><Eye size={16} /></button>
                        <button onClick={() => handleDelete(order.id)}
                          style={{ ...iconBtn, color: '#ef4444' }}><Trash2 size={16} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

const td = { padding: '14px 16px', fontSize: '14px', color: '#1e293b' };
const iconBtn = { background: 'none', border: 'none', cursor: 'pointer', padding: '4px' };

export default OrdersPage;