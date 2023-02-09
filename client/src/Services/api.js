import axios from "axios";
import { removeToken, getToken } from "../Utils/utils";

const instance = axios.create({
  withCredentials: true,
  responseType: "json",
  headers: {
    "Content-Type": "application/json",
  },
  baseURL: "http://localhost:3001/api/",
});

instance.interceptors.response.use(
    response => {
      return response;
    },  (error) => {
      if (error.response.status === 401) {
        removeToken();
      } else {
        return Promise.reject(error.response);
      }
    }
);

instance.interceptors.request.use(function (config) {
    const token = getToken();
    if (token) {
        config.headers['Authorization'] = token;
    }
    return config;
}, function (error) {
    return Promise.reject(error);
});

export default instance;
