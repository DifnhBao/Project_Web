import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:5000/",
  withCredentials: true,
  timeout: 5000,
});

export default axiosClient;
