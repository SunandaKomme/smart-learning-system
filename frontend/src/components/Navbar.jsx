import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useToast } from "../contexts/ToastContext";
import { FiBell, FiMenu, FiChevronDown, FiLogOut, FiUser } from "react-icons/fi";

export default function Navbar({ onToggleSidebar }) {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();
  const { show } = useToast();
  const navigate = useNavigate();
  const menuRef = useRef(null);

  useEffect(() => {
    const listener = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', listener);
    return () => document.removeEventListener('mousedown', listener);
  }, []);

  return (
    <header className="topbar">
      <button className="menu-button" onClick={onToggleSidebar}>
        <FiMenu />
      </button>
      <div className="topbar-left">
        <span className="eyebrow">LMS Portal</span>
      </div>
      <div className="topbar-right">
        <button className="icon-button" onClick={() => show('Notifications are coming soon.', 'info')}>
          <FiBell />
        </button>
        {user ? (
          <div className="profile-menu" ref={menuRef}>
            <button className="profile-btn" onClick={() => setOpen((value) => !value)}>
              <span>{user.name?.split(' ')[0] || 'User'}</span>
              <FiChevronDown />
            </button>
            {open && (
              <div className="dropdown">
                <button onClick={() => { setOpen(false); navigate('/profile'); }}>
                  <FiUser className="nav-icon" /> Profile
                </button>
                <button onClick={() => { setOpen(false); logout(); }}>
                  <FiLogOut className="nav-icon" /> Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <button className="btn primary" onClick={() => navigate('/login')}>Sign in</button>
        )}
      </div>
    </header>
  );
}
