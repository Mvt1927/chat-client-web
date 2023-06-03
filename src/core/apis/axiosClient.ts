import axios from "axios";
import { BASE_URL, TIMEOUT } from "../../utils";

const AXIOS = axios.create({
  baseURL: BASE_URL,
  timeout: TIMEOUT + 4000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default AXIOS;
