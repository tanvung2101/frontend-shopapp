import {ProductDetails, ProductListConfig, Products } from "../interface/product.interface";
import axiosInstance from "./axios";

const orderApis = {
  getOrders(): Promise<Products> {
    return axiosInstance.get(`products`);
  },
  getProductById(
    id: string
  ): Promise<{ message: string; data: ProductDetails }> {
    return axiosInstance.get(`products/${id}`);
  },
};
// `products?page=${payload.page}&category=${payload.category}&price_max=${payload.price_max}&price_min=${payload.price_min}`;
export default orderApis;
