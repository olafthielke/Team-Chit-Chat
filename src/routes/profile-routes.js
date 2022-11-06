const API_ROOT = '/profiles';
const ProfileHandler = require('../routes/handler/profile-handler');
const logger = require('../utils/logger');
const { check } = require('express-validator');


module.exports = (app, log) => {
    const handlers = new ProfileHandler(log);
    logger.info(`navigating to profile routes`);
    //integrate and add swagger docs
    app.get(`${API_ROOT}`, handlers.getProfiles);
    //logged in user profile
    app.get(`${API_ROOT}/me`, handlers.getProfile);
    app.post(`${API_ROOT}`, [
    //validation
      check('name', 'Name is required').not().isEmpty(),
      check('email', 'Please include a valid email').isEmail(),
      check('password', 'Please enter a password with 6 or more characters').isLength({ min : 6 })
    ], handlers.createProfile);
}