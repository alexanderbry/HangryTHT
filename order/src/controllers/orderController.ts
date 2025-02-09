import { NextFunction, Request, Response } from "express";
import { addToCartSchema } from "../schemas/orderSchema";
import { OrderService } from "../services/orderService";

class OrderController {
  static async addToCart(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const { id } = res.locals.loginSession;

      const { error, value } = addToCartSchema.validate(req.body);

      if (error) {
        return res.status(401).json({
          status: 401,
          message: error.message,
          data: null,
        });
      }

      const payload = {
        id,
        products: value.products,
      };

      const data = await OrderService.addToCart(payload);
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

export default OrderController;
