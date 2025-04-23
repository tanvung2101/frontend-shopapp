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
    disabled?: boolean;
    checked?: boolean;
}

export interface CartDetails 
  {
    "message": string,
    "data": [
        {
            "id": number,
            "session_id": number,
            "user_id": number,
            "created_at": string,
            "updated_at": string,
            "cart_items": CartItems[]
        }
    ]
}
