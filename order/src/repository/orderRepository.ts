import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Cart } from "../entity/Cart";
import { Order } from "../entity/Order";
import { Product } from "../entity/Product";

const cartRepository: Repository<Cart> = AppDataSource.getRepository(Cart);
const orderRepository: Repository<Order> = AppDataSource.getRepository(Order);
const productRepository: Repository<Product> =
  AppDataSource.getRepository(Product);

export async function createCart(data: any): Promise<any> {
  try {
    const newCart = cartRepository.create(data);
    const savedCart = await cartRepository.save(newCart);

    return savedCart;
  } catch (error) {
    return error;
  }
}

export async function createOrder(data: any): Promise<any> {
  try {
    const newOrder = orderRepository.create(data);
    const savedOrder = await orderRepository.save(newOrder);

    return savedOrder;
  } catch (error) {
    return error;
  }
}

export async function findProductById(id: any): Promise<any> {
  try {
    const product = await productRepository.findOne({ where: { id } });

    return product;
  } catch (error) {
    return error;
  }
}
