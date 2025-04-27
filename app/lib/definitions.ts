export interface ProductDataTypes {
  id: number;
  title: string;
  thumbnail: string;
  price: number;
  discountPercentage: number;
  rating?: number;
  brand?: string;
  reviews?: {
    rating: number;
    comment: string;
    date: string;
    reviewerName: string;
    reviewerEmail: string;
  }[];
  images?: string[];
  category: string;
  description?: string;
  warrantyInformation?: string;
  shippingInformation?: string;
  returnPolicy?: string;
}

// Represents the JWT token for auth
export type AuthTokens = {
  accessToken: string;
  refreshToken: string;
};

export type UserAccount = {
  id: string;
  name: string;
  username: string;
  email: string;
  password?: string;
  address: string;
  role?: string;
};

export interface CartItem {
  id?: string;
  userId?: string;
  productId: number;
  name: string;
  price: number;
  discount: number;
  thumbnail: string;
  quantity: number;
  date: string;
};
