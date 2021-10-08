import express from 'express';
import { createRouter } from "./services/tasks.router";
// import TaskController from "./services/task.controller";
import connection from "./db/connection/db.connection";

const app = express();
const port = process.env.port || 3000;

const bootstrap = async () => {

    const dbConnection = await connection().catch(err => console.error(err));

    if (!dbConnection)
        throw new Error('Could not connect to database');

    app.use(express.json());
    app.use('/', createRouter(dbConnection));

    app.listen(port, (): void => {
        console.log(`server listening at ${port}`)
    });
};

bootstrap();