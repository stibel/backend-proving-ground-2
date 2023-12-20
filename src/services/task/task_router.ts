import express from "express";
import { Connection } from "typeorm";
import { controller } from "./task_controller";

export const createRouter = (connection: Connection): express.Router => {
  const router: express.Router = express.Router();
  const { getAllTasks, getTask, saveTask, deleteTask } = controller(connection);
  router.get("/tasks", getAllTasks);
  router.get("/tasks/:id", getTask);
  router.post("/tasks/", saveTask);
  router.delete("/tasks/:id", deleteTask);
  return router;
};
