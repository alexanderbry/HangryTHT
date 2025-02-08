import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { PromotionType, UserType } from "../types/types";

@Entity()
export class Promotion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, unique: true })
  name: string;

  @Column({ type: "enum", enum: PromotionType })
  type: PromotionType;

  @Column()
  discount: number;

  @Column({ nullable: true })
  max_discount: number;

  @Column()
  min_order: number;

  @Column()
  start_date: Date;

  @Column()
  end_date: Date;

  @Column()
  max_usage: number;

  @Column({ type: "enum", enum: UserType })
  user_type: UserType;
}
