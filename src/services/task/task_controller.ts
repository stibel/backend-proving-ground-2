import { Request, Response } from "express";
import { Connection, Repository } from "typeorm";
import { Task } from "../../db/entities/Task";
import { HttpStatus } from "../../enums/http_status";
import { deleteOne, getAll, getOne, save } from "./task_handlers";

export const controller = (connection: Connection) => {
  const taskRepository: Repository<Task> = connection.getRepository(Task);

  const getAllTasks = async (req: Request, res: Response) => {
    return res
      .status(HttpStatus.OK)
      .json(await getAll(taskRepository, req.body.user));
  };

  const getTask = async (req: Request, res: Response) => {
    const {
      params: { id },
    } = req;
    return res
      .status(HttpStatus.OK)
      .json(await getOne(taskRepository, parseInt(id)));
  };

  const saveTask = async (req: Request, res: Response) => {
    const { body } = req;
    try {
      return res
        .status(HttpStatus.ADDED)
        .json(await save(taskRepository, body));
    } catch (err) {
      return res.status(HttpStatus.BAD_REQUEST).send(err);
    }
  };

  const deleteTask = async (req: Request, res: Response) => {
    const {
      params: { id },
    } = req;
    return res
      .status(HttpStatus.OK)
      .json(await deleteOne(taskRepository, parseInt(id)));
  };

  return { getAllTasks, getTask, saveTask, deleteTask };
};
