import { ProductListConfig, Products } from "../interface/product.interface";
import axiosInstance from "./axios";

const productApi = {
  getProduct(payload: ProductListConfig): Promise<Products> {
    return axiosInstance.get(
      `products`, {
        params: payload
      }
    );
  },
};
// `products?page=${payload.page}&category=${payload.category}&price_max=${payload.price_max}&price_min=${payload.price_min}`;
export default productApi;
