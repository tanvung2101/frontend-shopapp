import { LoginData, LoginResponse, RegisterData, RegisterResponse } from "../interface/auth.interface";
import axiosInstance from "./axios";

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
};

export default accountApis
