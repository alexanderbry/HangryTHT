import { createPromotion, findByName } from "../repository/promotionRepository";

export class PromotionService {
  static async createPromotion(payload: any): Promise<any> {
    try {
      let { name, type, discount, max_discount, min_order, start_date, end_date, max_usage } = payload;

      const isValidPromotion = await findByName(name);
      if(isValidPromotion) throw { name : "NameTaken" };

      const data = await createPromotion({
        name,
        type,
        discount,
        max_discount,
        min_order,
        start_date,
        end_date,
        max_usage,
      });

      return {
        status: 201,
        message: "Promotion created",
        data,
      };
    } catch (error) {
      return {
        error,
      };
    }
  }
}