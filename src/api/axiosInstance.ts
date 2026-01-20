import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios";
import { toast } from "sonner";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// 1. REQUEST INTERCEPTOR
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("token");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 2. RESPONSE INTERCEPTOR
api.interceptors.response.use(
  (response) => response.data,
  (error: AxiosError) => {
    const status = error.response?.status;
    // Extracting message for dynamic feedback
    const serverMessage = (error.response?.data as { message?: string })?.message;
    const fallbackMessage = "An unexpected error occurred";
    const displayMessage = serverMessage || fallbackMessage;

    switch (status) {
      case 401:
        localStorage.removeItem("token");
        toast.error(serverMessage || "Session expired. Please log in again.");
        // Use replace to avoid back-button loops
        window.location.replace("/login");
        break;
      
      case 403:
        toast.error(displayMessage || "Access denied.");
        break;

      case 500:
        toast.error("Critical Server Error. Support has been alerted.");
        break;

      default:
        if (!status) {
          toast.error("Network connection lost. Retrying...");
        } else {
          toast.error(displayMessage);
        }
    }

    return Promise.reject(error);
  }
);

export default api;