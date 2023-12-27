import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

export const authenticate = (
  req: Request & { user?: string },
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers["authorization"];
  const token: string | undefined = authHeader && authHeader.split(" ")[1];

  console.log(token);
  if (!token) return res.sendStatus(401);

  verify(token, process.env.ACCESS_TOKEN_SECRET as string, (err, user) => {
    if (err) return res.sendStatus(403);
    //@ts-ignore
    req.body.user = user?.username;
    next();
  });
};
