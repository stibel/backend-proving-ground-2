import { DeleteResult, Repository } from "typeorm";
import { TaskDto } from "../../db/dto/task_dto";
import { Task } from "../../db/entities/Task";

export const getAll = async (
  repository: Repository<Task>,
  user: string,
): Promise<Array<Task> | undefined> => {
  console.log("GETALL");
  return repository.find({ where: [{ user: user }] });
};

export const getOne = async (
  repository: Repository<Task>,
  id: number,
): Promise<Task | undefined> => {
  return repository.findOne(id);
};

export const save = async (
  repository: Repository<Task>,
  dto: TaskDto,
): Promise<Task> => {
  if (!dto) throw new Error("Invalid content!");

  let task = new Task();
  task = { ...task, ...dto };
  return repository.save(task);
};

export const deleteOne = async (
  repository: Repository<Task>,
  id: number,
): Promise<DeleteResult> => {
  return repository.delete(id);
};
