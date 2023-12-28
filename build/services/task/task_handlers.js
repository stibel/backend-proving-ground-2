"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOne = exports.save = exports.getOne = exports.getAll = void 0;
const Task_1 = require("../../db/entities/Task");
const getAll = async (repository, user) => {
    return repository.find({ where: [{ user: user }] });
};
exports.getAll = getAll;
const getOne = async (repository, id) => {
    return repository.findOne(id);
};
exports.getOne = getOne;
const save = async (repository, dto) => {
    if (!dto)
        throw new Error("Invalid content!");
    let task = new Task_1.Task();
    task = { ...task, ...dto };
    return repository.save(task);
};
exports.save = save;
const deleteOne = async (repository, id) => {
    return repository.delete(id);
};
exports.deleteOne = deleteOne;
