import axios from "axios";


export const api = axios.create({
  baseURL: "https://web-production-ec79f.up.railway.app/api/",
});

// export const api = axios.create({
//   baseURL: "http://192.168.150.118:8000/api/",
// });