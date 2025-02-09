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
