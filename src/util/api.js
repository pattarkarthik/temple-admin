import axios from "axios";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "./constants";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

let isRefreshing = false;
let refreshSubscribers = [];

const onTokenRefreshed = (newToken) => {
  refreshSubscribers.forEach((callback) => callback(newToken));
  refreshSubscribers = [];
};

const addRefreshSubscriber = (callback) => {
  refreshSubscribers.push(callback);
};

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve) => {
          addRefreshSubscriber((newToken) => {
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            resolve(api(originalRequest));
          });
        });
      }

      isRefreshing = true;

      try {
        const refreshToken = localStorage.getItem(REFRESH_TOKEN);
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/auth/refresh`,
          { refresh_token: refreshToken }
        );

        const newAccessToken = response.data.access_token;
        localStorage.setItem(ACCESS_TOKEN, newAccessToken);
        api.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${newAccessToken}`;

        onTokenRefreshed(newAccessToken);
        isRefreshing = false;

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        isRefreshing = false;
        localStorage.removeItem(ACCESS_TOKEN);
        localStorage.removeItem(REFRESH_TOKEN);
        window.location.href = "/login"; // Redirect to login on failure
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
