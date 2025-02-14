import axios from "axios";
import { API_ENDPOINTS } from "../constants/endpoints";

const client = axios.create({
  baseURL: API_ENDPOINTS.baseUrl,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export default client;
