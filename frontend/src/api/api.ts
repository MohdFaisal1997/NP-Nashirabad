import axios from "axios";

const api = axios.create({
  baseURL: "https://np-nashirabad-6.onrender.com/api"
});

export default api;