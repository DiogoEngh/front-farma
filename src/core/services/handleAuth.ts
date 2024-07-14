import apiService from "../config/apiService";
import axiosInstance from "../config/axios";

class HandleAuth {
    auth({ email, password }: any) {
        return axiosInstance.post(`${apiService.auth}/login`, { email, password })
    }
    createUser({ email, username, password }: any) {
        return axiosInstance.post(`${apiService.auth}/register`, { email, username, password })
    }
}

export default new HandleAuth();