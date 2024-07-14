const urlBase = "http://localhost:5000";

const apiService = {
    auth: `${urlBase}/api/v1/auths`,
    users: `${urlBase}/api/v1/users`,
    patients: `${urlBase}/api/v1/patients`
}

export default apiService;