import { Request } from "express";

export default class TaskController {
    constructor() { }

    public static GetTask(req: Request, res: any): void { //will be JSON
        const { params: { id } } = req;
        // return {};
        res.send('Got a GET request');
    }

    public static AddTask(req: Request, res: any): void {
        res.json({ body: req.body });
    }

    public static DeleteTask(req: Request, res: any): void {
        const { params: { id } } = req;
        res.send('Got a DELETE request');
    }
}