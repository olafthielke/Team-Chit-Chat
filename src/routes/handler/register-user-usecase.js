const Errors = require("./errors");

class RegisterUserUseCase {    

    constructor(userRepository, hasher) {
        this.userRepository = userRepository;
        this.hasher = hasher;
      }
    
    async registerUser(user, errors) {
        await this.validate(user, errors);
        user.password = await this.hash(user.password);
        await this.userRepository.saveUser(user);
        return user;
    }


    async validate(user, errors) {
        if (!user)
            throw new Errors.MissingUser();
        if (!errors.isEmpty())
            throw new Errors.ValidationError(errors.array());

        //validate if user exists
        const existUser = await this.userRepository.getUser(user.email);
        if (existUser)
            throw new Errors.UserAlreadyExists(user.email);
    }
    
    async hash(input) {
        return this.hasher.hash(input);
    }
}

module.exports = RegisterUserUseCase;
  