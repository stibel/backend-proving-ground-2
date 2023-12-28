"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const Task_1 = require("../entities/Task");
const User_1 = require("../entities/User");
const RefreshToken_1 = require("../entities/RefreshToken");
const connection = async () => await (0, typeorm_1.createConnection)({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "postgres123",
    database: "tasks_db",
    synchronize: true,
    entities: [Task_1.Task, User_1.User, RefreshToken_1.RefreshToken],
});
exports.default = connection;
