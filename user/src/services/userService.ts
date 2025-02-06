import { hashPassword } from "../helpers/bcrypt";
import { createUser, findByEmail } from "../repository/userRepository";

export class UserService {
  static async register(payload: any): Promise<any> {
    try {
      let { email, password, fullName, user_type, cityId } = payload;

      const isUserExist = await findByEmail(email);
      if (isUserExist) throw { name: "EmailTaken" };

      const hashedPassword = await hashPassword(password);
      const newUser = {
        email,
        password: hashedPassword,
        fullName,
        user_type: "new",
        cityId,
      };

      const data = createUser(newUser);

      return {
        status: 201,
        message: "User registered successfully",
        data: data,
      };
    } catch (error) {
      return {
        error,
      };
    }
  }
}
