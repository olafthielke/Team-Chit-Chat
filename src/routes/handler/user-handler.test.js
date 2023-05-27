const RegisterUserUseCase = require("./register-user-usecase");
const UserHandler = require("./user-handler");
const mockUserRepo = require("../../repositories/user-repository");

test("Can construct UserHandler", () => {
    const handler = new UserHandler();
});

test("Given no user data When call registerUser Then return 400 - Bad Request", async () => {
    const useCase = new RegisterUserUseCase();
    const handler = new UserHandler(useCase);
    const res = setupResponse();
    await handler.registerUser({ }, res);
    verifyErrorHttpStatusCode(res, 400, "Missing user data.");
});

// More research needed into how to do this test.

// test("Given no user name When call registerUser Then return 400 - Bad Request", async () => {
//     const useCase = new RegisterUserUseCase();
//     const handler = new UserHandler(useCase);
//     const res = setupResponse();
//     await handler.registerUser({ "body": { }}, res);
//     verifyErrorHttpStatusCode(res, 400, "Name is required");
// });


test("Given duplicate user When call registerUser Then return 400 - Bad Request", async () => {
    jest.mock("../../repositories/user-repository", () => ({ ...jest.requireActual('../../repositories/user-repository'), getUser: jest.fn() }));
    mockUserRepo.getUser.mockResolvedValue(null);
    await asyncMock();
    // mockUserRepo.getUser.mockImplementation(() => Promise.resolve(null));
    const useCase = new RegisterUserUseCase(mockUserRepo, null);
    const handler = new UserHandler(useCase);
    const res = setupResponse();
    const req = { "body": { "name": "Fred Flintstone", "email": "fred@flintstones.net", "password": "password1" } };
    await handler.registerUser(req, res);
    mockUserRepo.getUser().toHaveBeenCalled();

    // verifyErrorHttpStatusCode(res, 400, "User already exists.");
});

// Arrange helpers
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