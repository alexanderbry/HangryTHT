import fetch from "node-fetch";
import {
  createCart,
  createCartItem,
  createOrder,
  findCartItem,
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
      const { user_id, cartId, promotion, token } = payload;

      let discount_applied = 0;
      let final_price = 0;
      
      const cart = await findCartItem(cartId);
      if (!cart) throw { name: `Cart not found` };

      const cartTotalPrice: number = cart.reduce((acc: number, cartItem: { total_price: number }) => acc + cartItem.total_price, 0);

      const applicablePromotion = (await fetch(
        `http://localhost:3001/promotion/user-promotion`, {
          headers: {
            authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          }
        }
      ).then((res) => res.json())) as PromotionResponse;

      if(applicablePromotion.status !== 200) throw { name: `NoPromotion` };

      const promotionData = applicablePromotion.data.find(
        (promo) => promo.name === promotion
      );
      if (!promotionData) throw { name: `NoPromotion` };

      if (promotionData.type === "percentage") {
        discount_applied = (cartTotalPrice * promotionData.discount) / 100;
      } else {
        discount_applied = promotionData.discount;
      }

      final_price = cartTotalPrice - discount_applied;

      const data = await createOrder({
        user_id,
        promotion,
        discount_applied,
        final_price,
        cart : {
          id: cartId
        }
      });

      return {
        status: 201,
        message: "Order placed",
        data: null,
      };
    } catch (error) {
      return {
        error,
      };
    }
  }
}
