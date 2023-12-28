"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const authenticate = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token)
        return res.sendStatus(401);
    (0, jsonwebtoken_1.verify)(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err)
            return res.sendStatus(403);
        req.body.user = user?.username;
        next();
    });
};
exports.authenticate = authenticate;
