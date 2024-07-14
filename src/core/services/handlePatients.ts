import apiService from "../config/apiService";
import axiosInstance from "../config/axios";

class HandleUsers {
    get() {
        return axiosInstance.get(`${apiService.patients}`)
    }
    add({ username, email }: any) {
        return axiosInstance.post(`${apiService.patients}`, { username, email })
    }
    remove(id: string | number) {
        return axiosInstance.delete(`${apiService.patients}/${id}`)
    }
}

export default new HandleUsers();