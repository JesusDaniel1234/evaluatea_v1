import axios from "axios";

export const api = axios.create({
  baseURL: "http://192.168.45.118:8000/api/",
});
