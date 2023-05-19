const UserHandler = require("./user-handler");

test("Can construct UserHandler", () => {
    const handler = new UserHandler();
});

test("Given empty request body When call registerUser Then don't do anything", async () => {
    const handler = new UserHandler();
    await handler.registerUser({ }, null);
});
