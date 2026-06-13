import React from 'react';

export default function CourseCard({ course, onDetails, onAction, actionLabel, badgeLabel }) {
  const initials = course?.title?.split(' ').slice(0, 2).map((w) => w[0]).join('').toUpperCase();

  return (
    <div className="course-card transition">
      <div className="course-thumb">{initials || 'CL'}</div>
      <div className="course-body">
        <h4>{course.title}</h4>
        <p>{course.description?.slice(0, 140) || 'No course description available.'}</p>
        <div className="card-actions">
          <button className="btn secondary" onClick={() => onDetails && onDetails(course)}>
            View details
          </button>
          {onAction && (
            <button className="btn primary" onClick={() => onAction(course)}>
              {actionLabel || 'Action'}
            </button>
          )}
          <div className="badge">{badgeLabel || 'Open'}</div>
        </div>
      </div>
    </div>
  );
}
