import { AppDataSource } from "../data-source";
import promotionData from "../data/promotionData.json";

const seed = async () => {
  try {
    await AppDataSource.initialize();
    const promotionRepository = AppDataSource.getRepository("Promotion");
    
    const promotion = promotionRepository.create(promotionData);
    await promotionRepository.save(promotion);
    console.log("Promotion data seeded successfully");
  } catch (error) {
    console.log(error);
  } finally {
    AppDataSource.destroy();
  }
};

seed();