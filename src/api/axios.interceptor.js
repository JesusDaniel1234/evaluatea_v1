import axios from "axios";
import * as SecureStore from "expo-secure-store";

export const api = axios.create({
  baseURL: "http://192.168.0.118:8000/api/",
});

// let isRefreshing = false;
// // Axios response interceptor
// api.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const {
//       response: { status, statusText, data },
//     } = error;
//     const refreshToken = await SecureStore.getItemAsync("refresh_token");
//     const errorUserNotFound =
//       "No active account found with the given credentials";

//     if (status === 401 && refreshToken) {
//       if (!isRefreshing) {
//         isRefreshing = true;
//         try {
//           const response = await api.post(
//             "token/refresh/",
//             { refresh: refreshToken },
//             {
//               headers: { "Content-Type": "application/json" },
//             }
//           );

//           if (response.status === 200) {
//             const { access, refresh } = response.data;
//             axios.defaults.headers.common["Authorization"] = `Bearer ${access}`;
//             await SecureStore.setItemAsync("token", access);
//             await SecureStore.setItemAsync("refresh_token", refresh);

//             // Retry the original request with the new token
//             return api(error.config);
//           }
//         } catch (err) {
//           // Handle token refresh failure
//           await SecureStore.deleteItemAsync("token");
//           await SecureStore.deleteItemAsync("refresh_token");
//           Alert.alert("Session Expired", "You need to log in again.");
//           // Redirect user to login screen (replace 'LoginScreen' with your navigation route)
//           return Promise.reject(err);
//         } finally {
//           isRefreshing = false;
//         }
//       }
//     } else if (
//       status === 401 &&
//       statusText === "Unauthorized" &&
//       data.detail !== errorUserNotFound
//     ) {
//       // Clear storage and show alert if unauthorized due to other reasons
//       await SecureStore.deleteItemAsync("token");
//       await SecureStore.deleteItemAsync("refresh_token");
//       Alert.alert("Unauthorized", "Session has expired, please login again.");
//     }

//     return Promise.reject(error);
//   }
// );
