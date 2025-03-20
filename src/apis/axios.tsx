// import { storage } from "@/utils/storage";
import axios from "axios";


const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api/",
  headers: {
    "content-type": "application/json",
  },
  // paramsSerializer: params => queryString.stringify(params)
});

// const token = '';

axiosInstance.interceptors.request.use(
  (config) => {
    // if (token === undefined) {
    //   config.headers.Authorization = "";
    // } else {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    // console.log('config.headers.Authorization', config.headers)
    return config;
  }
  // Handle token here ...
);

axiosInstance.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  (error) => {
    // Handle errors
    throw error;
  }
);

export default axiosInstance;