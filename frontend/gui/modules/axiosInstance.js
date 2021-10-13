//this is base axios
import { useHistory } from "react-router-dom";

import axios from "axios";

const baseURL = "http://127.0.0.1:8000/";

const axiosInstance = axios.create({
  baseURL: baseURL,
  //timeout: 10000,
});

axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers["Authorization"] = "JWT " + token;
      config.headers["Content-Type"] = "application/json";
      config.headers["accept"] = "application/json";
    }
    // config.headers['Content-Type'] = 'application/json';
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  function (error) {
    const originalRequest = error.config;

    if (
      (error.response.status === 401 || error.response.status === 400) &&
      originalRequest.url === `http://127.0.0.1:8000/api/token/refresh/`
    ) {
      //clear app data from local storage
      localStorage.setItem("access_token", "");
      localStorage.setItem("refresh_token", "");
      localStorage.setItem("IsManagerfrontOnline", false);
      window.location = "/signin";
      return Promise.reject(error);
    }

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem("refresh_token");

      return axiosInstance
        .post(`http://127.0.0.1:8000/api/token/refresh/`, {
          refresh: refreshToken,
        })
        .then((res) => {
          if (res.status === 200) {
            localStorage.setItem("access_token", res.data.access);
            localStorage.setItem("refresh_token", res.data.refresh);
            axiosInstance.defaults.headers.common[
              "Authorization"
            ] = localStorage.getItem("access_token")
              ? "JWT " + localStorage.getItem("access_token")
              : null;

            return axiosInstance(originalRequest);
          }
        });
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
