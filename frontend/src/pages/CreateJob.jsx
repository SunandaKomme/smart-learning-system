import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import AppShell from "../components/AppShell";
import { useToast } from "../contexts/ToastContext";

export default function CreateJob() {
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { show } = useToast();

  const handleSubmit = async () => {
    if (!title.trim() || !company.trim() || !description.trim()) {
      return show('Please complete all fields.', 'error');
    }

    setLoading(true);
    try {
      await API.post('/jobs', { title, company, description });
      show('Job posted successfully.', 'success');
      navigate('/jobs');
    } catch (error) {
      show(error.response?.data?.message || 'Failed to create job.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppShell title="Create job post" subtitle="Publish a new placement opportunity.">
      <div className="form-card form-centered">
        <div className="form-field">
          <label>Role title</label>
          <input className="input" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Senior UI/UX Designer" />
        </div>
        <div className="form-field">
          <label>Company name</label>
          <input className="input" value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Company name" />
        </div>
        <div className="form-field">
          <label>Job description</label>
          <textarea className="textarea" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Write a short job description..." />
        </div>
        <div className="form-actions">
          <button className="btn primary" onClick={handleSubmit} disabled={loading}>
            {loading ? 'Posting...' : 'Publish job'}
          </button>
          <button className="btn ghost" type="button" onClick={() => navigate('/jobs')}>Cancel</button>
        </div>
      </div>
    </AppShell>
  );
}
