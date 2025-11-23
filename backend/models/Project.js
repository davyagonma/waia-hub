const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  summary: { type: String, required: true, maxLength: 200 },
  projectUrl: { type: String, required: true },
  githubUrl: { type: String },
  imageUrl: { type: String, required: true },
  status: { type: String, enum: ['concept', 'en développement', 'live', 'archivé'], required: true },
  country: { type: String, required: true },
  submitter: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  tags: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tag' }],
  hearts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  heartCount: { type: Number, default: 0 },
  isApproved: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Project', ProjectSchema);
