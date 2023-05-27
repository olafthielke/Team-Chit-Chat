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

module.exports = { 
    MissingUser : MissingUser, 
    ValidationError : ValidationError 
};