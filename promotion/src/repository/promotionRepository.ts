import { AppDataSource } from "../data-source";
import { Repository } from "typeorm";
import { Promotion } from "../entity/Promotion";

const promotionRepository: Repository<Promotion> = AppDataSource.getRepository(Promotion);

export async function createPromotion(data: any): Promise<any> {
  try {
    const newPromotion = promotionRepository.create(data);
    const savedPromotion = await promotionRepository.save(newPromotion);

    return savedPromotion
  } catch (error) {
    return error;
  }
}

export async function findByName(name: any): Promise<any> {
  try {
    const promotion = await promotionRepository.findOne({ where: { name } });

    return promotion;
  } catch (error) {
    return error;
  }
}