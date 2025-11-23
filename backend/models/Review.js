const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
  text: { type: String, required: true, maxLength: 1000 },
  rating: { type: Number, min: 1, max: 5, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Review', ReviewSchema);
