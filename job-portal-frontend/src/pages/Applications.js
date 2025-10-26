import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Applications = () => {
  const [applications, setApplications] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
      fetchApplications();
    }
  }, []);

  const fetchApplications = async () => {
    const token = localStorage.getItem('token');
    try {
      const res = await axios.get('http://localhost:5000/api/applications', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setApplications(res.data);
    } catch (err) {
      console.error('Error fetching applications:', err);
    }
  };

  if (!user) return <div className="container">Please login to view applications</div>;

  return (
    <div className="container">
      <h2>{user.role === 'employer' ? 'Job Applications' : 'My Applications'}</h2>
      {applications.map(app => (
        <div key={app._id} className="card">
          <h3>{app.job.title}</h3>
          <p><strong>Company:</strong> {app.job.company}</p>
          <p><strong>Applicant:</strong> {app.applicant.name}</p>
          <p><strong>Status:</strong> {app.status}</p>
          {app.resumeUrl && <p><strong>Resume:</strong> <a href={app.resumeUrl} target="_blank" rel="noopener noreferrer">View Resume</a></p>}
        </div>
      ))}
    </div>
  );
};

export default Applications;
