import { CBT_GENIE_COOKIE_KEY } from "@/constants/auth";
import axios from "axios";
import Cookies from "universal-cookie";

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;
const isServer = typeof window === "undefined";

const httpClient = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

httpClient.interceptors.request.use(async (config) => {
  let token;
  if (isServer) {
    const { cookies } = await import("next/headers");

    const cookieStore = await cookies();
    token = cookieStore.get(CBT_GENIE_COOKIE_KEY)?.value || "";
    config.headers["Authorization"] = token;
  } else {
    const cookies = new Cookies();
    const token =
      cookies.get(CBT_GENIE_COOKIE_KEY) ||
      localStorage.getItem(CBT_GENIE_COOKIE_KEY) ||
      "";

    config.headers["Authorization"] = token;
  }

  return config;
});

// httpClient.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;
//     if (error.response.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;
//       const refreshToken = localStorage.getItem(CBT_GENIE_COOKIE_KEY);
//       try {
//         const { data } = await httpClient.post("/auth/me", {
//           token: refreshToken,
//         });

//         localStorage.setItem(CBT_GENIE_COOKIE_KEY, data.accessToken);
//         httpClient.defaults.headers.common[
//           "Authorization"
//         ] = `${data.accessToken}`;
//         return httpClient(originalRequest);
//       } catch (err) {
//         // Handle token refresh error (e.g., redirect to login)
//       }
//     }
//     return Promise.reject(error);
//   }
// );

export default httpClient;
