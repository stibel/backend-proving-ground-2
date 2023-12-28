"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRouter = void 0;
const express_1 = __importDefault(require("express"));
const task_controller_1 = require("./task_controller");
const authenticate_1 = require("../middleware/authenticate");
const createRouter = (connection) => {
    const router = express_1.default.Router();
    const { getAllTasks, getTask, saveTask, deleteTask } = (0, task_controller_1.controller)(connection);
    router.get("/", authenticate_1.authenticate, getAllTasks);
    router.get("/:id", getTask);
    router.post("/", authenticate_1.authenticate, saveTask);
    router.delete("/:id", deleteTask);
    return router;
};
exports.createRouter = createRouter;
