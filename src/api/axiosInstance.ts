import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios";
import { toast } from "sonner";

// --- THE CRITICAL CHANGE IS HERE ---
const api = axios.create({
  // This dynamic check allows the app to work on your laptop AND on Vercel
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000", 
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});
// ------------------------------------

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
    // Return data directly as defined in your architecture
    return response.data;
  },
  (error: AxiosError) => {
    const status = error.response?.status;
    
    // Handle the case where the server is unreachable (Network Error)
    if (!error.response) {
      toast.error("Bridge Connection Failed: MockAPI is unreachable.");
      return Promise.reject(error);
    }

    switch (status) {
      case 401:
        localStorage.removeItem("token");
        toast.error("Identity required. Redirecting...");
        window.location.replace("/login");
        break;
      case 404:
        console.error("The resource does not exist at this endpoint:", error.config?.url);
        break;
      case 500:
        toast.error("Cloud server error. Check MockAPI status.");
        break;
      default:
        toast.error("Operational error occurred.");
    }

    return Promise.reject(error);
  }
);

export default api;