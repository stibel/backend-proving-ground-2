import connection from "../../db/connection/db_connection";
import { Request, Response } from "express";
import { Connection } from "typeorm";
import { User } from "../../db/entities/User";
import { HttpStatus } from "../../enums/http_status";

export const userController = (connection: Connection) => {
  const userRepository = connection.getRepository(User);

  const saveUser = async (req: Request, res: Response): Promise<void> => {
    console.log(req.body);
    res.status(HttpStatus.OK);
  };

  return { saveUser };
};
