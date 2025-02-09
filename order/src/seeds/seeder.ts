import { AppDataSource } from "../data-source";
import productData from "../data/productData.json";

const seed = async () => {
  try {
    await AppDataSource.initialize();
    const productRepository = AppDataSource.getRepository("Product");
    
    const product = productRepository.create(productData);
    await productRepository.save(product);
    console.log("Product data seeded successfully");
  } catch (error) {
    console.log(error);
  } finally {
    AppDataSource.destroy();
  }
};

seed();