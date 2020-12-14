import api from './api'

const ApiService = {

    Login: (credential) => {
        return api
            .post("/auth/login", credential)
            .then(res =>
                Promise.resolve(res)
            )
            .catch(err =>
                Promise.reject(err)
            )
    },

    Register: () => {
        return api
            .post("/collaborator")
            .then(res =>
                Promise.resolve(res)
            )
            .catch(err =>
                Promise.reject(err)
            )
    },

    CreateCheckUp: (data) => {
        return api
            .post("/health-check-up", data)
            .then(res =>
                Promise.resolve(res)
            )
            .catch(err =>
                Promise.reject(err)
            )
    }

}

export default ApiService;