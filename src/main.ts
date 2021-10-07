import connection from "./db/connection/db.connection";
import { router } from "./services/tasks.router";
import express from 'express';

const app = express();
const port = process.env.port || 3000;

const bootstrap = async () => {

    connection().then(() => console.log("Succesfully connected to postgres database")).catch(err => console.error('ERROR', err));

    app.use(express.json());
    app.use('/', router);

    app.listen(port, (): void => {
        console.log(`server listening at ${port}`)
    });
}; 

bootstrap();