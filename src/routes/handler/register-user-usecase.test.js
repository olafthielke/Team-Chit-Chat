const RegisterUserUseCase = require("./register-user-usecase");
const Errors = require("./errors");
const UserRepository = require("../../repositories/user-repository");
jest.mock("../../repositories/user-repository");


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

test("Given duplicate user When call registerUser Then throw UserAlreadyExists error", async () => {
    const mockUserRepo = new UserRepository();
    const fred = { name: "Fred Flintstone", email: "fred@flintstones.net", password: "password1" };
    mockUserRepo.getUser.mockResolvedValue(fred);   // set up getUser() to return fred
    const useCase = new RegisterUserUseCase(mockUserRepo);
    const errors = { isEmpty: jest.fn(() => { return true; })};
    await expect(useCase.registerUser(fred, errors))
        .rejects
        .toBeInstanceOf(Errors.UserAlreadyExists);
});

test("Given new user When call registerUser Then save user", async () => {
    const mockUserRepo = new UserRepository();
    const fred = { name: "Fred Flintstone", email: "fred@flintstones.net", password: "password1" };
    mockUserRepo.getUser.mockResolvedValue(null);   // set up getUser() to return null (i.e. not found)
    const useCase = new RegisterUserUseCase(mockUserRepo);
    const errors = { isEmpty: jest.fn(() => { return true; })};
    const user = await useCase.registerUser(fred, errors);
    expect(mockUserRepo.saveUser).toHaveBeenCalled();
});
