import axios from "axios";

const axiosInstance = axios.create();

axiosInstance.interceptors.request.use((request) => {
    const token = localStorage.getItem("accessToken");
    if (token) request.headers.Authorization = `Bearer ${token}`;
    return request;
})

export default axiosInstance;