const express = require('express');
const router = express.Router();
const Job = require('../models/Job');
const Application = require('../models/Application');
const auth = require('../middleware/auth');
const multer = require('multer');
const path = require('path');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

// GET all jobs
router.get('/', async (req, res) => {
  // For development without DB, return empty array
  res.json([]);
});

// GET single job
router.get('/:id', async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).populate('postedBy', 'name company');
    if (!job) return res.status(404).json({ msg: 'Job not found' });
    res.json(job);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// POST create job (employers only)
router.post('/', auth, async (req, res) => {
  if (req.user.role !== 'employer') return res.status(403).json({ msg: 'Access denied' });

  try {
    const job = new Job({ ...req.body, postedBy: req.user.id });
    await job.save();
    res.json(job);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// POST apply for job (jobseekers only)
router.post('/:id/apply', auth, upload.single('resume'), async (req, res) => {
  if (req.user.role !== 'jobseeker') return res.status(403).json({ msg: 'Access denied' });

  try {
    const resumeUrl = req.file ? `/uploads/${req.file.filename}` : null;
    const application = new Application({
      job: req.params.id,
      applicant: req.user.id,
      resumeUrl
    });
    await application.save();
    res.json({ msg: 'Application submitted' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// GET applications for user's jobs (employers) or user's applications (jobseekers)
router.get('/applications', auth, async (req, res) => {
  try {
    let applications;
    if (req.user.role === 'employer') {
      applications = await Application.find()
        .populate('job', 'title company')
        .populate('applicant', 'name email')
        .where('job.postedBy').equals(req.user.id);
    } else {
      applications = await Application.find({ applicant: req.user.id })
        .populate('job', 'title company');
    }
    res.json(applications);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
