import { Profile } from "../interface/auth.interface";
import { Cart } from "../interface/cart.interface";

export const storage = {
  getToken: () => localStorage.getItem("access_token"),
  setToken: (token: string) => localStorage.setItem("access_token", token),
  clearToken: () => localStorage.removeItem("access_token"),
  getInfo: () => localStorage.getItem("info"),
  setInfo: (info: Profile) =>
    localStorage.setItem("info", JSON.stringify(info)),
  clearInfo: () => localStorage.removeItem("info"),
};

export const getFromLocalStorage = (key: string): Cart | null => {
  const value = localStorage.getItem(key);
  return value ? JSON.parse(value) : null;
};
export const saveToLocalStorage = (key: string, value: Cart) => {
  localStorage.setItem(key, JSON.stringify(value));
};
