import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';
import AppShell from '../components/AppShell';
import { useToast } from '../contexts/ToastContext';

export default function CourseCreate() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { show } = useToast();

  const handleSubmit = async () => {
    if (!title.trim() || !description.trim()) {
      return show('Please add a title and description.', 'error');
    }
    setLoading(true);
    try {
      await API.post('/courses', { title: title.trim(), description: description.trim() });
      show('Course created successfully.', 'success');
      navigate('/courses');
    } catch (error) {
      show(error.response?.data?.message || 'Could not create course.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppShell title="Create course" subtitle="Design a new training course for learners.">
      <div className="form-card form-centered">
        <div className="form-field">
          <label>Title</label>
          <input className="input" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Course title" />
        </div>
        <div className="form-field">
          <label>Description</label>
          <textarea className="textarea" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Course summary and goals." />
        </div>
        <div className="form-actions">
          <button className="btn primary" onClick={handleSubmit} disabled={loading}>{loading ? 'Creating...' : 'Create course'}</button>
          <button className="btn ghost" type="button" onClick={() => navigate('/courses')}>Cancel</button>
        </div>
      </div>
    </AppShell>
  );
}
