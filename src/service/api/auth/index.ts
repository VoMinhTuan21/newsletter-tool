import { AuthResponse, Login } from "@/model/auth";
import axiosInstance from "@/service/api/axios/axiosInstance";

export const authAPI = {
  login: (data: Login) => {
    return axiosInstance.post<AuthResponse>("api/v3/account/login", data);
  },
  refreshToken: (token: string) => {
    return axiosInstance.post<AuthResponse>("api/v3/account/refreshtoken", {token});
  }
}