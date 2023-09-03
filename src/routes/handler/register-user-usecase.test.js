const RegisterUserUseCase = require("./register-user-usecase");
const Errors = require("./errors");
const Hasher = require("./not-hasher");
jest.mock("./not-hasher");
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

const fred = { name: "Fred Flintstone", email: "fred@flintstones.net", password: "password1" };

test("Given duplicate user When call registerUser Then throw UserAlreadyExists error", async () => {
    const useCase = setupUseCaseForExistingCustomer(fred);
    const errors = { isEmpty: jest.fn(() => { return true; })};
    await expect(useCase.registerUser(fred, errors))
        .rejects
        .toBeInstanceOf(Errors.UserAlreadyExists);
});

test("Given new user When call registerUser Then hash password", async () => {
    const useCase = setupUseCaseForHashingPassword("hashed password1");
    const errors = { isEmpty: jest.fn(() => { return true; })};
    const user = await useCase.registerUser(fred, errors);
    verifyPasswordHashing(useCase, user, "password1", "hashed password1");
});

test("Given new user When call registerUser Then save user", async () => {
    const useCase = setupUseCaseForHashingPassword();
    const errors = { isEmpty: jest.fn(() => { return true; })};
    const user = await useCase.registerUser(fred, errors);
    expect(useCase.userRepo.saveUser).toHaveBeenCalledWith(user);
});


// Arrange helpers
function setupUseCaseForExistingCustomer(existCust)
{
    const mockUserRepo = setupUserRepoForExistingCustomer(existCust);
    return new RegisterUserUseCase(mockUserRepo, null);
}

function setupUseCaseForHashingPassword(pwdHash = "pwdHash")
{
    const mockUserRepo = setupUserRepoForNewCustomer();
    const mockHasher = setupHasher(pwdHash);
    return new RegisterUserUseCase(mockUserRepo, mockHasher);
}

function setupUserRepoForExistingCustomer(existCust)
{ 
    return setupUserRepoForCustomer(existCust); // set up getUser() to return existing customer
}

function setupUserRepoForNewCustomer()
{ 
    return setupUserRepoForCustomer(null);      // set up getUser() to return null (i.e. not found)
}

function setupUserRepoForCustomer(customer)
{
    const mockUserRepo = new UserRepository();
    mockUserRepo.getUser.mockResolvedValue(customer);   // set up getUser() to return customer
    return mockUserRepo;
}

function setupHasher(pwdHash)
{
    const mockHasher = new Hasher();
    mockHasher.hash.mockResolvedValue(pwdHash);   // set up hash() to return mock hashed password
    return mockHasher;
}

// Assert helpers
function verifyPasswordHashing(useCase, user, pwd, pwdHash) {
    expect(useCase.hasher.hash).toHaveBeenCalledWith(pwd);
    expect(user.password).toBe(pwdHash);
}