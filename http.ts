import axios from "axios";
import config from "@/config.json";

console.log("BACKEND URL "+process.env.BACKEND_URL);
export default axios.create(
    {
        baseURL : config.backendUrl,
    }
);