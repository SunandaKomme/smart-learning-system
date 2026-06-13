import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";
import AppShell from "../components/AppShell";
import { useToast } from "../contexts/ToastContext";

export default function CourseDetails() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { show } = useToast();

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const res = await API.get('/courses');
        const found = res.data.find((item) => item._id === id);
        setCourse(found || null);
      } catch (error) {
        show('Unable to load course details', 'error');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id, show]);

  if (loading) {
    return <AppShell title="Course details"><div className="empty-state">Loading course detailsâ€¦</div></AppShell>;
  }

  if (!course) {
    return (
      <AppShell title="Course details">
        <div className="empty-state">
          Course not found. <button className="btn ghost" onClick={() => navigate('/courses')}>View all courses</button>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell title={course.title} subtitle="Course details and overview">
      <div className="course-detail-grid">
        <div className="card glass course-detail-card">
          <div className="course-detail-header">
            <span className="badge accent">Course overview</span>
            <p>{course.description || 'No description provided.'}</p>
          </div>

          <div className="course-metadata">
            <div>
              <strong>Created by</strong>
              <p>{course.createdBy ? course.createdBy.name || 'Team' : 'Team'}</p>
            </div>
            <div>
              <strong>Course status</strong>
              <p className="badge">Open</p>
            </div>
          </div>
        </div>

        <div className="card glass course-detail-card">
          <h3>Highlights</h3>
          <ul className="detail-list">
            <li>Stylish course summary for learners</li>
            <li>Role-based course access from dashboard</li>
            <li>Modern enrollment badge display</li>
            <li>Professional course cards with progress visuals</li>
          </ul>
        </div>
      </div>
    </AppShell>
  );
}
