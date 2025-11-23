const Project = require('../models/Project');

// @desc    Get all pending projects
// @route   GET /api/admin/projects/pending
// @access  Private (moderator)
exports.getPendingProjects = async (req, res, next) => {
  try {
    const projects = await Project.find({ isApproved: false });
    res.status(200).json({ success: true, count: projects.length, data: projects });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// @desc    Approve a project
// @route   PUT /api/admin/projects/:id/approve
// @access  Private (moderator)
exports.approveProject = async (req, res, next) => {
  try {
    let project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ success: false, error: 'Project not found' });
    }

    project = await Project.findByIdAndUpdate(req.params.id, { isApproved: true }, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({ success: true, data: project });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};
