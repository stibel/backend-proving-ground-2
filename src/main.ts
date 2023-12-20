import express from 'express';
import { createRouter } from "./services/task_router";
import cors from 'cors';
import connection from "./db/connection/db_connection";

const app = express();
const port = process.env.port || 3000;

const bootstrap = async () => {

    const dbConnection = await connection().catch(err => console.error(err));

    if (!dbConnection)
        throw new Error('Could not connect to database');

    app.use(cors());
    app.use(express.json());
    app.use('/', createRouter(dbConnection));

    app.listen(port, (): void => {
        console.log(`server listening at ${port}`)
    });
};

bootstrap();
