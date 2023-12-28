import { Connection } from "typeorm";
import { Router } from "express";
import { userController } from "./user_controller";

export const createUserRouter = (connection: Connection): Router => {
  const router: Router = Router();
  const { saveUser, loginUser, refreshToken, logoutUser } =
    userController(connection);
  router.post("/", saveUser);
  router.post("/login", loginUser);
  router.post("/token", refreshToken);
  router.delete("/logout", logoutUser);
  return router;
};
