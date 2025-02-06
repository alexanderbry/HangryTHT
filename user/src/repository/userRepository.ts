import { AppDataSource } from "../data-source";
import { User } from "../entity/User";
import { Repository } from "typeorm";

const userRepository: Repository<User> = AppDataSource.getRepository(User);

export async function createUser(data: any): Promise<any> {
  try {
    const newUser = userRepository.create(data);
    const savedUser = await userRepository.save(newUser);

    return savedUser
  } catch (error) {
    return error;
  }
}

export async function findByEmail(email: string): Promise<User | null> {
  try {
    const user = await userRepository.findOne({ where: { email } });

    return user;
  } catch (error) {
    return error;
  }
}
