import { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getOrderByIdApi } from '../api/order.api';
import toast from 'react-hot-toast';
import { Printer, ArrowLeft, Download } from 'lucide-react';

const ReceiptPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const printRef = useRef();

  useEffect(() => {
    getOrderByIdApi(id)
      .then(res => setOrder(res.data.data))
      .catch(() => toast.error('Order not found'))
      .finally(() => setLoading(false));
  }, [id]);

  const handlePrint = () => window.print();

  if (loading) return <div style={{ padding: '40px', textAlign: 'center' }}>Loading receipt…</div>;
  if (!order)  return <div style={{ padding: '40px', textAlign: 'center', color: '#ef4444' }}>Order not found.</div>;

  const date = new Date(order.created_at).toLocaleDateString('en-IN', {
    day: 'numeric', month: 'long', year: 'numeric',
  });

  return (
    <>
      {/* Print styles */}
      <style>{`
        @media print {
          .no-print { display: none !important; }
          body { background: #fff !important; }
          .receipt-wrapper { box-shadow: none !important; margin: 0 !important; max-width: 100% !important; }
        }
      `}</style>

      {/* Toolbar */}
      <div className="no-print" style={{
        background: '#1e293b', padding: '16px 32px',
        display: 'flex', gap: '12px', alignItems: 'center',
      }}>
        <button onClick={() => navigate(`/orders/${id}`)} style={toolBtn('#334155')}>
          <ArrowLeft size={16} /> Back
        </button>
        <button onClick={handlePrint} style={toolBtn('#3b82f6')}>
          <Printer size={16} /> Print Receipt
        </button>
      </div>

      {/* Receipt */}
      <div style={{ background: '#f1f5f9', minHeight: '100vh', padding: '32px', display: 'flex', justifyContent: 'center' }}>
        <div ref={printRef} className="receipt-wrapper" style={{
          background: '#fff', width: '100%', maxWidth: '480px',
          borderRadius: '12px', boxShadow: '0 4px 24px rgba(0,0,0,0.1)',
          padding: '40px', fontFamily: 'monospace',
        }}>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '24px', borderBottom: '2px dashed #e2e8f0', paddingBottom: '20px' }}>
            <div style={{ fontSize: '28px', marginBottom: '4px' }}>🧺</div>
            <h1 style={{ margin: '0 0 4px', fontSize: '22px', fontWeight: 800, letterSpacing: '2px' }}>LAUNDRYPRO</h1>
            <div style={{ fontSize: '12px', color: '#64748b' }}>Professional Laundry Services</div>
            <div style={{ fontSize: '12px', color: '#64748b', marginTop: '4px' }}>📞 +91-XXXXXXXXXX</div>
          </div>

          {/* Order Info */}
          <div style={{ marginBottom: '20px' }}>
            <Row label="Receipt No."   value={`#${String(order.id).padStart(4, '0')}`} bold />
            <Row label="Date"          value={date} />
            <Row label="Customer"      value={order.customer_name} />
            <Row label="Phone"         value={order.customer_phone} />
            <Row label="Status"        value={order.status} />
            {order.creator && <Row label="Staff" value={order.creator.name} />}
          </div>

          {/* Items */}
          <div style={{ borderTop: '2px dashed #e2e8f0', borderBottom: '2px dashed #e2e8f0', padding: '16px 0', marginBottom: '16px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', marginBottom: '8px' }}>
              {['Item', 'Qty', 'Rate', 'Amt'].map(h => (
                <div key={h} style={{ fontSize: '11px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>{h}</div>
              ))}
            </div>
            {order.items?.map((item, i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', marginBottom: '6px' }}>
                <div style={{ fontSize: '13px' }}>{item.garment_type}</div>
                <div style={{ fontSize: '13px' }}>{item.quantity}</div>
                <div style={{ fontSize: '13px' }}>₹{item.unit_price}</div>
                <div style={{ fontSize: '13px', fontWeight: 600 }}>₹{item.subtotal}</div>
              </div>
            ))}
          </div>

          {/* Total */}
          <div style={{ marginBottom: '24px' }}>
            <Row label="Subtotal" value={`₹${order.total_amount}`} />
            <Row label="Tax (0%)" value="₹0.00" />
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px', paddingTop: '8px', borderTop: '1px solid #e2e8f0' }}>
              <span style={{ fontSize: '16px', fontWeight: 800 }}>TOTAL</span>
              <span style={{ fontSize: '16px', fontWeight: 800, color: '#3b82f6' }}>₹{order.total_amount}</span>
            </div>
          </div>

          {/* Notes */}
          {order.notes && (
            <div style={{ background: '#fef9c3', borderRadius: '8px', padding: '10px 14px', marginBottom: '20px', fontSize: '12px', color: '#854d0e' }}>
              📝 Note: {order.notes}
            </div>
          )}

          {/* Footer */}
          <div style={{ textAlign: 'center', borderTop: '2px dashed #e2e8f0', paddingTop: '20px' }}>
            <div style={{ fontSize: '13px', fontWeight: 600, marginBottom: '4px' }}>Thank you for your business! 🙏</div>
            <div style={{ fontSize: '11px', color: '#94a3b8' }}>Please keep this receipt for your records.</div>
            <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '8px' }}>
              Generated by LaundryPro • {new Date().toLocaleDateString('en-IN')}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const Row = ({ label, value, bold }) => (
  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
    <span style={{ fontSize: '12px', color: '#64748b' }}>{label}:</span>
    <span style={{ fontSize: '12px', fontWeight: bold ? 700 : 500 }}>{value}</span>
  </div>
);

const toolBtn = (bg) => ({
  display: 'flex', alignItems: 'center', gap: '6px',
  padding: '8px 16px', borderRadius: '8px', background: bg,
  color: '#fff', border: 'none', fontSize: '13px',
  fontWeight: 600, cursor: 'pointer',
});

export default ReceiptPage;