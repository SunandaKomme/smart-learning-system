import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { FiHome, FiBookOpen, FiClipboard, FiBriefcase, FiPlusCircle, FiUser, FiLogOut, FiLayers } from "react-icons/fi";

const navLinks = [
  { label: 'Dashboard', to: '/dashboard', icon: FiHome },
  { label: 'Courses', to: '/courses', icon: FiBookOpen },
  { label: 'Assignments', to: '/assignments', icon: FiClipboard },
  { label: 'Jobs', to: '/jobs', icon: FiBriefcase },
];

export default function Sidebar({ open, onClose }) {
  const { user, logout } = useAuth();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <div className={`sidebar-backdrop ${open ? 'visible' : ''}`} onClick={onClose} />
      <aside className={`sidebar ${open ? 'open' : ''}`}>
        <h2>Smart LMS</h2>
        <div className="nav-group">
          {navLinks.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`nav-item ${isActive(item.to) ? 'active' : ''}`}
                onClick={onClose}
              >
                <Icon className="nav-icon" />
                {item.label}
              </Link>
            );
          })}

          {user && (user.role === 'admin' || user.role === 'trainer') && (
            <>
              <Link to="/create-course" className={`nav-item ${isActive('/create-course') ? 'active' : ''}`} onClick={onClose}>
                <FiPlusCircle className="nav-icon" />
                Create course
              </Link>
              <Link to="/create-assignment" className={`nav-item ${isActive('/create-assignment') ? 'active' : ''}`} onClick={onClose}>
                <FiPlusCircle className="nav-icon" />
                Create assignment
              </Link>
            </>
          )}

          {user && user.role === 'admin' && (
            <Link to="/jobs/create" className={`nav-item ${isActive('/jobs/create') ? 'active' : ''}`} onClick={onClose}>
              <FiLayers className="nav-icon" />
              Create job
            </Link>
          )}

          {user && user.role === 'admin' && (
            <Link to="/applications" className={`nav-item ${isActive('/applications') ? 'active' : ''}`} onClick={onClose}>
              <FiLayers className="nav-icon" />
              Applications
            </Link>
          )}
        </div>

        <div className="nav-group" style={{ marginTop: '34px' }}>
          <Link to="/profile" className={`nav-item ${isActive('/profile') ? 'active' : ''}`} onClick={onClose}>
            <FiUser className="nav-icon" />
            Profile
          </Link>
          {user && (
            <button
              type="button"
              className="nav-item"
              style={{ border: 'none', background: 'transparent', padding: 0, textAlign: 'left' }}
              onClick={() => {
                logout();
                onClose?.();
              }}
            >
              <FiLogOut className="nav-icon" />
              Logout
            </button>
          )}
        </div>
      </aside>
    </>
  );
}
