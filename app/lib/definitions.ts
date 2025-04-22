export interface ProductDataTypes {
  id: number;
  title: string;
  thumbnail?: string;
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

export interface ProductsOnCartTypes {
  id?: number;
  products: {
    id: number;
    title: string;
    price: number;
    quantity: number;
    total: number;
    discountPercentage: number;
    discountedTotal: number;
    thumbnail: string;
  }[];
  total: number;
  discountedTotal: number;
  totalProducts: number;
  totalQuantity: number;
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
  password: string;
  address: string;
  role: string;
};
