import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinTable } from 'typeorm';
import { City } from './City';
import { UserType } from '../types/types';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, unique: true })
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: false })
  fullName: string;

  @Column({ type: 'enum', enum: UserType })
  user_type: UserType;

  @ManyToOne(() => City, (city) => city.users, { onDelete: "CASCADE" })
  city: City;
}
