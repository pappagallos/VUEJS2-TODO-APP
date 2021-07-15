import axios from "axios";
import { setInterceptors } from "@/apis/common/interceptors";

function createInstance() {
    const instance = axios.create({
        baseURL: process.env.VUE_APP_API_BASE_URL,
    });
    return setInterceptors(instance);
}

const instance = createInstance();

export default instance;