import axios from "axios";
import * as SecureStore from "expo-secure-store";

const api = axios.create({
  baseURL: "https://u1opaontij.execute-api.us-east-2.amazonaws.com/dev2",
});

export const setupInterceptors = (key) => {
  console.log("interceptors setup - key: ", key);
  api.interceptors.request.use(
    async (config) => {
      try {
        console.log("Inside try for interceptors");
        const token = await SecureStore.getItemAsync(key); //("__clerk_client_jwt");
        console.log("************* Interceptors - token: ", token);
        if (token) {
          console.log("Interceptors - token2: ", token);
          config.headers.Authorization = `Bearer ${token}`;
        }
      } catch (error) {
        console.error("Error retrieving token from SecureStore:", error);
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
};

export default api;

// import axios from "axios";

// export default axios.create({
//   baseURL: "https://u1opaontij.execute-api.us-east-2.amazonaws.com/dev2",
// });

// import {
//   useSession,
// } from "@clerk/clerk-expo";

// const { session } = useSession();
// console.log("session :", session.accessToken);

// axios.defaults.headers.common[
//   "Authorization"
// ] = `Bearer ${session.accessToken}`;
