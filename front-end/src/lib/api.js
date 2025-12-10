import axios from "axios";

const API_BASE = (typeof process !== "undefined" && process.env && process.env.REACT_APP_API_URL)
  ? process.env.REACT_APP_API_URL
  : (import.meta.env.VITE_API_URL || "http://localhost:5000");

const instance = axios.create({
  baseURL: API_BASE,
  headers: { "Content-Type": "application/json" },
});

let _token = null;

const setToken = (token) => {
  _token = token;
  if (token) {
    instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete instance.defaults.headers.common["Authorization"];
  }
};

const register = (payload) => instance.post("/api/auth/register", payload).then(r => r.data);
const login = (payload) => instance.post("/api/auth/login", payload).then(r => r.data);

const getUserTasks = () => instance.get("/api/tasks").then(r => r.data);
const getAllTasks = () => instance.get("/api/tasks").then(r => r.data); 

export default { setToken, register, login, getUserTasks, getAllTasks };
