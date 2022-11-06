const API_ROOT = '/auth';
const logger = require('../utils/logger');
const express = require('express');
const router = express.Router();
const auth = require('../../src/middleware/auth');
const User = require('../../src/models/user');

// @route    GET api/auth
// @desc     Get user by token
// @access   Private
router.get(API_ROOT, auth, async(req, res) => {
    try {
        const user = await User.findById(req.user.id);
        res.json(user);
    } catch (error) {
        logger.error("Error while accessing route", error.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;