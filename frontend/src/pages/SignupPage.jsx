import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { signupApi } from '../api/auth.api';
import toast from 'react-hot-toast';
import { Shirt } from 'lucide-react';

const SignupPage = () => {
  const [form, setForm]       = useState({ name: '', email: '', password: '', role: 'staff' });
  const [loading, setLoading] = useState(false);
  const { login }             = useAuth();
  const navigate              = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await signupApi(form);
      login(res.data.data.user, res.data.data.token);
      toast.success('Account created!');
      navigate('/');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh', background: '#f1f5f9',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <div style={{
        background: '#fff', borderRadius: '16px', padding: '40px',
        width: '100%', maxWidth: '420px', boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
      }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <Shirt size={40} color="#3b82f6" />
          <h2 style={{ margin: '12px 0 4px', fontSize: '24px', fontWeight: 700 }}>Create Account</h2>
          <p style={{ color: '#64748b', margin: 0 }}>Join LaundryPro today</p>
        </div>

        <form onSubmit={handleSubmit}>
          {[
            { label: 'Full Name',  key: 'name',     type: 'text',     ph: 'Danish Meraj' },
            { label: 'Email',      key: 'email',    type: 'email',    ph: 'you@example.com' },
            { label: 'Password',   key: 'password', type: 'password', ph: '••••••••' },
          ].map(({ label, key, type, ph }) => (
            <div key={key} style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', marginBottom: '6px', fontWeight: 600, fontSize: '14px' }}>{label}</label>
              <input
                type={type} required value={form[key]} placeholder={ph}
                onChange={e => setForm({ ...form, [key]: e.target.value })}
                style={inputStyle}
              />
            </div>
          ))}

          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', marginBottom: '6px', fontWeight: 600, fontSize: '14px' }}>Role</label>
            <select value={form.role} onChange={e => setForm({ ...form, role: e.target.value })} style={inputStyle}>
              <option value="staff">Staff</option>
              <option value="admin">Admin</option>
              <option value="customer">Customer</option>
            </select>
          </div>

          <button type="submit" disabled={loading} style={btnStyle}>
            {loading ? 'Creating…' : 'Create Account'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '14px', color: '#64748b' }}>
          Already have an account? <Link to="/login" style={{ color: '#3b82f6', fontWeight: 600 }}>Sign in</Link>
        </p>
      </div>
    </div>
  );
};

const inputStyle = {
  width: '100%', padding: '10px 14px', borderRadius: '8px',
  border: '1px solid #e2e8f0', fontSize: '14px', outline: 'none',
  boxSizing: 'border-box',
};

const btnStyle = {
  width: '100%', padding: '12px', borderRadius: '8px',
  background: '#3b82f6', color: '#fff', border: 'none',
  fontSize: '15px', fontWeight: 600, cursor: 'pointer',
};

export default SignupPage;