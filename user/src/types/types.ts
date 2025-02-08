export interface IUser {
  id: number;
  email: string;
  password: string;
  fullName: string;
  user_type: UserType;
  city: ICities;
}

export interface ICities {
  id: number;
  name: string;
}

export enum UserType {
  NEW = "new",
  LOYAL = "loyal",
}
