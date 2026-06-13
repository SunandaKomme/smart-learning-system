import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useToast } from "../contexts/ToastContext";
import Loader from "../components/Loader";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate();
  const { login, user } = useAuth();
  const { show } = useToast();

  useEffect(() => {
    if (user) {
      navigate('/dashboard', { replace: true });
    }
  }, [user, navigate]);

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      return show('Please enter your email and password.', 'error');
    }

    setLoading(true);
    try {
      await login(email.trim(), password);
      show('Welcome back!', 'success');
      navigate('/dashboard');
    } catch (err) {
      show(err.response?.data?.message || err.message || 'Unable to log in.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="hero-panel">
      <div className="hero-copy">
        <span className="eyebrow accent">Welcome back</span>
        <h1>Sign in to your learning dashboard.</h1>
        <p className="hero-text">Use your account to manage courses, assignments, and placement opportunities.</p>
      </div>
      <div className="form-card form-centered">
        <h2>Sign in</h2>
        <div className="form-field">
          <label>Email</label>
          <input className="input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
        </div>
        <div className="form-field">
          <label>Password</label>
          <div style={{ display: 'grid', gap: 12 }}>
            <input className="input" type={showPass ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Your secure password" />
            <button type="button" className="btn secondary" onClick={() => setShowPass((value) => !value)}>
              {showPass ? 'Hide password' : 'Show password'}
            </button>
          </div>
        </div>
        <div className="form-actions">
          <button className="btn primary" onClick={handleLogin} disabled={loading}>
            {loading ? <Loader size={18} /> : 'Continue'}
          </button>
          <Link to="/register" className="btn secondary">Create account</Link>
        </div>
      </div>
    </div>
  );
}
