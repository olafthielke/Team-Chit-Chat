const UserHandler = require("./user-handler");
const RegisterUserUseCase = require("./register-user-usecase");
const BCryptHasher = require("./bcrypt-hasher");
const UserRepository = require("../../repositories/user-repository");
jest.mock("../../repositories/user-repository");


test("Given no user data When call registerUser Then return 400 - Bad Request", async () => {
    const handler = setupHandler();
    const res = setupResponse();
    await handler.registerUser({ }, res);
    verifyErrorHttpStatusCode(res, 400, "Missing user data.");
});

// More research needed into how to do this test.

// test("Given no user name When call registerUser Then return 400 - Bad Request", async () => {
//     const useCase = new RegisterUserUseCase();
//     const handler = new UserHandler(useCase);
//     const res = setupResponse();
//     await handler.registerUser({ body: { email: "fred@flintstones.net", password: "password1" }}, res);
//     verifyErrorHttpStatusCode(res, 400, "Name is required");
// });

const fred = { name: "Fred Flintstone", email: "fred@flintstones.net", password: "password1" };
const req = { body: fred };


test("Given duplicate user When call registerUser Then return 400 - Bad Request (User already exists)", async () => {
    const handler = setupHandlerForExistingCustomer(fred);
    const res = setupResponse();
    await handler.registerUser(req, res);
    verifyErrorHttpStatusCode(res, 400, "User already exists.");
});

test("Given new user When call registerUser Then return 200 - OK", async () => {
    const handler = setupHandlerForNewCustomer();
    const res = setupResponse();
    await handler.registerUser(req, res);
    expect(res.status).toHaveBeenCalledWith(200)
});


// Arrange helpers
function setupHandler() {
    const useCase = new RegisterUserUseCase();
    return new UserHandler(useCase);
}

function setupHandlerForExistingCustomer(existCust) {
    const mockUserRepo = setupUserRepoForExistingCustomer(existCust);
    const useCase = new RegisterUserUseCase(mockUserRepo, new BCryptHasher());
    return new UserHandler(useCase, mockUserRepo, null);
}

function setupHandlerForNewCustomer() {
    const mockUserRepo = setupUserRepoForNewCustomer();
    const useCase = new RegisterUserUseCase(mockUserRepo, new BCryptHasher());
    return new UserHandler(useCase, mockUserRepo, null);
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

function setupResponse()
{
    const res = {
        status: jest.fn(() => { return res; }), // mocked function returns the current object so we can chain calls.
        json: jest.fn(() => {})
    };
    return res;
}


// Assert helpers
function verifyErrorHttpStatusCode(res, httpStatusCode, errorMsg) {
    expect(res.status).toHaveBeenCalledWith(httpStatusCode);
    expect(res.json).toHaveBeenCalledWith({ errors: [{ msg: errorMsg }] });
}
