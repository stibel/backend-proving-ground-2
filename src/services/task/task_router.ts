import express from "express";
import { Connection } from "typeorm";
import { controller } from "./task_controller";
import { authenticate } from "../middleware/authenticate";

export const createRouter = (connection: Connection): express.Router => {
  const router: express.Router = express.Router();
  const { getAllTasks, getTask, saveTask, deleteTask } = controller(connection);
  router.get("/", authenticate, getAllTasks);
  router.get("/:id", getTask);
  router.post("/", authenticate, saveTask);
  router.delete("/:id", deleteTask);
  return router;
};
