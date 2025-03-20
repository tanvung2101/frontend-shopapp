import { Profile } from "../interface/auth.interface";

export const storage = {
  getToken: () => localStorage.getItem("access_token"),
  setToken: (token: string) => localStorage.setItem("access_token", token),
  clearToken: () => localStorage.removeItem("access_token"),
  getInfo: () => localStorage.getItem("info"),
  setInfo: (info: Profile) =>
    localStorage.setItem("info", JSON.stringify(info)),
  clearInfo: () => localStorage.removeItem("info"),
};
