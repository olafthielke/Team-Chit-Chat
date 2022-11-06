const logger = require("../utils/logger");
const Profile = require("../models/profile");

class ProfileRepository {
  constructor(logger) {
    this.log = logger;
    this.paged = this.paged.bind(this);
    this.create = this.create.bind(this);
    this.getProfile = this.getProfile.bind(this);
  }

  async paged(filter, sortBy, page = 0, perPage = 50) {
    logger.info(`navigating to paged to get all users`);
    let results = [];
    let count = await Profile.count(filter).exec();
    if (count > 0) {
      results = await Profile.find(filter)
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
    return await Profile.create(doc);
  }

  async getProfile(user) {
    return await Profile.findOne({ user: user.id }).populate('user', ['name', 'avatar']);
  }
}
module.exports = ProfileRepository;
