class MissingUser extends Error {
    constructor() {
        super("Missing user data.");
        this.name = "MissingUser";
    }
}

module.exports = MissingUser;