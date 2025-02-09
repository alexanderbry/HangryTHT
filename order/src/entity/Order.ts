import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable } from "typeorm";
import { Cart } from "./Cart";

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  user_id: number;
  
  @Column({ nullable: true })
  promotion: string;
  
  @Column({ nullable: true })
  discount_applied: number;
  
  @Column({ nullable: false })
  final_price: number;

  @ManyToOne(() => Cart, { nullable: false })
  cart: Cart;
}
