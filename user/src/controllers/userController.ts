import { Request, Response, NextFunction } from "express";
import { getUserByIdSchema, loginSchema, registerSchema } from "../schemas/userSchema";
import { UserService } from "../services/userService";

class UserController {
  static async register(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const { error, value } = registerSchema.validate(req.body);

      if (error) {
        return res.status(401).json({
          status: 401,
          message: error.message,
          data: null,
        });
      }

      const data = await UserService.register(value);

      res.status(data.status).json({
        status: data.status,
        message: data.message,
        data: data.data,
      });
    } catch (error) {
      next(error);
    }
  }

  static async login(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const { error, value } = loginSchema.validate(req.body);

      if (error) {
        return res.status(401).json({
          status: 401,
          message: error.message,
          data: null,
        });
      }

      const data = await UserService.login(value);

      res.status(data.status).json({
        status: data.status,
        message: data.message,
        data: data.data,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getUserById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const { error, value } = getUserByIdSchema.validate(req.params);

      if (error) {
        return res.status(401).json({
          status: 401,
          message: error.message,
          data: null,
        });
      }

      const data = await UserService.getUserById(value);

      res.status(data.status).json({
        status: data.status,
        message: data.message,
        data: data.data,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default UserController;
