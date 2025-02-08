import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { City } from './City';

export enum UserType {
    NEW = 'new',
    LOYAL = 'loyal',
  }

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, unique: true })
  email: string;

  @Column({ nullable: false })
  fullName: string;

  @Column({ type: 'enum', enum: UserType })
  user_type: UserType;

  @ManyToOne(() => City, (city) => city.users, { onDelete: "CASCADE" })
  city: City;
}
