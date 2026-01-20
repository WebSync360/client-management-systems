import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios";
import { toast } from "sonner";

const api = axios.create({
  baseURL: "/api", 
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// 1. REQUEST INTERCEPTOR: Auth Injection
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

// 2. RESPONSE INTERCEPTOR: Global Error Orchestration
api.interceptors.response.use(
  (response) => {
    // Standardizing the response structure (returning data directly)
    return response.data;
  },
  (error: AxiosError) => {
    const status = error.response?.status;
    const serverMessage = (error.response?.data as { message?: string })?.message;
    const displayMessage = serverMessage || "An unexpected error occurred";

    if (!error.response) {
      toast.error("Network connection lost. Check your backend server.");
      return Promise.reject(error);
    }

    switch (status) {
      case 401:
        localStorage.removeItem("token");
        toast.error("Session expired. Redirecting...");
        window.location.replace("/login");
        break;
      
      case 403:
        toast.error("Insufficient permissions for this action.");
        break;

      case 404:
        // We handle 404s quietly or with a toast depending on UX preference
        console.error("Resource not found:", error.config?.url);
        break;

      case 500:
        toast.error("Server-side error. Our team has been notified.");
        break;

      default:
        toast.error(displayMessage);
    }

    return Promise.reject(error);
  }
);

export default api;