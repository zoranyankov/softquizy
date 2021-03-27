import auth from './auth';
import request from '../../config/config';


const register = (data) => {
    return request(auth.register, "POST", data);
}

const login = (data) => {
    return request(auth.login, "POST", data);
}

const verify = (data) => {
    return request(auth.verify, "POST", data);
}

const updateUserResults = (userId, data) => {
    return request(auth.updateResults, "POST", { userId, data });
}

const authService = {
    register,
    login,
    verify,
    updateUserResults
};

export default authService;