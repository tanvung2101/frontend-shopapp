import { Categories } from "../interface/category.interface";
import axiosInstance from "./axios";

const categoryApi = {
  getCategory(): Promise<Categories> {
    return axiosInstance.get(`categories`);
  },
};

export default categoryApi;
