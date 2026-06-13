import { useEffect, useState } from 'react';
import API from '../services/api';
import AppShell from '../components/AppShell';
import { useToast } from '../contexts/ToastContext';

export default function Applications() {
  const [apps, setApps] = useState([]);
  const { show } = useToast();

  useEffect(() => {
    const load = async () => {
      try {
        const res = await API.get('/jobs/applications');
        setApps(res.data || []);
      } catch (error) {
        show('Failed to load applications.', 'error');
      }
    };

    load();
  }, [show]);

  return (
    <AppShell title="Applications" subtitle="Review job applications from students.">
      {apps.length ? (
        <div className="card course-detail-card">
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Job</th>
                  <th>Email</th>
                  <th>Resume</th>
                </tr>
              </thead>
              <tbody>
                {apps.map((app) => (
                  <tr key={app._id}>
                    <td>{app.studentId?.name}</td>
                    <td>{app.jobId?.title}</td>
                    <td>{app.studentId?.email}</td>
                    <td><a href={app.resumeLink} target="_blank" rel="noreferrer">View resume</a></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="empty-state">
          <h2>No applications yet</h2>
          <p className="muted">Once students apply, their job applications will appear here.</p>
        </div>
      )}
    </AppShell>
  );
}
