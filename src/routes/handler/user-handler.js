const logger = require("../../utils/logger");
const ApiHandler = require("../../common/api-handler");
const User = require("../../models/user");
const { validationResult } = require("express-validator");
const gravator = require("gravator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const Errors = require("./errors");

class UserHandlers extends ApiHandler {
  constructor(registerUseCase, userRepository, logger) {
    super(logger);
    this.registerUseCase = registerUseCase;
    this.userRepository = userRepository;
    this.getUsers = this.getUsers.bind(this);
    this.registerUser = this.registerUser.bind(this);
  }

  async getUsers(req, res) {
    try {
      const {
        direction = "asc",
        sort = "name",
        page = 0,
        perPage = 50,
      } = req.query;
      let filter = {};
      logger.info(`accessing to user data source repository`);
      let result = await this.userRepository.paged(filter, page, perPage);
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

  async registerUser(req, res) {
    try {

      await this.registerUseCase.registerUser(req.body, validationResult(req));

      const { name, email, password, avatar } = req.body;

      //TODO: get gravatar
      //const avatar = gravator.url(email, { s: "200", r: "pg", d: "mm" });
      user = new User({ name, email, avatar, password });

      //encrypt password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      
      await user.save();

      //jwt token
      const payload = {
        user: { id: user.id },
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) {
            logger.info("error", err);
            throw err;
          }
          res.json({ token });
        }
      );
    } catch (err) {
      if (err instanceof Errors.MissingUser) {
        res.status(400).json({ errors: [{ msg: err.message }] });
        return;
      }
      if (err instanceof Errors.ValidationError) {
        res.status(400).json({ errors: err.errors });
        return;
      }
      if (err instanceof Errors.UserAlreadyExists) {
        res.status(400).json({ errors: [{ msg: err.message }] });
        return;
      }
      this.handleError(err, res);
    }
  }
}

module.exports = UserHandlers;
