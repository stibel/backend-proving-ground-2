"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.refresh = exports.login = exports.save = void 0;
const bcrypt_1 = require("bcrypt");
const jsonwebtoken_1 = require("jsonwebtoken");
const save = async (repository, dto) => {
    if (!dto) {
        throw new Error("Invalid content");
    }
    return repository.save(dto);
};
exports.save = save;
const login = async (userRepository, tokenRepository, dto) => {
    if (!dto) {
        throw new Error("No username and password!");
    }
    const { username, password } = dto;
    const user = await userRepository.findOne({
        where: [{ username: username }],
    });
    if (!user) {
        throw new Error("No user with this username!");
    }
    if (!(0, bcrypt_1.compareSync)(password, user?.password))
        throw new Error("Incorrect password!");
    const accessToken = (0, jsonwebtoken_1.sign)({ username: user.username }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "5s" });
    const refreshToken = (0, jsonwebtoken_1.sign)({ username: user.username }, process.env.REFRESH_TOKEN_SECRET);
    const refresh = await tokenRepository.save({ token: refreshToken });
    return { accessToken, refreshToken: refresh };
};
exports.login = login;
const refresh = async (tokenRepository, dto) => {
    console.log("REFRESH");
    const { token } = dto;
    if (!token) {
        throw new Error("No refresh token provided!");
    }
    const { token: savedToken } = await tokenRepository.findOne({ token: token });
    if (!savedToken) {
        throw new Error("No such refresh token stored!");
    }
    let newAccessToken;
    (0, jsonwebtoken_1.verify)(savedToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) {
            throw new Error(err);
        }
        newAccessToken = (0, jsonwebtoken_1.sign)({ username: user.username }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "5s" });
    });
    return { accessToken: newAccessToken };
};
exports.refresh = refresh;
const logout = async (tokenRepository, dto) => {
    const { token } = dto;
    return tokenRepository.delete({ token: token });
};
exports.logout = logout;
