const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema(
  {
    job: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
    applicant: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    resumeUrl: { type: String },
    status: { type: String, enum: ['applied', 'reviewing', 'shortlisted', 'rejected'], default: 'applied' }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Application', applicationSchema);
