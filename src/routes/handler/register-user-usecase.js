const MissingUser = require("./errors");

class RegisterUserUseCase {
    registerUser(user) {
        if (!user)
            throw new MissingUser();
    }
}
  
module.exports = RegisterUserUseCase;
  