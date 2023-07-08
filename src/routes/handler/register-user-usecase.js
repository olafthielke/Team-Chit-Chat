const Errors = require("./errors");
const bcrypt = require("bcryptjs");
const User = require("../../models/user");

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

        //const avatar = gravator.url(email, { s: "200", r: "pg", d: "mm" });

        //encrypt password
        const salt = await bcrypt.genSalt(10);
        const pwdHash = await bcrypt.hash(password, salt);

        const newUser = new User({ name, email, avatar, pwdHash });
  
        await this.userRepository.saveUser(newUser);
  
        return newUser;
    }
}

module.exports = RegisterUserUseCase;
  