const express = require('express');
const router = express.Router();
const {
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
  heartProject,
  getProjectReviews,
  createProjectReview,
} = require('../controllers/projects');

const { protect, authorize } = require('../middlewares/auth');

router.route('/')
  .get(getProjects)
  .post(protect, createProject);

router.route('/:id')
  .get(getProject)
  .put(protect, updateProject)
  .delete(protect, deleteProject);

router.route('/:id/heart').post(protect, heartProject);

router.route('/:id/reviews')
    .get(getProjectReviews)
    .post(protect, createProjectReview);

module.exports = router;
