const UserHandler = require("./user-handler");
const Errors = require("./errors");
const RegisterUserUseCase = require("./register-user-usecase");
jest.mock("./register-user-usecase");


test("Can construct UserHandler", () => {
    const handler = new UserHandler();
});

test("Given use case throws MissingUser error When call registerUser Then return 400 - Bad Request", async () => {
    const mockUseCase = new RegisterUserUseCase();
    mockUseCase.registerUser.mockRejectedValue(new Errors.MissingUser());
    const handler = new UserHandler(mockUseCase, null, null);
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

test("Given use case throws UserAlreadyExists error When call registerUser Then return 400 - Bad Request", async () => {
    const mockUseCase = new RegisterUserUseCase();
    mockUseCase.registerUser.mockRejectedValue(new Errors.UserAlreadyExists());
    const handler = new UserHandler(mockUseCase, null, null);
    const res = setupResponse();
    await handler.registerUser({ }, res);
    verifyErrorHttpStatusCode(res, 400, "User already exists.");
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
