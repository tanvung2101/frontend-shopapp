import axios from "axios";
import { storage } from "../utils/storage";
import { jwtDecode } from "jwt-decode";
import dayjs from "dayjs";

const BASE_URL = "https://shopapp-online.site/api/";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Instance riêng cho gọi refresh-token (không có interceptor)
const rawAxios = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
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

// Interceptor cho request
axiosInstance.interceptors.request.use(
  async (config) => {
    let accessToken = storage.getToken();

    if (accessToken) {
      try {
        const user: { exp: number; sub: string; iat: number } = jwtDecode(accessToken);
        const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

        if (!isExpired) {
          config.headers.set("Authorization", `Bearer ${accessToken}`);
          return config;
        }
      } catch (error) {
        console.warn("Token decode failed:", error);
        // Nếu lỗi thì sẽ tiếp tục xuống phần gọi refresh
      }
    }

    // Nếu token hết hạn hoặc chưa có -> gọi refresh
    try {
      const { data } = await rawAxios.get<AuthResponse>("users/refresh-token");

      if (data?.access_token) {
        storage.setToken(data.access_token);
        config.headers.set("Authorization", `Bearer ${data.access_token}`);
      } else {
        storage.clearToken();
      }
    } catch (err) {
      console.error("Refresh token failed:", err);
      storage.clearToken();
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor cho response
axiosInstance.interceptors.response.use(
  (response) => response.data,
  (error) => {
    // Xử lý lỗi toàn cục nếu cần (ví dụ: thông báo lỗi, logout...)
    return Promise.reject(error);
  }
);

export default axiosInstance;
