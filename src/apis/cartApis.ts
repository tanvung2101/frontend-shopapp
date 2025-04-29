import { Cart } from "../interface/cart.interface";
import { Product } from "../interface/product.interface";
import axiosInstance from "./axios";


export interface cartDetail {
  message: string;
  data: {
    id: number;
    session_id?: number;
    user_id: number;
    created_at: string;
    updated_at: string;
    cart_items: {
      id: number;
      cart_id: string;
      product: Product;
      quantity: number;
      created_at: string;
      updated_at: string;
    }[];
  };
}
const cartApi = {
  createCart(body: { user_id: string }): Promise<Cart> {
    console.log("Dữ liệu gửi lên API:", body);
    return axiosInstance.post(`carts`, body);
  },
  getCarts(): Promise<cartDetail> {
    return axiosInstance.get(`carts`);
  },
  cartItem(body: {
    cart_id: number;
    product_id: number;
    quantity: number;
  }): Promise<{
    message: string;
    data: {
      id: number;
      cart_id: number;
      product_id: number;
      quantity: number;
      created_at: string;
      updated_at: string;
    };
  }> {
    // console.log("Dữ liệu gửi lên API:", body);
    return axiosInstance.post(`cart-items`, body);
  },
  updateCartItem(body: {
    cart_id: number;
    product_id: number;
    quantity: number;
  }): Promise<{
    message: string;
    data: {
      id: number;
      cart_id: number;
      product_id: number;
      quantity: number;
      created_at: string;
      updated_at: string;
    };
  }> {
    // console.log("Dữ liệu gửi lên API:", body);
    return axiosInstance.post(`cart-items/update`, body);
  },
  cartDetail(cart_id: number): Promise<cartDetail> {
    return axiosInstance.get(`carts/${cart_id}`);
  },
  deleteCartItem(id: number): Promise<{message: string}> {
    return axiosInstance.delete(`/cart-items/${id}`);
  },
  buyProduct(body: { cart_id: number, total: number, note?: string, payment: number, bankCode?: string, cart_item_ids: number[] }):Promise<{
    "message": string,
    "data": {
        "id": number,
        "user_id": number,
        "session_id"?: number,
        "status": number,
        "total": number,
        "updated_at": string,
        "created_at": string
    }
}>{
    return axiosInstance.post(`/carts/checkout`, body)
  },
};
export default cartApi;
