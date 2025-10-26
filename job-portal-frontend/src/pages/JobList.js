import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({
    location: '',
    type: '',
    salary: ''
  });

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/jobs');
      setJobs(res.data);
    } catch (err) {
      console.error('Error fetching jobs:', err);
    }
  };

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(search.toLowerCase()) ||
                          job.company.toLowerCase().includes(search.toLowerCase()) ||
                          job.description.toLowerCase().includes(search.toLowerCase());
    const matchesLocation = !filters.location || job.location.toLowerCase().includes(filters.location.toLowerCase());
    const matchesType = !filters.type || job.type === filters.type;
    const matchesSalary = !filters.salary || parseInt(job.salary) >= parseInt(filters.salary);

    return matchesSearch && matchesLocation && matchesType && matchesSalary;
  });

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <div className="container">
      <h2>Job Listings</h2>

      {/* Search Bar */}
      <div className="search-section">
        <input
          type="text"
          placeholder="Search jobs, companies, or keywords..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />
      </div>

      {/* Filters */}
      <div className="filters-section">
        <div className="filter-group">
          <label>Location:</label>
          <input
            type="text"
            name="location"
            placeholder="e.g., New York"
            value={filters.location}
            onChange={handleFilterChange}
          />
        </div>
        <div className="filter-group">
          <label>Job Type:</label>
          <select name="type" value={filters.type} onChange={handleFilterChange}>
            <option value="">All Types</option>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Internship">Internship</option>
          </select>
        </div>
        <div className="filter-group">
          <label>Min Salary:</label>
          <input
            type="number"
            name="salary"
            placeholder="e.g., 50000"
            value={filters.salary}
            onChange={handleFilterChange}
          />
        </div>
      </div>

      {/* Job Cards */}
      <div className="jobs-container">
        {filteredJobs.length === 0 ? (
          <p>No jobs found matching your criteria.</p>
        ) : (
          filteredJobs.map(job => (
            <div key={job._id} className="job-card">
              <div className="job-header">
                <h3>{job.title}</h3>
                <span className="job-type">{job.type}</span>
              </div>
              <p className="company"><strong>{job.company}</strong></p>
              <p className="location">{job.location}</p>
              <p className="salary"><strong>${job.salary}</strong> per year</p>
              <p className="description">{job.description.substring(0, 200)}...</p>
              <Link to={`/jobs/${job._id}`} className="btn btn-primary">View Details</Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default JobList;
