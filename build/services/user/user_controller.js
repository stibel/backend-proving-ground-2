"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const User_1 = require("../../db/entities/User");
const http_status_1 = require("../../enums/http_status");
const bcrypt_1 = require("bcrypt");
const user_handlers_1 = require("./user_handlers");
const RefreshToken_1 = require("../../db/entities/RefreshToken");
const userController = (connection) => {
    const userRepository = connection.getRepository(User_1.User);
    const tokenRepository = connection.getRepository(RefreshToken_1.RefreshToken);
    const saveUser = async (req, res) => {
        const { username, password } = req.body;
        const hashedPassword = (0, bcrypt_1.hashSync)(password, 10);
        try {
            res
                .status(http_status_1.HttpStatus.OK)
                .json(await (0, user_handlers_1.save)(userRepository, { username, password: hashedPassword }));
        }
        catch (err) {
            res.status(http_status_1.HttpStatus.BAD_REQUEST).send(err);
        }
    };
    const loginUser = async (req, res) => {
        try {
            res
                .status(http_status_1.HttpStatus.OK)
                .json(await (0, user_handlers_1.login)(userRepository, tokenRepository, req.body));
        }
        catch (err) {
            res.status(http_status_1.HttpStatus.BAD_REQUEST).send(err);
        }
    };
    const refreshToken = async (req, res) => {
        try {
            const result = await (0, user_handlers_1.refresh)(tokenRepository, req.body);
            res.status(http_status_1.HttpStatus.OK).json(result);
        }
        catch (err) {
            res.sendStatus(http_status_1.HttpStatus.BAD_REQUEST).send(err);
        }
    };
    const logoutUser = async (req, res) => {
        try {
            res.status(204).json(await (0, user_handlers_1.logout)(tokenRepository, req.body));
        }
        catch (err) {
            res.sendStatus(http_status_1.HttpStatus.BAD_REQUEST).send(err);
        }
    };
    return { saveUser, loginUser, refreshToken, logoutUser };
};
exports.userController = userController;
