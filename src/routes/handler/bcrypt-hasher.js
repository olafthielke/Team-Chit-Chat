const bcrypt = require("bcryptjs");

class BCryptHasher {
    
    async hash(input) {
        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(input, salt);
    }
}

module.exports = BCryptHasher;
  