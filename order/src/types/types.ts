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