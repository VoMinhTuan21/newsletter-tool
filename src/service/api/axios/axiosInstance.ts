import { cookieUtils } from '@/utils/cookie';
import axios from 'axios';

var mainURL = process.env.ThirdPartyAPI;

const axiosInstance = axios.create({
  baseURL: mainURL ?? 'https://dummyjson.com',
  timeout: 1000,
  headers: { 'Content-Type': 'application/json' }
});

axiosInstance.interceptors.request.use(
  function (config) {
    
    const token = cookieUtils.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;

    if (error.response && error.response.status === 401) {
      originalRequest._retry = true;
      var token = cookieUtils.getToken();
      if (token) {
        const response = await axios.post(`${mainURL}/api/v3/account/refreshtoken`, {token});
        const originalContentType = originalRequest.headers['Content-Type'];

        if (response.data?.token) {
          const originalContentType = originalRequest.headers['Content-Type'];
          originalRequest.headers.Authorization = 'Bearer ' + response.data.token;
          cookieUtils.setToken(response.data.token);
        }

        if (originalContentType) {
          originalRequest.headers['Content-Type'] = originalContentType;
        }
        return axiosInstance(originalRequest);
      }


      return Promise.reject(error);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;