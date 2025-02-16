import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinTable } from "typeorm";
import { CartItem } from "./CartItem";

@Entity()
export class Cart {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  user_id: number;

  @Column({ nullable: false, default: 0 })
  total_price: number;

  @OneToMany(() => CartItem, (cartItem) => cartItem.cart, { cascade: true })
  @JoinTable()
  items: CartItem[];
}
