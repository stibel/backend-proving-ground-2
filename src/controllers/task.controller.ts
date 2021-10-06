export default class TaskController {
    constructor() { }

    public static GetTask(req: any, res: any): void { //will be JSON
        const { params: { id } } = req;
    }

    public static AddTask(req: any, res: any): void {

    }

    public static DeleteTask(req: any, res: any): void {
        const { params: { id } } = req;
    }
}