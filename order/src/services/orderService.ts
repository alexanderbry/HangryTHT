import { createCart, findProductById } from "../repository/orderRepository";

export class OrderService {
  static async addToCart(payload: any): Promise<any> {
    try {
      const { id, products } = payload;

      let total_price = 0;
      const productList = [];

      for (const item of products) {
        const product = await findProductById(item.product_id);
        if (!product) throw { name: `Product not found` };

        total_price += product.price * item.quantity;
        productList.push(product);
      }

      const newCart = {
        user_id: id,
        total_price,
        products: productList,
      };

      const data = await createCart(newCart);
      if (!data) throw { name: "FailedCreateCart" };

      return {
        status: 201,
        message: "Cart created",
        data,
      };
    } catch (error) {
      return {
        error,
      };
    }
  }
}
