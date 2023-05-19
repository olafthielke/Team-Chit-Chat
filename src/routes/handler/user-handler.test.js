const UserHandler = require("./user-handler");

test("Can construct UserHandler", () => {
    const handler = new UserHandler();
});

test("Given empty request body When call registerUser Then return 400 - Bad Request", async () => {
    const handler = new UserHandler();
    const res = setupResponse();
    await handler.registerUser({ }, res);
    verifyErrorHttpStatusCode(res, 400, "Empty request body.");
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