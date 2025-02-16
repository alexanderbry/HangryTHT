export interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
}

export interface Order {
  id: number;
  user_id: number;
  promotion?: string;
  discount_applied?: number;
  final_price: number;
  products: Product[];
}

export interface Cart {
  id: number;
  user_id: number;
  total_price: number;
  products: Product[];
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

export interface Promotion {
  id: number;
  name: string;
  type: string;
  discount: number;
  max_discount: number;
  min_order: number;
  start_date: string;
  end_date: string;
  max_usage: number;
  user_type: string;
}

export interface PromotionResponse {
  status: number;
  message: string | null;
  data: Promotion[];
}
