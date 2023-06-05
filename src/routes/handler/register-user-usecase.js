const Errors = require("./errors");

class RegisterUserUseCase {    

    constructor(userRepository) {
        this.userRepository = userRepository;
      }
    
    async registerUser(user, errors) {
        if (!user)
            throw new Errors.MissingUser();
        if (!errors.isEmpty())
            throw new Errors.ValidationError(errors.array());

        //validate if user exists
        const { name, email, password, avatar } = user;
        const existUser = await this.userRepository.getUser(email);
        if (existUser)
            throw new Errors.UserAlreadyExists(email);
            
        // TODO Encrypt password, get avatar
        
        // TODO Save user
    }
}

module.exports = RegisterUserUseCase;
  