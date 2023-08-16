const logger = require("../utils/logger");
const User = require("../models/user");

class UserRepository {
  constructor(logger) {
    this.log = logger;
    this.paged = this.paged.bind(this);
    this.create = this.create.bind(this);
    this.getUser = this.getUser.bind(this);
  }

  async paged(filter, sortBy, page = 0, perPage = 50) {
    logger.info(`navigating to paged to get all users`);
    let results = [];
    let count = await User.count(filter).exec();
    if (count > 0) {
      results = await User.find(filter)
        .sort(sortBy)
        .lean()
        .limit(Number(perPage))
        .exec();
    }
    return {
      total: count,
      items: results,
    };
  }

  async create(doc) {
    return await User.create(doc);
  }

  async getUser(email) {
    return await User.findOne({ email });
  }

  async saveUser(user) {
    const { name, email, password, avatar } = user;
    const newUser = new User({ name, email, avatar, password });
    await newUser.save();
    user.id = newUser.id;
  }
}

module.exports = UserRepository;
