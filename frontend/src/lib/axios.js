import axios from "axios";

// in production, there's no localhost so we have to make this dynamic.
// docker port is 8080
// localhost port is 8080
const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:8080/api" : "/api";
console.log("Base URL:", BASE_URL);

const api = axios.create({
  baseURL: BASE_URL,
});

export default api;