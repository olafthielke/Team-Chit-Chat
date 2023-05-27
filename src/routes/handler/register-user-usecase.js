const Errors = require("./errors");

class RegisterUserUseCase {

    constructor(userRepo, logger) {
        this.userRepository = userRepo;
        this.logger = logger;
    }
    

    async registerUser(user, errors) {
        if (!user)
            throw new Errors.MissingUser();
        if (!errors.isEmpty())
            throw new Errors.ValidationError(errors.array());

        
        // register user
    }
}

module.exports = RegisterUserUseCase;
  