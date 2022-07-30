import axios from "axios";

export const http = axios.create({
  baseURL: process.env.API_URI || "http://localhost:5000"
})

http.interceptors.request.use(function (config) {
  const token = localStorage.getItem("tid");
  return {
    ...config,
    ...token ? {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    } : {}
  };
}, function (error) {
  return Promise.reject(error);
});
