const getUsersJSON = require('../../users.json');
const logger = require('../utils/logger');

class UserRepository {
  constructor(logger) {
    this.log = logger;
    this.paged = this.paged.bind(this);
  }

  async paged(filter, sortBy, page = 0, perPage = 50) {
    logger.info(`navigating to paged to get all users`);
    let results = getUsersJSON;
    console.log("results", results);
    return {
      total: results.length,
      items: results
    };
  }
}
module.exports = UserRepository;
