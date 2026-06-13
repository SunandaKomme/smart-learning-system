import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';
import Loader from '../components/Loader';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');
  const [loading, setLoading] = useState(false);
  const { register, user } = useAuth();
  const navigate = useNavigate();
  const { show } = useToast();

  useEffect(() => {
    if (user) {
      navigate('/dashboard', { replace: true });
    }
  }, [user, navigate]);

  const handleRegister = async () => {
    if (!name.trim() || !email.trim() || !password.trim()) {
      return show('Please fill all required fields.', 'error');
    }

    setLoading(true);
    try {
      await register(name.trim(), email.trim(), password, role);
      show('Registration successful. Please log in.', 'success');
      navigate('/login');
    } catch (err) {
      show(err.response?.data?.message || err.message || 'Registration failed.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="hero-panel">
      <div className="hero-copy">
        <span className="eyebrow accent">Build your account</span>
        <h1>Create your account in seconds.</h1>
        <p className="hero-text">Register as a student, trainer or admin to access role-based tools and workflows.</p>
      </div>
      <div className="form-card form-centered">
        <h2>Create account</h2>
        <div className="form-field">
          <label>Name</label>
          <input className="input" value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name" />
        </div>
        <div className="form-field">
          <label>Email</label>
          <input className="input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
        </div>
        <div className="form-field">
          <label>Password</label>
          <input className="input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Choose a secure password" />
        </div>
        <div className="form-field">
          <label>Role</label>
          <select className="select" value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="student">Student</option>
            <option value="trainer">Trainer</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <div className="form-actions">
          <button className="btn primary" onClick={handleRegister} disabled={loading}>
            {loading ? <Loader size={18} /> : 'Register'}
          </button>
          <Link to="/login" className="btn secondary">Already have an account?</Link>
        </div>
      </div>
    </div>
  );
}
