import { createPromotion, findByName, findPromotionByUserType } from "../repository/promotionRepository";
import fetch from "node-fetch";
import { UserResponse } from "../types/types";

export class PromotionService {
  static async createPromotion(payload: any): Promise<any> {
    try {
      let {
        name,
        type,
        discount,
        max_discount,
        min_order,
        start_date,
        end_date,
        max_usage,
      } = payload;

      const isValidPromotion = await findByName(name);
      if (isValidPromotion) throw { name: "NameTaken" };

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
      let id = payload;

      const user: UserResponse = await fetch(process.env.USER_APP + id).then((res) => res.json());
      if (!user.data) throw { name: "Not Found" };

      const userType = user.data.user_type;

      const promotionsByUserType = await findPromotionByUserType(userType);
      if (!promotionsByUserType) throw { name: "No Promotion" };
      
      return {
        status: 200,
        message: null,
        data: promotionsByUserType,
      };
    } catch (error) {
      return {
        error,
      };
    }
  }
}
