"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
var express = __importStar(require("express"));
var task_controller_1 = __importDefault(require("../controllers/task.controller"));
exports.router = express.Router();
// /tasks/:id - get all tasks, get task by id, send 200
// /tasks/delete/:id - delete all tasks, delet task by id
// tasks/add - add task, send 201
exports.router.get('/tasks/:id', function (req, res) { return task_controller_1.default.GetTask(req, res); });
exports.router.post('/tasks/add', function (req, res) { return task_controller_1.default.AddTask(req, res); });
exports.router.delete('tasks/delete/:id', function (req, res) { return task_controller_1.default.DeleteTask(req, res); });
