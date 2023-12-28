import { Request, Response } from "express";
import { Connection } from "typeorm";
export declare const controller: (connection: Connection) => {
    getAllTasks: (req: Request, res: Response) => Promise<void>;
    getTask: (req: Request, res: Response) => Promise<void>;
    saveTask: (req: Request, res: Response) => Promise<void>;
    deleteTask: (req: Request, res: Response) => Promise<void>;
};
