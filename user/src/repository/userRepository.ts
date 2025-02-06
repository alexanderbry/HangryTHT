import { AppDataSource } from "../data-source";
import { City } from "../entity/City";
import { User } from "../entity/User";
import { Repository } from "typeorm";

const userRepository: Repository<User> = AppDataSource.getRepository(User);
const cityRepository: Repository<City> = AppDataSource.getRepository(City);

export async function createUser(data: any): Promise<any> {
  try {
    const cityId = await cityRepository.findOne({ where: { id: data.cityId } });
    const newUser = userRepository.create({ ...data, city: cityId });
    const savedUser = await userRepository.save(newUser);

    return savedUser;
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
