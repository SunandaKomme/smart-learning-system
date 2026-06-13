import { useEffect, useState } from "react";
import API from "../services/api";
import { useAuth } from "../contexts/AuthContext";
import AppShell from "../components/AppShell";
import { useToast } from "../contexts/ToastContext";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const { user } = useAuth();
  const [courses, setCourses] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const { show } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      try {
        const [coursesRes, assignmentsRes, jobsRes] = await Promise.all([
          API.get('/courses'),
          API.get('/assignments'),
          API.get('/jobs'),
        ]);

        setCourses(coursesRes.data || []);
        setAssignments(assignmentsRes.data || []);
        setJobs(jobsRes.data || []);
      } catch (error) {
        show('Unable to load dashboard data.', 'error');
      }
    };

    load();
  }, [show]);

  useEffect(() => {
    if (user?.role === 'admin') {
      API.get('/jobs/applications')
        .then((res) => setApplications(res.data || []))
        .catch(() => show('Unable to load applications.', 'error'));
    }
  }, [user, show]);

  const totalAssignments = assignments.length;
  const totalCourses = courses.length;
  const totalJobs = jobs.length;
  const totalApplications = applications.length;

  const completedAssignments = assignments.filter((assignment) => assignment.completed).length;
  const pendingAssignments = Math.max(0, totalAssignments - completedAssignments);
  const progress = totalAssignments ? Math.round((completedAssignments / totalAssignments) * 100) : 0;

  return (
    <AppShell title={`Welcome back, ${user?.name || 'Learner'}`} subtitle={`Role: ${user?.role || 'Guest'}`}>
      <div className="grid dashboard-cards">
        <div className="stat-card">
          <span className="muted">Enrolled courses</span>
          <h3>{totalCourses}</h3>
        </div>
        <div className="stat-card">
          <span className="muted">Completed assignments</span>
          <h3>{completedAssignments}</h3>
        </div>
        <div className="stat-card">
          <span className="muted">Pending assignments</span>
          <h3>{pendingAssignments}</h3>
        </div>
        <div className="stat-card">
          <span className="muted">Job applications</span>
          <h3>{user?.role === 'admin' ? totalApplications : totalJobs}</h3>
        </div>
      </div>

      <div className="grid" style={{ marginTop: 24, gridTemplateColumns: '2fr 1fr' }}>
        <div className="card course-detail-card">
          <h3>Progress overview</h3>
          <div style={{ marginTop: 18 }}>
            <div style={{ width: '100%', background: 'rgba(255,255,255,0.06)', borderRadius: 999, height: 14 }}>
              <div style={{ width: `${progress}%`, height: '100%', background: 'linear-gradient(90deg, #7c3aed, #60a5fa)', borderRadius: 999 }} />
            </div>
            <p style={{ marginTop: 12 }}>{progress}% of tracked assignments completed.</p>
          </div>
          <div style={{ display: 'grid', gap: 14, marginTop: 24 }}>
            <ul className="detail-list">
              <li>{totalCourses} active courses</li>
              <li>{totalAssignments} total assignments</li>
              <li>{totalJobs} available job posts</li>
            </ul>
          </div>
        </div>

        <div className="card course-detail-card">
          <h3>Quick actions</h3>
          <div className="form-actions" style={{ marginTop: 18 }}>
            <button className="btn primary" onClick={() => navigate('/courses')}>Browse courses</button>
            <button className="btn secondary" onClick={() => navigate('/assignments')}>View assignments</button>
          </div>
          <div style={{ marginTop: 28 }}>
            <h4>Latest updates</h4>
            <p className="muted" style={{ marginTop: 12 }}>Your dashboard brings course, assignment and job insights together.</p>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
