import { LoginData, LoginResponse, Profile, RegisterData, RegisterResponse } from "../interface/auth.interface";
import axiosInstance from "./axios";

export type UpdateUser = Omit<Profile, "id" | "role"| "email">;

const requestConfig = {
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
};

const accountApis = {
  login(payload: LoginData): Promise<LoginResponse> {
    return axiosInstance.post("users/login", payload,requestConfig);
  },
  register(payload: RegisterData): Promise<RegisterResponse> {
    return axiosInstance.post("users/register", payload, requestConfig);
  },
  forgot_password(payload: { email: string }): Promise<{ email: string }> {
    return axiosInstance.post("users/forgot-password", payload, requestConfig);
  },
  reset_password(payload: {
    forgot_password_token: string;
    password: string;
  }): Promise<RegisterResponse> {
    return axiosInstance.post("users/rest-password", payload, requestConfig);
  },
  updateUser(payload:UpdateUser, userId: number): Promise<{message: string, data: Profile}> {
    return axiosInstance.put(`users/${userId}`, payload,requestConfig);
  },
  logout():Promise<{message: string}>{
    return axiosInstance.get('users/logout', requestConfig)
  }
};

export default accountApis
