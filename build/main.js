"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const task_router_1 = require("./services/task/task_router");
const cors_1 = __importDefault(require("cors"));
const db_connection_1 = __importDefault(require("./db/connection/db_connection"));
const user_router_1 = require("./services/user/user_router");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
const bootstrap = async () => {
    const dbConnection = await (0, db_connection_1.default)().catch((err) => console.error(err));
    if (!dbConnection)
        throw new Error("Could not connect to database");
    app.use((0, cors_1.default)());
    app.use(express_1.default.json());
    app.get("/", (req, res) => res.send("Hello world!"));
    app.use("/tasks", (0, task_router_1.createRouter)(dbConnection));
    app.use("/users", (0, user_router_1.createUserRouter)(dbConnection));
    app.listen(port, () => {
        console.log(`server listening at ${port}`);
    });
};
bootstrap().catch((err) => console.log(err));
