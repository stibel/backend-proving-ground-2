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

  const saveUser = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    const hashedPassword = hashSync(password, 10);
    try {
      return res
        .status(HttpStatus.OK)
        .json(
          await save(userRepository, { username, password: hashedPassword }),
        );
    } catch (err) {
      return res.status(HttpStatus.BAD_REQUEST).send(err);
    }
  };

  const loginUser = async (req: Request, res: Response) => {
    try {
      const result = await login(userRepository, tokenRepository, req.body);
      return res.status(HttpStatus.OK).json(result);
    } catch (err) {
      return res.status(HttpStatus.BAD_REQUEST).send(err);
    }
  };

  const refreshToken = async (req: Request, res: Response) => {
    try {
      return res
        .status(HttpStatus.OK)
        .json(await refresh(tokenRepository, req.body));
    } catch (err) {
      return res.sendStatus(HttpStatus.BAD_REQUEST).send(err);
    }
  };

  const logoutUser = async (req: Request, res: Response) => {
    try {
      return res.status(204).json(await logout(tokenRepository, req.body));
    } catch (err) {
      return res.sendStatus(HttpStatus.BAD_REQUEST).send(err);
    }
  };

  return { saveUser, loginUser, refreshToken, logoutUser };
};
