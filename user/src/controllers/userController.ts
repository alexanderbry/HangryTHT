import { Request, Response, NextFunction } from "express";
import { userSchema } from "../schemas/userSchema";
import { UserService } from "../services/userService";

class UserController {
  static async register(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const { error, value } = userSchema.validate(req.body);

      if (error) {
        return res.status(401).json({
          status: 401,
          message: error.message,
          data: null,
        });
      }

      const data = await UserService.register(value);

      if (data.error) throw data.error;

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
