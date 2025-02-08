import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../../helpers/jsonwebtoken";
import { UserResponse } from "../../types/types";
import fetch from "node-fetch";

const authentication = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.headers.authorization) throw { name: "Unauthorized" };

    const [bearer, token] = req.headers.authorization.split(" ");
    if (!token) throw { name: "Unauthorized" };

    const data = verifyToken(token);
    if (typeof data === "string") throw { name: "Unauthorized" };

    const user: UserResponse = await fetch(process.env.USER_APP + data.id).then(
      (res) => res.json()
    );
    if (!user) throw { name: "Unauthorized" };

    res.locals.loginSession = {
      id: user.data.id,
    };

    next();
  } catch (error) {
    next(error);
  }
};

export default authentication;
