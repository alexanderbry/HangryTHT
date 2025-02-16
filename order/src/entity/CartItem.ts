import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Cart } from "./Cart";
import { Product } from "./Product";

@Entity()
export class CartItem {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Cart, (cart) => cart.items, { nullable: false, onDelete: "CASCADE" })
  cart: Cart;

  @ManyToOne(() => Product, { nullable: false })
  product: Product;

  @Column({ nullable: false })
  quantity: number;

  @Column({ nullable: false })
  total_price: number;
}
