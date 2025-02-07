import { NextFunction, Request, Response } from "express";
import { promotionSchema } from "../schemas/promotionSchema";
import { PromotionService } from "../services/promotionService";

class PromotionController {
    static async createPromotion(
      req: Request,
      res: Response,
      next: NextFunction
    ): Promise<any> {
      try {
        const { error, value } = promotionSchema.validate(req.body);
  
        if (error) {
          return res.status(401).json({
            status: 401,
            message: error.message,
            data: null,
          });
        }
  
        const data = await PromotionService.createPromotion(value);
        if(data.error) throw data.error;
              
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
  
  export default PromotionController;