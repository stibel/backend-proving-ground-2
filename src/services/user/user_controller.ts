import { Request, Response } from "express";
import { Connection } from "typeorm";
import { User } from "../../db/entities/User";
import { HttpStatus } from "../../enums/http_status";
import { hashSync } from "bcrypt";
import { login, logout, refresh, save } from "./user_handlers";
import { RefreshToken } from "../../db/entities/RefreshToken";

export const userController = (connection: Connection) => {
  const userRepository = connection.getRepository(User);
  const tokenRepository = connection.getRepository(RefreshToken);

  const saveUser = async (req: Request, res: Response): Promise<void> => {
    const { username, password } = req.body;
    const hashedPassword = hashSync(password, 10);
    try {
      res
        .status(HttpStatus.OK)
        .json(
          await save(userRepository, { username, password: hashedPassword }),
        );
    } catch (err) {
      res.status(HttpStatus.BAD_REQUEST).send(err);
    }
  };

  const loginUser = async (req: Request, res: Response): Promise<void> => {
    try {
      res
        .status(HttpStatus.OK)
        .json(await login(userRepository, tokenRepository, req.body));
    } catch (err) {
      res.status(HttpStatus.BAD_REQUEST).send(err);
    }
  };

  const refreshToken = async (req: Request, res: Response): Promise<void> => {
    try {
      const result = await refresh(tokenRepository, req.body);
      res.status(HttpStatus.OK).json(result);
    } catch (err) {
      res.sendStatus(HttpStatus.BAD_REQUEST).send(err);
    }
  };

  const logoutUser = async (req: Request, res: Response): Promise<void> => {
    try {
      res.status(204).json(await logout(tokenRepository, req.body));
    } catch (err) {
      res.sendStatus(HttpStatus.BAD_REQUEST).send(err);
    }
  };

  return { saveUser, loginUser, refreshToken, logoutUser };
};
