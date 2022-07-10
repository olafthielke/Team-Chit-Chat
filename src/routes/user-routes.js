const API_ROOT = '/users';
const UserHandlers = require('../routes/handler/user-handler');
const logger = require('../utils/logger');

module.exports = (app, log) => {
    const handlers = new UserHandlers(log);
    logger.info(`navigating to user routes`);
    //integrate and add swagger docs
    app.get(`${API_ROOT}`, handlers.getUsers);
}