const mongoose = require('mongoose');

const TagSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true, trim: true },
  description: { type: String }
});

module.exports = mongoose.model('Tag', TagSchema);
