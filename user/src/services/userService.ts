import e from "express";
import { comparePassword, hashPassword } from "../helpers/bcrypt";
import { createToken } from "../helpers/jsonwebtoken";
import { createUser, findByEmail, findById } from "../repository/userRepository";

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
        data: null,
      };
    } catch (error) {
      return {
        error,
      };
    }
  }

  static async login(payload: any): Promise<any> {
    try {
      let { email, password } = payload;

      const isValidUser = await findByEmail(email);
      if (!isValidUser) throw { name: "InvalidEmail/Password" };

      const isValidPassword = await comparePassword(password, isValidUser.password);
      if (!isValidPassword) throw { name: "InvalidEmail/Password" };
      
      const data = {
        id: isValidUser.id,
      }
      
      const token = await createToken(data);

      return {
        status: 200,
        message: "Login success",
        data: token,
      };
    } catch (error) {
      return {
        error,
      };
    }
  }

  static async getUserById(payload: any): Promise<any> {
    try {
      let { id } = payload;

      const user = await findById(id);
      if (!user) throw { name: "Not Found" };

      return {
        status: 200,
        message: null,
        data: user,
      };
    } catch (error) {
      return {
        error,
      };
    }
  }
}
