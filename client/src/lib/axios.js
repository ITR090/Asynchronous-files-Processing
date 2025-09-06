import axios from "axios";

// in production, there's no localhost so we have to make this dynamic.
// docker port is 5000
// localhost port is 5000
const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:5000/api" : "/api";
console.log("Base URL:", BASE_URL);

const api = axios.create({
  baseURL: BASE_URL,
});

export default api;