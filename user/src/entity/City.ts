import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { User } from './User';

@Entity()
export class City {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({nullable: false, unique: true})
  name: string;

  @OneToMany(() => User, (user) => user.city)
  users: User[];
}
