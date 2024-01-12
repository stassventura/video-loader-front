import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL!,
  timeout: 15000,
  headers: { "X-Custom-Header": "foobar" },
});

export default api;
