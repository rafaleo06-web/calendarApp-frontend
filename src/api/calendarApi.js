import axios from "axios";
import { getEnvVariables } from "../Calendar/helpers/getEnvVariables";

const { VITE_API_URL } = getEnvVariables();

export const calendarApi = axios.create({
  baseURL: VITE_API_URL,
});

calendarApi.interceptors.request.use((config) => {
  config.headers = {
    ...config.headers,
    "x-token": localStorage.getItem("token"),
  };
  return config;
});

// instance
//   .get("/user?ID=12345")
//   .then((response) => {
//     console.log(response.data);
//   })
//   .catch((error) => {
//     console.error(error);
//   });
