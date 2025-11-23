const Tag = require('../models/Tag');

// @desc    Get all tags
// @route   GET /api/tags
// @access  Public
exports.getTags = async (req, res, next) => {
  try {
    const tags = await Tag.find();
    res.status(200).json({ success: true, count: tags.length, data: tags });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// @desc    Create new tag
// @route   POST /api/tags
// @access  Private (moderator)
exports.createTag = async (req, res, next) => {
  try {
    const tag = await Tag.create(req.body);
    res.status(201).json({ success: true, data: tag });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};
