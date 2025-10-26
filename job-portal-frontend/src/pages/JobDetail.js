import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const JobDetail = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [user, setUser] = useState(null);
  const [applicationStatus, setApplicationStatus] = useState(null);

  useEffect(() => {
    fetchJob();
    const userData = localStorage.getItem('user');
    if (userData) setUser(JSON.parse(userData));
  }, [id]);

  const fetchJob = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/jobs/${id}`);
      setJob(res.data);
    } catch (err) {
      console.error('Error fetching job:', err);
    }
  };

  const applyForJob = async () => {
    const token = localStorage.getItem('token');
    try {
      await axios.post(`http://localhost:5000/api/jobs/${id}/apply`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setApplicationStatus('applied');
      alert('Application submitted successfully!');
    } catch (err) {
      alert('Error applying for job');
    }
  };

  if (!job) return <div className="container">Loading...</div>;

  return (
    <div className="container">
      <div className="job-detail-card">
        <div className="job-header">
          <h1>{job.title}</h1>
          <span className="job-type">{job.type}</span>
        </div>

        <div className="job-meta">
          <div className="meta-item">
            <strong>Company:</strong> {job.company}
          </div>
          <div className="meta-item">
            <strong>Location:</strong> {job.location}
          </div>
          <div className="meta-item">
            <strong>Salary:</strong> ${job.salary} per year
          </div>
          <div className="meta-item">
            <strong>Posted:</strong> {new Date(job.createdAt).toLocaleDateString()}
          </div>
        </div>

        <div className="job-description">
          <h2>Job Description</h2>
          <p>{job.description}</p>
        </div>

        {user && user.role === 'jobseeker' && (
          <div className="application-section">
            {applicationStatus === 'applied' ? (
              <p className="applied-message">You have already applied for this job.</p>
            ) : (
              <button onClick={applyForJob} className="btn btn-primary apply-btn">
                Apply for Job
              </button>
            )}
          </div>
        )}

        {!user && (
          <div className="login-prompt">
            <p>Please <a href="/login">login</a> to apply for this job.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobDetail;
