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
    }

}

export default ApiService;