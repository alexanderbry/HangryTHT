import fetch from "node-fetch";
import {
  createCart,
  createCartItem,
  createOrder,
  findCartById,
  findProductById,
  updateCart,
} from "../repository/orderRepository";
import { PromotionResponse } from "../types/types";

export class OrderService {
  static async addToCart(payload: any): Promise<any> {
    try {
      const { id, products } = payload;

      let total_price = 0;
      const cartItems = [];

      const newCart = await createCart({ user_id: id, total_price });
      if (!newCart) throw { name: "FailedCreateCart" };

      for (const item of products) {
        const product = await findProductById(item.product_id);
        if (!product) throw { name: `Product not found` };

        const itemTotalPrice = product.price * item.quantity;
        total_price += itemTotalPrice;

        const cartItem = await createCartItem({
          cart: newCart,
          product,
          quantity: item.quantity,
          total_price: itemTotalPrice,
        });

        cartItems.push(cartItem);
      }

      newCart.total_price = total_price;
      const data = await updateCart(newCart);

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

  static async placeOrder(payload: any): Promise<any> {
    try {
      const { user_id, cartId, promotion } = payload;

      const cart = await findCartById(cartId);
      if (!cart) throw { name: `Cart not found` };

      const applicablePromotion = (await fetch(
        `http://localhost:3001/promotion`
      ).then((res) => res.json())) as PromotionResponse;

      const promotionData = applicablePromotion.data.find(
        (promo) => promo.name === promotion
      );
      if (!promotionData) throw { name: `Promotion not found` };

      if (promotionData.type === "percentage") {
        promotionData.discount =
          (cart.total_price * promotionData.discount) / 100;
      } else {
        promotionData.discount = promotionData.discount;
      }

      const discount_applied = promotionData.discount;
      const final_price = cart.total_price - promotionData.discount;

      const data = await createOrder({
        user_id,
        promotion,
        discount_applied,
        final_price,
        products: cart.products,
      });

      return {
        status: 201,
        message: "Order placed",
        data: data,
      };
    } catch (error) {
      return {
        error,
      };
    }
  }
}
