import axios, { type AxiosRequestConfig } from "axios";

const PUBLIC_ENDPOINTS = ["auth", "products"];

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

let refreshPromise: Promise<null> | null = null;

axiosInstance.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    const isPublic = PUBLIC_ENDPOINTS.some(path => originalRequest.url.includes(path));

    if (isPublic || error.response?.status !== 401 || originalRequest._retry) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    if (!refreshPromise) {
      refreshPromise = axios.post(
        "/api/mock/auth/refresh",
        {},
        {
          withCredentials: true,
        },
      );
    }

    try {
      await refreshPromise;
      return axiosInstance(originalRequest);
    } catch {
      axios.post("/api/mock/auth/logout").catch(console.error);
      window.location.href = "/login";
      return Promise.reject("Session expired! Please login again.");
    } finally {
      refreshPromise = null;
    }
  },
);

export function getAxiosInstance<T>(config: AxiosRequestConfig) {
  return axiosInstance.request<T>(config);
}
