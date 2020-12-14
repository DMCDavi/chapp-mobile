import axios from "axios";
// import { getToken } from '../utils/storage'

// To make it safier we need to put this string in .env archive
const url = "https://stark-wildwood-30574.herokuapp.com";

const api = axios.create({
  baseURL: url,
//   withCredentials: true,
});

// api.interceptors.request.use(async (config) => {
//   const token = getToken();
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

export default api;
