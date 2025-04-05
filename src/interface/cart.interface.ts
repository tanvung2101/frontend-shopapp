import { Product } from "./product.interface";

export interface Cart {
  message: string;
  data: {
    id: number;
    session_id: string;
    user_id: number;
    created_at: string;
    updated_at: string;
  };
}

export interface CartItems {
    id: number;
    cart_id: string;
    product: Product;
    quantity: number;
    created_at: string;
    updated_at: string;
  }