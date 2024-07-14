import apiService from "../config/apiService";
import axiosInstance from "../config/axios";

class HandleUsers {
    get() {
        return axiosInstance.get(`${apiService.users}`)
    }
    remove(id: string | number) {
        return axiosInstance.delete(`${apiService.users}/${id}`)
    }
}

export default new HandleUsers();