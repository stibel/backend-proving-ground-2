import { createConnection } from "typeorm";

const connection = async () => await createConnection({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "postgres123",
    database: "tasks_db"
});

const bootstrap = async () => connection().catch(err => console.error(err));

bootstrap();