import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, ManyToOne } from "typeorm";
import { Product } from "./Product";

@Entity()
export class Cart {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  user_id: number;
  
  @Column({ nullable: false, default: 0 })
  total_price: number;

  @ManyToMany(() => Product, { nullable: false })
  @JoinTable()
  products: Product[];
}
