import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';
import AppShell from '../components/AppShell';
import { useToast } from '../contexts/ToastContext';

export default function AssignmentCreate() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [courseId, setCourseId] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { show } = useToast();

  const handleSubmit = async () => {
    if (!title.trim() || !description.trim()) {
      return show('Please enter a title and description.', 'error');
    }

    setLoading(true);
    try {
      await API.post('/assignments', {
        title: title.trim(),
        description: description.trim(),
        courseId: courseId.trim() || undefined,
      });
      show('Assignment created successfully.', 'success');
      navigate('/assignments');
    } catch (error) {
      show(error.response?.data?.message || 'Could not create assignment.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppShell title="Create assignment" subtitle="Set a new assignment for your learners.">
      <div className="form-card form-centered">
        <div className="form-field">
          <label>Title</label>
          <input className="input" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Assignment title" />
        </div>
        <div className="form-field">
          <label>Description</label>
          <textarea className="textarea" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Assignment details and instructions." />
        </div>
        <div className="form-field">
          <label>Course ID (optional)</label>
          <input className="input" value={courseId} onChange={(e) => setCourseId(e.target.value)} placeholder="Course ID" />
        </div>
        <div className="form-actions">
          <button className="btn primary" onClick={handleSubmit} disabled={loading}>{loading ? 'Creating...' : 'Create assignment'}</button>
          <button className="btn ghost" type="button" onClick={() => navigate('/assignments')}>Cancel</button>
        </div>
      </div>
    </AppShell>
  );
}
