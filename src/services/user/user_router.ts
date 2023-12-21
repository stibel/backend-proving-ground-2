import { Connection } from "typeorm";
import { Router } from "express";
import { userController } from "./user_controller";

export const createUserRouter = (connection: Connection): Router => {
  const router: Router = Router();
  const { saveUser, loginUser } = userController(connection);
  router.post("/", saveUser);
  router.post("/login", loginUser);
  return router;
};
