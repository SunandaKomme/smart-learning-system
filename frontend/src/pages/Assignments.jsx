import { useCallback, useEffect, useState } from "react";
import API from "../services/api";
import AppShell from "../components/AppShell";
import { useAuth } from "../contexts/AuthContext";
import { useToast } from "../contexts/ToastContext";

export default function Assignments() {
  const { user } = useAuth();
  const [assignments, setAssignments] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [query, setQuery] = useState('');
  const [activeAssignment, setActiveAssignment] = useState(null);
  const [answer, setAnswer] = useState('');
  const { show } = useToast();

  const loadAssignments = useCallback(async () => {
    try {
      const res = await API.get('/assignments');
      setAssignments(res.data || []);
    } catch (error) {
      show('Failed to load assignments.', 'error');
    }
  }, [show]);

  const loadSubmissions = useCallback(async () => {
    if (!user || (user.role !== 'admin' && user.role !== 'trainer')) return;
    try {
      const res = await API.get('/assignments/submissions');
      setSubmissions(res.data || []);
    } catch (error) {
      show('Unable to load submissions.', 'error');
    }
  }, [show, user]);

  useEffect(() => {
    loadAssignments();
    loadSubmissions();
  }, [loadAssignments, loadSubmissions]);

  const filtered = assignments.filter((assignment) => {
    const value = `${assignment.title} ${assignment.description}`.toLowerCase();
    return value.includes(query.trim().toLowerCase());
  });

  const submitAssignment = async () => {
    if (!activeAssignment || !answer.trim()) {
      return show('Please enter your answer or submission reference.', 'error');
    }

    try {
      await API.post('/assignments/submit', { assignmentId: activeAssignment._id, answer: answer.trim() });
      show('Assignment submitted.', 'success');
      setAnswer('');
      setActiveAssignment(null);
      loadAssignments();
    } catch (error) {
      show(error.response?.data?.message || 'Submission failed.', 'error');
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await API.put(`/assignments/submission/${id}`, { status });
      show('Submission status updated.', 'success');
      loadSubmissions();
    } catch (error) {
      show('Could not update status.', 'error');
    }
  };

  return (
    <AppShell
      title="Assignments"
      subtitle="Review your current assignments and keep submission progress in view."
      actions={
        <input className="input" placeholder="Search assignments" value={query} onChange={(e) => setQuery(e.target.value)} style={{ maxWidth: 320 }} />
      }
    >
      <div className="card course-detail-card">
        {filtered.length ? (
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((assignment) => (
                  <tr key={assignment._id}>
                    <td>{assignment.title}</td>
                    <td>{assignment.description?.slice(0, 120) || 'No description'}</td>
                    <td>
                      {user?.role === 'student' ? (
                        <button className="btn primary" onClick={() => setActiveAssignment(assignment)}>
                          Submit
                        </button>
                      ) : (
                        <span className="badge">{assignment.courseId ? 'Course linked' : 'Standalone'}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="empty-state">
            <h2>No assignments found</h2>
            <p className="muted">Create a new assignment or update your search query.</p>
          </div>
        )}
      </div>

      {activeAssignment && (
        <div className="card course-detail-card" style={{ marginTop: 20 }}>
          <h3>Submit: {activeAssignment.title}</h3>
          <div className="form-field">
            <label>Submission note or link</label>
            <textarea className="textarea" value={answer} onChange={(e) => setAnswer(e.target.value)} placeholder="Paste your assignment link or answer here" />
          </div>
          <div className="form-actions">
            <button className="btn primary" onClick={submitAssignment}>Send submission</button>
            <button className="btn ghost" onClick={() => setActiveAssignment(null)}>Cancel</button>
          </div>
        </div>
      )}

      {(user?.role === 'admin' || user?.role === 'trainer') && (
        <div className="card course-detail-card" style={{ marginTop: 20 }}>
          <h3>Submissions</h3>
          {submissions.length ? (
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th>Assignment</th>
                    <th>Student</th>
                    <th>Answer</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {submissions.map((submission) => (
                    <tr key={submission._id}>
                      <td>{submission.assignmentId?.title}</td>
                      <td>{submission.studentId?.name}</td>
                      <td>{submission.answer?.slice(0, 120) || 'No answer'}</td>
                      <td><span className={`status ${submission.status}`}>{submission.status}</span></td>
                      <td style={{ display: 'flex', gap: 8 }}>
                        <button className="btn secondary" onClick={() => updateStatus(submission._id, 'approved')}>Approve</button>
                        <button className="btn ghost" onClick={() => updateStatus(submission._id, 'rejected')}>Reject</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="muted">No submissions available yet.</p>
          )}
        </div>
      )}
    </AppShell>
  );
}
