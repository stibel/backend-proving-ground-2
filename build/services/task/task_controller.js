"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.controller = void 0;
const Task_1 = require("../../db/entities/Task");
const http_status_1 = require("../../enums/http_status");
const task_handlers_1 = require("./task_handlers");
const controller = (connection) => {
    const taskRepository = connection.getRepository(Task_1.Task);
    const getAllTasks = async (req, res) => {
        res.status(http_status_1.HttpStatus.OK).json(await (0, task_handlers_1.getAll)(taskRepository, req.body.user));
    };
    const getTask = async (req, res) => {
        const { params: { id }, } = req;
        res.status(http_status_1.HttpStatus.OK).json(await (0, task_handlers_1.getOne)(taskRepository, parseInt(id)));
    };
    const saveTask = async (req, res) => {
        const { body } = req;
        try {
            res.status(http_status_1.HttpStatus.ADDED).json(await (0, task_handlers_1.save)(taskRepository, body));
        }
        catch (err) {
            res.status(http_status_1.HttpStatus.BAD_REQUEST).send(err);
        }
    };
    const deleteTask = async (req, res) => {
        const { params: { id }, } = req;
        res
            .status(http_status_1.HttpStatus.OK)
            .json(await (0, task_handlers_1.deleteOne)(taskRepository, parseInt(id)));
    };
    return { getAllTasks, getTask, saveTask, deleteTask };
};
exports.controller = controller;
