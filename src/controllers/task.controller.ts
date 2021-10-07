import { Request } from "express";

export default class TaskController {
    constructor() { }

    public static GetTask(req: Request, res: any): Object { //will be JSON
        const { params: { id } } = req;
        return {};
    }

    public static AddTask(req: Request, res: any): void {

    }

    public static DeleteTask(req: Request, res: any): void {
        const { params: { id } } = req;
    }
}