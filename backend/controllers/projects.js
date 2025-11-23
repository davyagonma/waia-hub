const Project = require('../models/Project');
const Review = require('../models/Review');
const User = require('../models/User');

// @desc    Get all projects
// @route   GET /api/projects
// @access  Public
exports.getProjects = async (req, res, next) => {
  try {
    let query;

    // Copy req.query
    const reqQuery = { ...req.query };

    // Fields to exclude
    const removeFields = ['select', 'sort', 'page', 'limit'];

    // Loop over removeFields and delete them from reqQuery
    removeFields.forEach(param => delete reqQuery[param]);

    // Create query string
    let queryStr = JSON.stringify(reqQuery);

    // Create operators ($gt, $gte, etc)
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);

    // Finding resource
    const queryObj = { ...JSON.parse(queryStr) };

    // Default isApproved to true if not specified in query
    if (req.query.isApproved === undefined) {
      queryObj.isApproved = true;
    }

    query = Project.find(queryObj);

    // Select Fields
    if (req.query.select) {
      const fields = req.query.select.split(',').join(' ');
      query = query.select(fields);
    }

    // Sort
    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      query = query.sort(sortBy);
    } else {
      query = query.sort('-createdAt');
    }

    // Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 25;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const total = await Project.countDocuments(queryObj);

    query = query.skip(startIndex).limit(limit);

    // Executing query
    const projects = await query.populate('tags').populate('submitter', 'username avatarUrl');

    // Pagination result
    const pagination = {};

    if (endIndex < total) {
      pagination.next = {
        page: page + 1,
        limit,
      };
    }

    if (startIndex > 0) {
      pagination.prev = {
        page: page - 1,
        limit,
      };
    }

    res.status(200).json({
      success: true,
      count: projects.length,
      pagination,
      data: projects,
    });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// @desc    Get single project
// @route   GET /api/projects/:id
// @access  Public
exports.getProject = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id).populate('tags').populate('submitter', 'username avatarUrl');

    if (!project) {
      return res.status(404).json({ success: false, error: 'Project not found' });
    }

    res.status(200).json({ success: true, data: project });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// @desc    Create new project
// @route   POST /api/projects
// @access  Private
exports.createProject = async (req, res, next) => {
  try {
    req.body.submitter = req.user.id;
    const project = await Project.create(req.body);
    res.status(201).json({ success: true, data: project });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// @desc    Update project
// @route   PUT /api/projects/:id
// @access  Private
exports.updateProject = async (req, res, next) => {
  try {
    let project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ success: false, error: 'Project not found' });
    }

    // Make sure user is project owner or moderator
    if (project.submitter.toString() !== req.user.id && req.user.role !== 'moderator') {
      return res.status(401).json({ success: false, error: 'Not authorized to update this project' });
    }

    project = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({ success: true, data: project });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// @desc    Delete project
// @route   DELETE /api/projects/:id
// @access  Private
exports.deleteProject = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ success: false, error: 'Project not found' });
    }

    // Make sure user is project owner or moderator
    if (project.submitter.toString() !== req.user.id && req.user.role !== 'moderator') {
      return res.status(401).json({ success: false, error: 'Not authorized to delete this project' });
    }

    await project.remove();

    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// @desc    Heart/unheart a project
// @route   POST /api/projects/:id/heart
// @access  Private
exports.heartProject = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ success: false, error: 'Project not found' });
    }

    // Check if already hearted
    if (project.hearts.includes(req.user.id)) {
      // Unheart
      const index = project.hearts.indexOf(req.user.id);
      project.hearts.splice(index, 1);
      project.heartCount = project.hearts.length;
      await project.save();
      return res.status(200).json({ success: true, data: project });
    } else {
      // Heart
      project.hearts.push(req.user.id);
      project.heartCount = project.hearts.length;
      await project.save();
      return res.status(200).json({ success: true, data: project });
    }
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// @desc    Get reviews for a project
// @route   GET /api/projects/:id/reviews
// @access  Public
exports.getProjectReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find({ project: req.params.id }).populate('author', 'username avatarUrl');
    res.status(200).json({ success: true, count: reviews.length, data: reviews });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// @desc    Create a review for a project
// @route   POST /api/projects/:id/reviews
// @access  Private
exports.createProjectReview = async (req, res, next) => {
  try {
    req.body.project = req.params.id;
    req.body.author = req.user.id;

    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ success: false, error: 'Project not found' });
    }

    const review = await Review.create(req.body);
    res.status(201).json({ success: true, data: review });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};
