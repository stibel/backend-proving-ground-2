import express from 'express';
import { Connection } from 'typeorm';
import { controller } from './task.controller';

export const createRouter = (connection: Connection): express.Router => {
    const router: express.Router = express.Router();
    const { getAllTasks, getTask, saveTask, deleteTask } = controller(connection);
    router.get('/tasks', getAllTasks)
    router.get('/tasks/:id', getTask);
    router.post('/tasks/add', saveTask);
    router.delete('/tasks/delete/:id', deleteTask);
    return router;
};