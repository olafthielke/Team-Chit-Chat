const RegisterUserUseCase = require("./register-user-usecase");

test("Can construct RegisterUserUseCase", () => {
    const usecase = new RegisterUserUseCase();
});

test("Can call registerUser", async () => {
    const usecase = new RegisterUserUseCase();
    await usecase.registerUser();
});
