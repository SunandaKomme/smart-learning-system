import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import AppShell from "../components/AppShell";
import { useAuth } from "../contexts/AuthContext";
import { useToast } from "../contexts/ToastContext";
import CourseCard from "../components/CourseCard";

export default function Courses() {
  const { user } = useAuth();
  const [courses, setCourses] = useState([]);
  const [query, setQuery] = useState('');
  const { show } = useToast();
  const navigate = useNavigate();

  const load = useCallback(async () => {
    try {
      const res = await API.get('/courses');
      setCourses(res.data || []);
    } catch (error) {
      show('Failed to load courses.', 'error');
    }
  }, [show]);

  useEffect(() => {
    load();
  }, [load]);

  const filtered = courses.filter((course) => {
    const value = `${course.title} ${course.description}`.toLowerCase();
    return value.includes(query.trim().toLowerCase());
  });

  const removeCourse = async (id) => {
    try {
      await API.delete(`/courses/${id}`);
      show('Course deleted successfully.', 'success');
      load();
    } catch (error) {
      show(error.response?.data?.message || 'Failed to delete course.', 'error');
    }
  };

  return (
    <AppShell
      title="Courses"
      subtitle="Browse all available training programs."
      actions={
        <>
          <input className="input" placeholder="Search courses" value={query} onChange={(e) => setQuery(e.target.value)} style={{ maxWidth: 320 }} />
          {(user?.role === 'admin' || user?.role === 'trainer') && (
            <button className="btn primary" onClick={() => navigate('/create-course')}>Create course</button>
          )}
        </>
      }
    >
      {filtered.length ? (
        <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))' }}>
          {filtered.map((course) => (
            <CourseCard
              key={course._id}
              course={course}
              onDetails={() => navigate(`/courses/${course._id}`)}
              onAction={user?.role === 'admin' ? () => removeCourse(course._id) : null}
              actionLabel={user?.role === 'admin' ? 'Delete' : undefined}
              badgeLabel={course.createdBy ? 'Created' : 'Open'}
            />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <h2>No courses found</h2>
          <p className="muted">Try adjusting your search or create a new course if you have access.</p>
        </div>
      )}
    </AppShell>
  );
}
