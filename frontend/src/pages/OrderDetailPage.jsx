import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getOrderByIdApi, updateStatusApi } from '../api/order.api';
import Navbar from '../components/layout/Navbar';
import StatusBadge from '../components/orders/StatusBadge';
import toast from 'react-hot-toast';
import { ArrowLeft, User, Phone, FileText, Calendar, Printer } from 'lucide-react';

const STATUSES = ['RECEIVED', 'PROCESSING', 'READY', 'DELIVERED'];

const OrderDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchOrder = () => {
    getOrderByIdApi(id)
      .then(res => setOrder(res.data.data))
      .catch(() => toast.error('Order not found'))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchOrder(); }, [id]);

  const handleStatusChange = async (status) => {
    try {
      await updateStatusApi(id, status);
      toast.success('Status updated!');
      fetchOrder();
    } catch {
      toast.error('Failed to update status');
    }
  };

  if (loading) return (
    <div><Navbar title="Order Detail" />
      <div style={{ padding: '40px', textAlign: 'center', color: '#64748b' }}>Loading…</div>
    </div>
  );

  if (!order) return (
    <div><Navbar title="Order Detail" />
      <div style={{ padding: '40px', textAlign: 'center', color: '#ef4444' }}>Order not found.</div>
    </div>
  );

  return (
    <div>
      <Navbar title={`Order #${order.id}`} />
      <div style={{ padding: '32px', maxWidth: '760px' }}>

        {/* Top Buttons */}
        <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
          <button onClick={() => navigate('/orders')} style={outlineBtn}>
            <ArrowLeft size={16} /> Back to Orders
          </button>
          <button onClick={() => navigate(`/orders/${id}/receipt`)} style={primaryBtn}>
            <Printer size={16} /> Print Receipt
          </button>
        </div>

        {/* Header Card */}
        <div style={card}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <h2 style={{ margin: '0 0 8px', fontSize: '20px', fontWeight: 700 }}>Order #{order.id}</h2>
              <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                <span style={meta}><User size={14} /> {order.customer_name}</span>
                <span style={meta}><Phone size={14} /> {order.customer_phone}</span>
                <span style={meta}><Calendar size={14} /> {new Date(order.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                {order.creator && <span style={meta}><FileText size={14} /> By {order.creator.name}</span>}
              </div>
              {order.notes && (
                <div style={{ marginTop: '12px', padding: '10px 14px', background: '#fef9c3', borderRadius: '8px', fontSize: '13px', color: '#854d0e' }}>
                  📝 {order.notes}
                </div>
              )}
            </div>
            <div style={{ textAlign: 'right' }}>
              <StatusBadge status={order.status} />
              <div style={{ marginTop: '12px' }}>
                <label style={{ fontSize: '12px', color: '#64748b', display: 'block', marginBottom: '4px' }}>Change Status</label>
                <select value={order.status} onChange={e => handleStatusChange(e.target.value)}
                  style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '13px', cursor: 'pointer' }}>
                  {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Items Table */}
        <div style={card}>
          <h3 style={{ margin: '0 0 16px', fontSize: '16px', fontWeight: 600 }}>Order Items</h3>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                {['Garment', 'Qty', 'Unit Price', 'Subtotal'].map(h => (
                  <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontSize: '13px', fontWeight: 600, color: '#64748b' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {order.items?.map((item, i) => (
                <tr key={i} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={td}>{item.garment_type}</td>
                  <td style={td}>{item.quantity}</td>
                  <td style={td}>₹{item.unit_price}</td>
                  <td style={td}><strong>₹{item.subtotal}</strong></td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{
            marginTop: '16px', padding: '16px', background: '#eff6ff',
            borderRadius: '8px', display: 'flex', justifyContent: 'flex-end',
          }}>
            <div style={{ fontSize: '18px', fontWeight: 700, color: '#1d4ed8' }}>
              Total: ₹{order.total_amount}
            </div>
          </div>
        </div>

        {/* Status Timeline */}
        <div style={card}>
          <h3 style={{ margin: '0 0 16px', fontSize: '16px', fontWeight: 600 }}>Status Timeline</h3>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {STATUSES.map((s, i) => {
              const currentIdx = STATUSES.indexOf(order.status);
              const isDone = i <= currentIdx;
              return (
                <div key={s} style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                  <div style={{ textAlign: 'center', flex: 1 }}>
                    <div style={{
                      width: '32px', height: '32px', borderRadius: '50%', margin: '0 auto 6px',
                      background: isDone ? '#3b82f6' : '#e2e8f0',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: isDone ? '#fff' : '#94a3b8', fontSize: '13px', fontWeight: 700,
                    }}>{i + 1}</div>
                    <div style={{ fontSize: '11px', fontWeight: 600, color: isDone ? '#3b82f6' : '#94a3b8' }}>{s}</div>
                  </div>
                  {i < STATUSES.length - 1 && (
                    <div style={{ height: '2px', flex: 1, background: i < currentIdx ? '#3b82f6' : '#e2e8f0', margin: '0 4px', marginBottom: '20px' }} />
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};

const card       = { background: '#fff', borderRadius: '12px', padding: '24px', marginBottom: '20px', boxShadow: '0 1px 8px rgba(0,0,0,0.06)' };
const meta       = { display: 'flex', alignItems: 'center', gap: '5px', fontSize: '13px', color: '#64748b' };
const td         = { padding: '12px 14px', fontSize: '14px', color: '#1e293b' };
const outlineBtn = { display: 'flex', alignItems: 'center', gap: '6px', padding: '9px 16px', borderRadius: '8px', background: '#fff', border: '1px solid #e2e8f0', color: '#374151', fontSize: '13px', fontWeight: 600, cursor: 'pointer' };
const primaryBtn = { display: 'flex', alignItems: 'center', gap: '6px', padding: '9px 16px', borderRadius: '8px', background: '#3b82f6', border: 'none', color: '#fff', fontSize: '13px', fontWeight: 600, cursor: 'pointer' };

export default OrderDetailPage;