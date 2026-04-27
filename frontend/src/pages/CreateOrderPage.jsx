import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createOrderApi } from '../api/order.api';
import Navbar from '../components/layout/Navbar';
import toast from 'react-hot-toast';
import { PlusCircle, Trash2 } from 'lucide-react';

const GARMENTS = ['Shirt', 'Pants', 'Saree', 'Suit', 'Jacket', 'Bedsheet', 'Curtain', 'Dress', 'TShirt'];

const emptyItem = () => ({ garment_type: 'Shirt', quantity: 1, unit_price: '' });

const CreateOrderPage = () => {
  const [form, setForm] = useState({ customer_name: '', customer_phone: '', notes: '' });
  const [items, setItems] = useState([emptyItem()]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const updateItem = (idx, field, value) => {
    setItems(prev => prev.map((it, i) => i === idx ? { ...it, [field]: value } : it));
  };

  const addItem    = () => setItems(prev => [...prev, emptyItem()]);
  const removeItem = (idx) => setItems(prev => prev.filter((_, i) => i !== idx));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (items.length === 0) return toast.error('Add at least one item');
    setLoading(true);
    try {
      await createOrderApi({
        ...form,
        items: items.map(it => ({
          garment_type: it.garment_type,
          quantity:     parseInt(it.quantity),
          unit_price:   it.unit_price ? parseFloat(it.unit_price) : undefined,
        })),
      });
      toast.success('Order created!');
      navigate('/orders');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to create order');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar title="New Order" />
      <div style={{ padding: '32px', maxWidth: '700px' }}>
        <form onSubmit={handleSubmit}>

          {/* Customer Info */}
          <div style={card}>
            <h3 style={cardTitle}>Customer Information</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <label style={label}>Customer Name *</label>
                <input required value={form.customer_name} placeholder="Rahul Kumar"
                  onChange={e => setForm({ ...form, customer_name: e.target.value })} style={input} />
              </div>
              <div>
                <label style={label}>Phone Number *</label>
                <input required value={form.customer_phone} placeholder="9876543210"
                  onChange={e => setForm({ ...form, customer_phone: e.target.value })} style={input} />
              </div>
            </div>
            <div style={{ marginTop: '16px' }}>
              <label style={label}>Notes (optional)</label>
              <textarea value={form.notes} placeholder="Any special instructions…"
                onChange={e => setForm({ ...form, notes: e.target.value })}
                style={{ ...input, height: '80px', resize: 'vertical' }} />
            </div>
          </div>

          {/* Items */}
          <div style={card}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 600 }}>Order Items</h3>
              <button type="button" onClick={addItem} style={{
                display: 'flex', alignItems: 'center', gap: '6px',
                padding: '8px 14px', borderRadius: '8px', background: '#eff6ff',
                color: '#3b82f6', border: '1px solid #bfdbfe', fontSize: '13px', fontWeight: 600, cursor: 'pointer',
              }}>
                <PlusCircle size={14} /> Add Item
              </button>
            </div>

            {items.map((item, idx) => (
              <div key={idx} style={{
                display: 'grid', gridTemplateColumns: '2fr 1fr 1fr auto',
                gap: '12px', alignItems: 'end', marginBottom: '12px',
              }}>
                <div>
                  {idx === 0 && <label style={label}>Garment</label>}
                  <select value={item.garment_type}
                    onChange={e => updateItem(idx, 'garment_type', e.target.value)} style={input}>
                    {GARMENTS.map(g => <option key={g}>{g}</option>)}
                  </select>
                </div>
                <div>
                  {idx === 0 && <label style={label}>Qty</label>}
                  <input type="number" min="1" value={item.quantity}
                    onChange={e => updateItem(idx, 'quantity', e.target.value)} style={input} />
                </div>
                <div>
                  {idx === 0 && <label style={label}>Price (₹)</label>}
                  <input type="number" step="0.01" value={item.unit_price} placeholder="Auto"
                    onChange={e => updateItem(idx, 'unit_price', e.target.value)} style={input} />
                </div>
                <button type="button" onClick={() => removeItem(idx)} disabled={items.length === 1}
                  style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '10px' }}>
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
            <p style={{ fontSize: '12px', color: '#94a3b8', margin: '8px 0 0' }}>
              💡 Leave Price blank to use automatic pricing
            </p>
          </div>

          <button type="submit" disabled={loading} style={{
            padding: '14px 32px', borderRadius: '8px', background: '#3b82f6',
            color: '#fff', border: 'none', fontSize: '15px', fontWeight: 600, cursor: 'pointer',
          }}>
            {loading ? 'Creating…' : 'Create Order'}
          </button>
        </form>
      </div>
    </div>
  );
};

const card      = { background: '#fff', borderRadius: '12px', padding: '24px', marginBottom: '20px', boxShadow: '0 1px 8px rgba(0,0,0,0.06)' };
const cardTitle = { margin: '0 0 16px', fontSize: '16px', fontWeight: 600 };
const label     = { display: 'block', marginBottom: '6px', fontWeight: 600, fontSize: '13px', color: '#374151' };
const input     = { width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '14px', outline: 'none', boxSizing: 'border-box' };

export default CreateOrderPage;