const logger = require("../../utils/logger");
const ApiHandler = require("../../common/api-handler");
const ProfileRepository = require("../../repositories/profile-repository");
const Profile = require("../../models/profile");
const { validationResult } = require("express-validator");

class ProfileHandlers extends ApiHandler {
  constructor(logger) {
    super(logger);
    this.profileRepository = new ProfileRepository(logger);
    this.getProfiles = this.getProfiles.bind(this);
    this.createProfile = this.createProfile.bind(this);
  }

  async getProfiles(req, res) {
    try {
      const {
        direction = "asc",
        sort = "name",
        page = 0,
        perPage = 50,
      } = req.query;
      let filter = {};
      logger.info(`accessing to profile data source repository`);
      let result = await this.profileRepository.paged(filter, page, perPage);
      res.status(200);
      res.json({
        data: result,
        metadata: {
          page: Number(page),
          perPage: Number(perPage),
          total: result.total,
        },
      });
    } catch (error) {
      logger.info("error", error);
    }
  }

  async getProfile(req, res) {
    try {
      const { user } = req.query;
      logger.info(`accessing to profile data source repository`);
      let result = await this.profileRepository.getProfile(user);
      res.status(200);
      res.json(result);
    } catch (error) {
      logger.info("error", error);
    }
  }

  async createProfile(req, res) {
    try {
      const input = req.body;
      if (input) {
        //payload validation
        const errors = validationResult(req);
        if (!errors.isEmpty) {
          return res.status(400).json({ errors: errors.array() });
        }
        //validate if profile exists
        const { name, email } = req.body;
      }
    } catch (err) {
      this.handleError(err, res);
    }
  }
}

module.exports = ProfileHandlers;
