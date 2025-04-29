// import { storage } from "@/utils/storage";
import axios from "axios";
import { storage } from "../utils/storage";
import { jwtDecode } from "jwt-decode";
import dayjs from "dayjs";

const axiosInstance = axios.create({
  baseURL: "http://13.213.103.160/api/",
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
let ac_token = storage.getToken() || "";

axiosInstance.interceptors.request.use(
  async (config) => {
    if (!ac_token) ac_token = storage.getToken() || '';

    if (ac_token) {
      config.headers.set('Authorization', `Bearer ${ac_token}`);

      try {
        const user: { exp: number; sub: string; iat: number } = jwtDecode(ac_token);

        const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

        if (!isExpired) return config;
      } catch (error) {
        console.error('Invalid token:', error);
        // Token decode lỗi -> xuống dưới refresh
      }
    }

    try {
      const { data } = await axios.get<AuthResponse>(`users/refresh-token`, { withCredentials: true });

      if (data?.access_token) {
        storage.setToken(data.access_token);
        ac_token = data.access_token;
        config.headers.set('Authorization', `Bearer ${data.access_token}`);
      } else {
        // console.error('Refresh token failed: no access token');
        storage.clearToken;
        ac_token = '';
      }
    } catch (error) {
      return Promise.reject(error);
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
