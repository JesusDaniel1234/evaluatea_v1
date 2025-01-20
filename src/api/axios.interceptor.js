import axios from "axios";


export const api = axios.create({
  baseURL: "https://web-production-ec79f.up.railway.app/api/",
});
