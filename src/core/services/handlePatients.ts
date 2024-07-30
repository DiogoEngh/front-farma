import apiService from "../config/apiService";
import axiosInstance from "../config/axios";

class HandlePatients {
    get() {
        return axiosInstance.get(`${apiService.patients}`)
    }
    add(body: any) {
        return axiosInstance.post(`${apiService.patients}`, body)
    }
    remove(id: string | number) {
        return axiosInstance.delete(`${apiService.patients}/${id}`)
    }
}

export default new HandlePatients();