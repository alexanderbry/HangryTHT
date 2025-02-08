import { AppDataSource } from "../data-source";
import cityData from "../data/cityData.json";

const seed = async () => {
  try {
    await AppDataSource.initialize();
    const cityRepository = AppDataSource.getRepository("City");
    
    const city = cityRepository.create(cityData);
    await cityRepository.save(city);
    console.log("City data seeded successfully");
  } catch (error) {
    console.log(error);
  } finally {
    AppDataSource.destroy();
  }
};

seed();