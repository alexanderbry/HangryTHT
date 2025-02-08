export interface IPromotion {
  id: string;
  name: string;
  type: PromotionType;
  discount: number;
  max_discount?: number | null;
  min_order: number;
  start_date: Date;
  end_date: Date;
  max_usage: number;
}

export interface UserResponse {
  status?: number;
  message?: string | null;
  data?: {
    id: number;
    email: string;
    password: string;
    fullName: string;
    user_type: string;
  };
}

export enum PromotionType {
  PERCENTAGE = "percentage",
  FIXED = "fixed",
}

export enum UserType {
  NEW = "new",
  LOYAL = "loyal",
}