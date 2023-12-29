import express from "express";
import { createRouter } from "./services/task/task_router";
import cors from "cors";
import connection from "./db/connection/db_connection";
import { createUserRouter } from "./services/user/user_router";
import { config } from "dotenv";

config();
const app = express();
const port = process.env.PORT || 3000;

const bootstrap = async () => {
  const dbConnection = await connection().catch((err) => console.error(err));
  if (!dbConnection) throw new Error("Could not connect to database");
  console.log(process.env.REFRESH_TOKEN_SECRET);

  app.use(cors());
  app.use(express.json());
  app.get("/", (req, res) => res.send("Hello world!"));
  app.use("/tasks", createRouter(dbConnection));
  app.use("/users", createUserRouter(dbConnection));

  app.listen(port, (): void => {
    console.log(`server listening at ${port}`);
  });
};

bootstrap().catch((err) => console.log(err));
