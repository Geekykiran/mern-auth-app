import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5001/api/v1/auth",
  headers: {
    "Content-Type": "application/json",
  },
});


export default instance;
