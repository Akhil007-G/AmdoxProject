import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="container">
      <div className="hero-section">
        <h1>Welcome to Job Portal</h1>
        <p>Find your dream job or post opportunities for talented individuals.</p>
        <div className="hero-buttons">
          <Link to="/jobs" className="btn btn-primary">Browse Jobs</Link>
          <Link to="/register" className="btn btn-secondary">Get Started</Link>
        </div>
      </div>
      <div className="features-section">
        <h2>Why Choose Our Job Portal?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3>For Job Seekers</h3>
            <ul>
              <li>Search thousands of job listings</li>
              <li>Apply with one click</li>
              <li>Track your applications</li>
              <li>Get personalized recommendations</li>
            </ul>
          </div>
          <div className="feature-card">
            <h3>For Employers</h3>
            <ul>
              <li>Post jobs easily</li>
              <li>Review applications</li>
              <li>Find qualified candidates</li>
              <li>Manage your company profile</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
