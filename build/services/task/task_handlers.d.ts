import { DeleteResult, Repository } from "typeorm";
import { TaskDto } from "../../db/dto/task_dto";
import { Task } from "../../db/entities/Task";
export declare const getAll: (repository: Repository<Task>, user: string) => Promise<Array<Task> | undefined>;
export declare const getOne: (repository: Repository<Task>, id: number) => Promise<Task | undefined>;
export declare const save: (repository: Repository<Task>, dto: TaskDto) => Promise<Task>;
export declare const deleteOne: (repository: Repository<Task>, id: number) => Promise<DeleteResult>;
