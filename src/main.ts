import express from "express";
import { createRouter } from "./services/task/task_router";
import cors from "cors";
import connection from "./db/connection/db_connection";
import { createUserRouter } from "./services/user/user_router";

const app = express();
const port = process.env.port || 3000;

const bootstrap = async () => {
  const dbConnection = await connection().catch((err) => console.error(err));

  if (!dbConnection) throw new Error("Could not connect to database");

  app.use(cors());
  app.use(express.json());
  app.use("/tasks", createRouter(dbConnection));
  app.use("/users", createUserRouter(dbConnection));

  app.listen(port, (): void => {
    console.log(`server listening at ${port}`);
  });
};

bootstrap().catch((err) => console.log(err));
