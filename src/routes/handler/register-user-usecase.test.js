const RegisterUserUseCase = require("./register-user-usecase");
const MissingUser = require("./errors");

test("Given missing customer info When call registerUser Then throw MissingUser error", () => {
    const usecase = new RegisterUserUseCase();
    const registerUser = () => {
        usecase.registerUser(undefined);
    };
    verifyError(registerUser, MissingUser, "Missing user data.");
});


// Assert helper
function verifyError(fn, error, msg) {
    expect(fn).toThrow(error);
    expect(fn).toThrow(msg);
}