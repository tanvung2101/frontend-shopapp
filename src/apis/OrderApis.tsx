import { Product } from "../interface/product.interface";
import axiosInstance from "./axios";

const orderApis = {
  getOrders(): Promise<{
    "message": string,
    "data": [
        {
            "id": number,
            "user_id": number,
            "status": number,
            "note": string,
            "phone": string,
            "address": string,
            "total": number,
            "session_id": string,
            "created_at": string,
            "updated_at": string,
            "order_details": [
                {
                    "id": number,
                    "order_id": number,
                    "product_id": number,
                    "price": number,
                    "quantity": number,
                    "created_at": string,
                    "updated_at": string,
                    "product": Product
                }
            ]
        }
    ],
    "current_page": number,
    "total_pages": number,
    "total": number
}> {
    return axiosInstance.get(`orders`);
  },
};
// `products?page=${payload.page}&category=${payload.category}&price_max=${payload.price_max}&price_min=${payload.price_min}`;
export default orderApis;
