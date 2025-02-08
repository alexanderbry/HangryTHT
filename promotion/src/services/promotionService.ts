import { createPromotion, findByName } from "../repository/promotionRepository";
import fetch from 'node-fetch';

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
  static async getApplicablePromotion(payload: any): Promise<any> {
    try {
      let { id } = payload;

      const availablePromotion = await fetch(`http://localhost:3000/user/${id}`);
      if(!availablePromotion) throw { name : "NoPromotion" };

      return {
        status: 20,
        message: "Promotion created",
        data: availablePromotion,
      };
    } catch (error) {
      return {
        error,
      };
    }
  }
}
