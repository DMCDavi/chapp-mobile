export const login = (token, id) => {
    localStorage.setItem('CHAPP-TOKEN', token)
    localStorage.setItem('CHAPP-ID', id)
}

export const isLogin = () => {
    if (localStorage.getItem("CHAPP-TOKEN")) {
        return true;
    }
    return false;
}

export const getToken = () => {
    return localStorage.getItem("CHAPP-TOKEN");
}

export const getId = () => {
    return localStorage.getItem("CHAPP-ID");
}