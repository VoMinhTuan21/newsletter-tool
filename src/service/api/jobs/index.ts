import { Job } from "@/model/auth";
import axiosInstance from "@/service/api/axios/axiosInstance"

export const jobAPI = {
  getDetail: (id: number) => {
    return axiosInstance.get<Job>(`/api/v3/job/detail/${id}`);
  }
}