import { useEffect, useState } from 'react';
import Navbar from '../components/layout/Navbar';
import { IndianRupee } from 'lucide-react';

const PRICE_LIST = [
  { garment: 'Shirt', price: 50, icon: '👕' },
  { garment: 'Pants', price: 80, icon: '👖' },
  { garment: 'Saree', price: 150, icon: '🥻' },
  { garment: 'Suit', price: 200, icon: '🤵' },
  { garment: 'Jacket', price: 120, icon: '🧥' },
  { garment: 'Bedsheet', price: 100, icon: '🛏️' },
  { garment: 'Curtain', price: 130, icon: '🪟' },
  { garment: 'Dress', price: 90, icon: '👗' },
  { garment: 'TShirt', price: 40, icon: '👕' },
  { garment: 'Other', price: 60, icon: '🧺' },
];

const PricingPage = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    setUser(storedUser);
  }, []);

  const isAdmin = user?.role === 'admin';

  return (
    <div>
      <Navbar title="Pricing List" />
      <div style={{ padding: '32px', maxWidth: '700px' }}>

        <div style={{
          background: '#eff6ff', borderRadius: '12px', padding: '20px 24px',
          marginBottom: '24px', display: 'flex', gap: '12px', alignItems: 'flex-start',
        }}>
          <IndianRupee size={20} color="#3b82f6" style={{ marginTop: '2px' }} />
          <div>
            <div style={{ fontWeight: 600, fontSize: '15px', color: '#1d4ed8' }}>Auto Pricing Active</div>
            <div style={{ fontSize: '13px', color: '#3b82f6', marginTop: '4px' }}>
              When you create an order and leave the price blank, these rates are applied automatically.
            </div>
          </div>
        </div>

        <div style={{
          background: '#fff', borderRadius: '12px',
          boxShadow: '0 1px 8px rgba(0,0,0,0.06)', overflow: 'hidden',
        }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
                <th style={th}>Garment Type</th>
                <th style={{ ...th, textAlign: 'right' }}>Price per piece</th>
              </tr>
            </thead>
            <tbody>
              {PRICE_LIST.map(({ garment, price, icon }, i) => (
                <tr key={garment} style={{
                  borderBottom: '1px solid #f1f5f9',
                  background: i % 2 === 0 ? '#fff' : '#fafafa',
                }}>
                  <td style={td}>
                    <span style={{ marginRight: '10px', fontSize: '18px' }}>{icon}</span>
                    <strong>{garment}</strong>
                  </td>
                  <td style={{ ...td, textAlign: 'right', color: '#10b981', fontWeight: 700, fontSize: '16px' }}>
                    ₹{price}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {isAdmin && (
          <p style={{ marginTop: '16px', fontSize: '13px', color: '#94a3b8', textAlign: 'center' }}>
            To change prices, update <code>backend/src/services/billing.service.js</code>
          </p>
        )}

      </div>
    </div>
  );
};

const th = { padding: '12px 20px', textAlign: 'left', fontSize: '13px', fontWeight: 600, color: '#64748b' };
const td = { padding: '14px 20px', fontSize: '14px', color: '#1e293b', verticalAlign: 'middle' };

export default PricingPage;