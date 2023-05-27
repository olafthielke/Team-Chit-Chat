const RegisterUserUseCase = require("./register-user-usecase");
const Errors = require("./errors");

test("Given no user info When call registerUser Then throw MissingUser error", async () => {
    const usecase = new RegisterUserUseCase();
    await expect(usecase.registerUser(undefined))
        .rejects
        .toBeInstanceOf(Errors.MissingUser);
});


// I don't know how to write this test because I don't know how to fake the 
// express-validator validation errors collection. Ideally don't want to run 
// the data input validation in the routes but make it part of the business
// logic. TODO: Do more research.
//
// test("Given have user details errors When call registerUser Then throw ValidationError", () => {
//     const usecase = new RegisterUserUseCase();
//     const registerUser = () => {
//         usecase.registerUser({ }, { });
//     };
// });


// // Assert helper
// function verifyError(fn, error, msg) {
//     expect(fn).toThrow(error);
//     expect(fn).toThrow(msg);
// }