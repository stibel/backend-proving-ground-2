import * as express from 'express';
import TaskController from '../controllers/task.controller';

export const router: express.Router = express.Router();
// /tasks/:id - get all tasks, get task by id, send 200
// /tasks/delete/:id - delete all tasks, delet task by id
// tasks/add - add task, send 201
router.get('/tasks/:id', (req, res) => TaskController.GetTask(req, res));
router.post('/tasks/add', (req, res) => TaskController.AddTask(req, res));
router.delete('tasks/delete/:id', (req, res) => TaskController.DeleteTask(req, res));