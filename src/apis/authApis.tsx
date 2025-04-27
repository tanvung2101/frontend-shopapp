import { LoginData, LoginResponse, Profile, RegisterData, RegisterResponse } from "../interface/auth.interface";
import axiosInstance from "./axios";

export type UpdateUser = Omit<Profile, "id" | "role"| "email">;

const accountApis = {
  login(payload: LoginData): Promise<LoginResponse> {
    return axiosInstance.post("users/login", payload);
  },
  register(payload: RegisterData): Promise<RegisterResponse> {
    return axiosInstance.post("users/register", payload);
  },
  forgot_password(payload: { email: string }): Promise<{ email: string }> {
    return axiosInstance.post("users/forgot-password", payload);
  },
  reset_password(payload: {
    forgot_password_token: string;
    password: string;
  }): Promise<RegisterResponse> {
    return axiosInstance.post("users/rest-password", payload);
  },
  updateUser(payload:UpdateUser, userId: number): Promise<{message: string, data: Profile}> {
    return axiosInstance.put(`users/${userId}`, payload,);
  },
  logout():Promise<{message: string}>{
    return axiosInstance.get('users/logout')
  }
};

export default accountApis
