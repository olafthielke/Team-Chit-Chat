const Errors = require("./errors");

class RegisterUserUseCase {    

    async registerUser(user, errors) {
        if (!user)
            throw new Errors.MissingUser();
        if (!errors.isEmpty())
            throw new Errors.ValidationError(errors.array());

            
        // TODO: Check for duplicate user

        // TODO Save user
    }
}

module.exports = RegisterUserUseCase;
  