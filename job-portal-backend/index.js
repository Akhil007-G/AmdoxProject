// index.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// routes
const authRoutes = require('./routes/auth');
const jobRoutes = require('./routes/jobs');
app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes);

// connect database
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/jobportal');
    console.log('✅ MongoDB Connected');
  } catch (err) {
    console.error('❌ Mongo Error:', err);
    // For development, continue without DB connection
    console.log('⚠️ Continuing without database connection for development');
  }
};

connectDB();

// start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server started on port ${PORT}`));
