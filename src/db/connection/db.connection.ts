import { Connection, createConnection } from "typeorm";

const connection = async (): Promise<Connection> => await createConnection({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "postgres123",
    database: "tasks_db",
    entities: ["../entities/*.ts"]
});

export default connection;