import express from "express";
import { Connection } from "typeorm";
import { controller } from "./task_controller";

export const createRouter = (connection: Connection): express.Router => {
  const router: express.Router = express.Router();
  const { getAllTasks, getTask, saveTask, deleteTask } = controller(connection);
  router.get("/", getAllTasks);
  router.get("/:id", getTask);
  router.post("/", saveTask);
  router.delete("/:id", deleteTask);
  return router;
};
