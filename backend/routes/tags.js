const express = require('express');
const router = express.Router();
const { getTags, createTag } = require('../controllers/tags');
const { protect, authorize } = require('../middlewares/auth');

router.route('/')
    .get(getTags)
    .post(protect, authorize('moderator'), createTag);

module.exports = router;
