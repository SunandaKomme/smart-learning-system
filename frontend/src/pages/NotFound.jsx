import { useNavigate } from "react-router-dom";
import AppShell from "../components/AppShell";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <AppShell title="Page not found">
      <div className="empty-state">
        <h2>404 â€” Page missing</h2>
        <p className="muted">The page you are looking for does not exist or may have been moved.</p>
        <button className="btn primary" onClick={() => navigate('/dashboard')}>Go to dashboard</button>
      </div>
    </AppShell>
  );
}
