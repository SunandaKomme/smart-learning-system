import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="landing-shell">
      <section className="hero-panel">
        <div className="hero-copy">
          <span className="eyebrow accent">Smart Learning & Placement</span>
          <h1>Modern LMS for students, trainers and career success.</h1>
          <p className="hero-text">
            Experience a polished learning portal with courses, assignments, job placements and role-based dashboards.
          </p>
          <div className="hero-actions">
            <button className="btn primary" onClick={() => navigate('/login')}>
              Start Learning
            </button>
            <button className="btn secondary" onClick={() => navigate('/register')}>
              Create Account
            </button>
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-card glass">
            <div className="hero-pill">Trusted by smart learners</div>
            <h3>1000+ courses â€¢ 90% placement</h3>
            <p>Get career-ready with a modern dashboard, personalized training and job application support.</p>
          </div>
        </div>
      </section>

      <section className="section-features">
        <div className="section-heading">
          <span className="eyebrow">What you can do</span>
          <h2>Designed for every role</h2>
          <p className="muted">Admin, trainer and student workflows with intuitive navigation and modern analytics.</p>
        </div>
        <div className="feature-grid">
          <div className="feature-card">
            <h3>Course Management</h3>
            <p>Publish courses, manage content and track enrollment with clean course cards.</p>
          </div>
          <div className="feature-card">
            <h3>Assignments & Feedback</h3>
            <p>Create assignments, review submissions and monitor progress from one dashboard.</p>
          </div>
          <div className="feature-card">
            <h3>Job Portal</h3>
            <p>Post jobs, review applications and allow students to apply with resume capture.</p>
          </div>
          <div className="feature-card">
            <h3>Analytics</h3>
            <p>Review KPIs, progress charts and role-specific stats for stronger training decisions.</p>
          </div>
        </div>
      </section>

      <section className="section-stats">
        <div className="stats-grid">
          <div className="stat-card">
            <h3>4.9/5</h3>
            <p>Student satisfaction</p>
          </div>
          <div className="stat-card">
            <h3>120+</h3>
            <p>Live courses</p>
          </div>
          <div className="stat-card">
            <h3>850+</h3>
            <p>Successful placements</p>
          </div>
          <div className="stat-card">
            <h3>20+</h3>
            <p>Trainer experts</p>
          </div>
        </div>
      </section>

      <section className="section-testimonials">
        <div className="section-heading">
          <span className="eyebrow">Success stories</span>
          <h2>Trusted by future-ready learners</h2>
        </div>
        <div className="testimonial-grid">
          <div className="testimonial-card glass">
            <p>â€œThe dashboard helped me track assignments and focus on real job opportunities.â€</p>
            <strong>Riya, Student</strong>
          </div>
          <div className="testimonial-card glass">
            <p>â€œCreating courses and reviewing student submissions is smooth and fast.â€</p>
            <strong>Amit, Trainer</strong>
          </div>
          <div className="testimonial-card glass">
            <p>â€œWe can publish jobs easily and track applications without clutter.â€</p>
            <strong>Meera, Admin</strong>
          </div>
        </div>
      </section>

      <footer className="landing-footer">
        <div>
          <h3>Smart Learning Portal</h3>
          <p>Build confidence, skills and placement readiness with a modern LMS experience.</p>
        </div>
        <div className="footer-links">
          <button className="btn ghost" onClick={() => navigate('/register')}>Join now</button>
        </div>
      </footer>
    </div>
  );
}
