const API_ROOT = '/users';
const UserHandlers = require('../routes/handler/user-handler');
const logger = require('../utils/logger');
const { check } = require('express-validator');
const RegisterUserUseCase = require("../routes/handler/register-user-usecase");
const UserRepository = require("../repositories/user-repository");

module.exports = (app, log) => {
    const userRepository = new UserRepository();
    const registerUseCase = new RegisterUserUseCase(userRepository);
    const handlers = new UserHandlers(registerUseCase, log);
    logger.info(`navigating to user routes`);
    //integrate and add swagger docs
    app.get(`${API_ROOT}`, handlers.getUsers);
    app.post(`${API_ROOT}`, [
    //validation
      check('name', 'Name is required').not().isEmpty(),
      check('email', 'Please include a valid email').isEmail(),
      check('password', 'Please enter a password with 6 or more characters').isLength({ min : 6 })
    ], handlers.registerUser);
}