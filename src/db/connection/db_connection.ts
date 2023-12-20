import { Connection, createConnection } from "typeorm";
import { Task } from "../entities/Task";
import { User } from "../entities/User";

const connection = async (): Promise<Connection> =>
  await createConnection({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "postgres123",
    database: "tasks_db",
    synchronize: true,
    entities: [Task, User],
  });

export default connection;