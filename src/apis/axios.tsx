// import { storage } from "@/utils/storage";
import axios from "axios";
import { storage } from "../utils/storage";
import { jwtDecode } from "jwt-decode";
import dayjs from "dayjs";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api/",
  headers: {
    "content-type": "application/json",
  },
  withCredentials: true,
  // paramsSerializer: params => queryString.stringify(params)
});

interface AuthResponse {
  data: {
    id: number;
    email: string;
    name: string;
    role: number;
    avatar: string;
    phone: string;
  };
  access_token: string;
}
let token = storage.getToken() || "";

const refreshAxios = axios.create({
  baseURL: "http://localhost:5000/api/",
  withCredentials: true,
});

const refreshToken = async (): Promise<string> => {
  try {
    const response = await refreshAxios.get<AuthResponse>(
      "users/refresh-token"
    );

    const newToken = response.data.access_token;
    storage.setToken(newToken);
    token = newToken;

    return newToken;
  } catch (error) {
    console.log("Lỗi khi làm mới token:", error);
    storage.clearToken();
    window.location.href = "/login"; // Chuyển hướng về trang login nếu refresh thất bại
    throw error;
  }
};




axiosInstance.interceptors.request.use(
  async (config) => {
    if (!token) token = storage.getToken() || "";

    // Kiểm tra nếu không có token
    if (!token) {
      return config;
    }
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;

      const user = jwtDecode(token) as {
        exp: number;
        sub: string;
        iat: string;
      };

      const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;
      if (!isExpired) return config;

      // console.log("Token hết hạn, gọi API refresh token...");
      // const response: AuthResponse = await axiosInstance.get(
      //   `users/refresh-token`,
      //   {
      //     withCredentials: true,
      //   }
      // );

      const newToken = await refreshToken()
      config.headers.Authorization = `Bearer ${newToken}`;
      return config
    }

    return config;
  },
  (error) => Promise.reject(error)
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
