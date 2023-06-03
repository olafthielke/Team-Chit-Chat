class MissingUser extends Error {
    constructor() {
        super("Missing user data.");
        this.name = "MissingUser";
    }
}

class ValidationError extends Error {
    constructor(errors) {
        super();
        this.errors = errors;
        this.name = "ValidationError";
    }
}

class UserAlreadyExists extends Error {
    constructor(email) {
        super("User already exists.");
        this.email = email;
        this.name = "UserAlreadyExists";
    }
}

module.exports = { 
    MissingUser : MissingUser, 
    ValidationError : ValidationError,
    UserAlreadyExists : UserAlreadyExists
};