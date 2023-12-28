"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserRouter = void 0;
const express_1 = require("express");
const user_controller_1 = require("./user_controller");
const createUserRouter = (connection) => {
    const router = (0, express_1.Router)();
    const { saveUser, loginUser, refreshToken, logoutUser } = (0, user_controller_1.userController)(connection);
    router.post("/", saveUser);
    router.post("/login", loginUser);
    router.post("/token", refreshToken);
    router.delete("/logout", logoutUser);
    return router;
};
exports.createUserRouter = createUserRouter;
