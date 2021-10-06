import connection from "./db/connection/db.connection";
import { router } from "./services/router";

const express = require('express');
const app = express();
const port = process.env.port || 3000;

const bootstrap = async () => {

    connection().then(res => console.log(res)).catch(err => console.error(err));

    app.use('/', router);

    app.listen(port, (): void => {
        console.log(`server listening at ${port}`)
    });
}; 

bootstrap();
