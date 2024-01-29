import axios from "axios";
import { getNewTokens } from "services/token";
import { setCookie, getCookie } from "utils/cookie";

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request
api.interceptors.request.use(
  (req) => {
    const accessToken = getCookie("accessToken");

    if (accessToken) {
      req.headers.Authorization = `Bearer ${accessToken}`;
    }

    return req;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response
api.interceptors.response.use(
  (res) => {
    return res;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401) {
      const res = await getNewTokens();
      if (!res?.response) return;
      setCookie(res.response.data);
      return api(originalRequest);
    } else {
      return Promise.reject(error);
    }
  }
);

export default api;
