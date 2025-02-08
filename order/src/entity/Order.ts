import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable } from "typeorm";
import { Product } from "./Product";

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  user_id: number;
  
  @Column()
  total_price: number;
  
  @Column({ nullable: true })
  promotion: string;
  
  @Column({ nullable: true })
  discount_applied: number;
  
  @Column({ nullable: false })
  final_price: number;

  @ManyToMany(() => Product, { nullable: false })
  @JoinTable()
  products: Product[];
}
