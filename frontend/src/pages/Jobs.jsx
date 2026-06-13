import { useCallback, useEffect, useState } from "react";
import API from "../services/api";
import AppShell from "../components/AppShell";
import { useAuth } from "../contexts/AuthContext";
import { useToast } from "../contexts/ToastContext";
import JobCard from "../components/JobCard";

export default function Jobs() {
  const { user } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [query, setQuery] = useState('');
  const [selectedJob, setSelectedJob] = useState(null);
  const [resumeLink, setResumeLink] = useState('');
  const { show } = useToast();

  const loadJobs = useCallback(async () => {
    try {
      const res = await API.get('/jobs');
      setJobs(res.data || []);
    } catch (error) {
      show('Failed to load jobs.', 'error');
    }
  }, [show]);

  useEffect(() => {
    loadJobs();
  }, [loadJobs]);

  const submitApplication = async () => {
    if (!selectedJob || !resumeLink.trim()) {
      return show('Please add your resume link.', 'error');
    }

    try {
      await API.post('/jobs/apply', { jobId: selectedJob._id, resumeLink: resumeLink.trim() });
      show('Application submitted successfully.', 'success');
      setSelectedJob(null);
      setResumeLink('');
      loadJobs();
    } catch (error) {
      show(error.response?.data?.message || 'Unable to submit application.', 'error');
    }
  };

  const filtered = jobs.filter((job) => {
    const value = `${job.title} ${job.company} ${job.description}`.toLowerCase();
    return value.includes(query.trim().toLowerCase());
  });

  return (
    <AppShell
      title="Job portal"
      subtitle="Find the latest placement opportunities."
      actions={
        <input className="input" placeholder="Search jobs or companies" value={query} onChange={(e) => setQuery(e.target.value)} style={{ maxWidth: 320 }} />
      }
    >
      <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 16 }}>
        {filtered.map((job) => (
          <JobCard
            key={job._id}
            job={job}
            onApply={user?.role === 'student' ? () => setSelectedJob(job) : null}
            applied={false}
          />
        ))}
      </div>

      {selectedJob && (
        <div className="card course-detail-card" style={{ marginTop: 24 }}>
          <h3>Apply to {selectedJob.title}</h3>
          <p className="muted">Share your resume link to complete the application.</p>
          <div className="form-field">
            <label>Resume link</label>
            <input className="input" value={resumeLink} onChange={(e) => setResumeLink(e.target.value)} placeholder="https://" />
          </div>
          <div className="form-actions">
            <button className="btn primary" onClick={submitApplication}>Submit application</button>
            <button className="btn ghost" onClick={() => setSelectedJob(null)}>Cancel</button>
          </div>
        </div>
      )}
    </AppShell>
  );
}
