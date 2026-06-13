import React from 'react';

export default function JobCard({ job, onApply, applied }) {
  return (
    <div className="job-card transition">
      <div className="logo">{job.company?.slice(0, 2).toUpperCase() || 'JN'}</div>
      <div className="job-body">
        <h4>{job.title}</h4>
        <p>{job.company} â€” {job.description?.slice(0, 120) || 'No description available.'}</p>
        <div className="card-actions">
          <button className="btn secondary" onClick={() => onApply && onApply(job)} disabled={applied}>
            {applied ? 'Applied' : 'Apply'}
          </button>
          <div className="badge">{applied ? 'Applied' : 'Open'}</div>
        </div>
      </div>
    </div>
  );
}
