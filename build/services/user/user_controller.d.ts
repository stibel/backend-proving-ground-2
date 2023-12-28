import { Request, Response } from "express";
import { Connection } from "typeorm";
export declare const userController: (connection: Connection) => {
    saveUser: (req: Request, res: Response) => Promise<void>;
    loginUser: (req: Request, res: Response) => Promise<void>;
    refreshToken: (req: Request, res: Response) => Promise<void>;
    logoutUser: (req: Request, res: Response) => Promise<void>;
};
