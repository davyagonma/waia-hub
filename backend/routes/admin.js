const express = require('express');
const router = express.Router();
const { getPendingProjects, approveProject } = require('../controllers/admin');
const { protect, authorize } = require('../middlewares/auth');

router.get('/projects/pending', protect, authorize('moderator'), getPendingProjects);
router.put('/projects/:id/approve', protect, authorize('moderator'), approveProject);

module.exports = router;
