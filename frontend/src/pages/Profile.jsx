import { useEffect, useState } from 'react';
import API from '../services/api';
import AppShell from '../components/AppShell';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';
import { FiEdit2, FiSave, FiX } from 'react-icons/fi';

export default function Profile() {
  const { user, setUser } = useAuth();
  const [profile, setProfile] = useState(user || {});
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [originalProfile, setOriginalProfile] = useState(user || {});
  const { show } = useToast();

  useEffect(() => {
    setProfile(user || {});
    setOriginalProfile(user || {});
  }, [user]);

  const handleEdit = () => {
    setIsEditing(true);
    setOriginalProfile(profile);
  };

  const handleCancel = () => {
    setProfile(originalProfile);
    setIsEditing(false);
  };

  const handleSave = async () => {
    if (!profile.name || profile.name.trim() === '') {
      show('Name cannot be empty.', 'error');
      return;
    }

    if (profile.name === originalProfile.name) {
      show('No changes to save.', 'info');
      setIsEditing(false);
      return;
    }

    setLoading(true);
    try {
      const response = await API.put('/auth/profile', {
        name: profile.name.trim(),
      });
      
      if (response.data.user) {
        setUser(response.data.user);
        setProfile(response.data.user);
        setOriginalProfile(response.data.user);
      }
      
      show(response.data.message || 'Profile updated successfully.', 'success');
      setIsEditing(false);
    } catch (error) {
      const errorMsg = error.response?.data?.message || 'Failed to update profile.';
      show(errorMsg, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppShell title="Profile" subtitle="Review and update your profile information.">
      <div className="grid" style={{ gridTemplateColumns: '1fr 360px', gap: 24 }}>
        <div className="card course-detail-card">
          {/* Profile Header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
              <div 
                className="course-thumb" 
                style={{ 
                  width: 92, 
                  height: 92, 
                  borderRadius: 28, 
                  fontSize: 32,
                  background: 'linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontWeight: 600
                }}
              >
                {profile.name?.slice(0, 1)?.toUpperCase() || 'U'}
              </div>
              <div>
                <h3 style={{ margin: 0 }}>{profile.name || 'Your name'}</h3>
                <p className="muted" style={{ margin: '8px 0 0' }}>{profile.role ? profile.role.toUpperCase() : 'Member'}</p>
              </div>
            </div>
            {!isEditing && (
              <button 
                className="btn secondary" 
                onClick={handleEdit}
                style={{ display: 'flex', alignItems: 'center', gap: 8 }}
              >
                <FiEdit2 size={16} /> Edit
              </button>
            )}
          </div>

          {/* Profile Form */}
          <div style={{ borderTop: '1px solid var(--surface-light)', paddingTop: 24 }}>
            <div className="form-field">
              <label>Name *</label>
              <input 
                className="input" 
                value={profile.name || ''} 
                onChange={(e) => setProfile((prev) => ({ ...prev, name: e.target.value }))}
                disabled={!isEditing}
                placeholder="Enter your full name"
              />
              {isEditing && <p className="muted" style={{ fontSize: 12, marginTop: 4 }}>This will appear on your profile and certificates.</p>}
            </div>

            <div className="form-field">
              <label>Email</label>
              <input 
                className="input" 
                value={profile.email || ''} 
                disabled 
              />
              <p className="muted" style={{ fontSize: 12, marginTop: 4 }}>Email address cannot be changed.</p>
            </div>

            <div className="form-field">
              <label>Role</label>
              <input 
                className="input" 
                value={profile.role || ''} 
                disabled 
              />
              <p className="muted" style={{ fontSize: 12, marginTop: 4 }}>Your account role is assigned by administrators.</p>
            </div>

            {isEditing && (
              <div className="form-actions" style={{ display: 'flex', gap: 12, marginTop: 24 }}>
                <button 
                  className="btn primary" 
                  onClick={handleSave} 
                  disabled={loading}
                  style={{ display: 'flex', alignItems: 'center', gap: 8 }}
                >
                  <FiSave size={16} /> {loading ? 'Saving...' : 'Save Changes'}
                </button>
                <button 
                  className="btn secondary" 
                  onClick={handleCancel}
                  disabled={loading}
                  style={{ display: 'flex', alignItems: 'center', gap: 8 }}
                >
                  <FiX size={16} /> Cancel
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Activity Summary Sidebar */}
        <div className="card course-detail-card">
          <h3>Account Details</h3>
          <div className="detail-list" style={{ marginTop: 16 }}>
            <li>
              <strong>Role:</strong>
              <span style={{ color: 'var(--primary)', fontWeight: 600 }}>
                {profile.role ? profile.role.toUpperCase() : 'N/A'}
              </span>
            </li>
            <li>
              <strong>Member Since:</strong>
              <span>Recently Joined</span>
            </li>
            <li>
              <strong>Account Status:</strong>
              <span style={{ color: 'var(--green, #4ade80)' }}>Active</span>
            </li>
          </div>

          <div style={{ marginTop: 24, paddingTop: 24, borderTop: '1px solid var(--surface-light)' }}>
            <h4 style={{ marginBottom: 12 }}>Quick Stats</h4>
            <div className="detail-list">
              <li>Email: {profile.email || 'N/A'}</li>
              <li>Profile Status: Complete</li>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
