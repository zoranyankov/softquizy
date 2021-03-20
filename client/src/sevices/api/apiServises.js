import api from './api';
import request, { getToken } from '../../config/config';

const token = getToken();
// console.log(token);

const create = (data) => {
    return request(api.create, "POST", data, { 'x-access-token': token })
}

const getAll = () => {

    // return request...
}

const getOne = () => {
    // return request...
}

const editOne = () => {
    // return request...
}

const deleteOne = () => {
    // return request...
}

const apiServises = {
    create,
    getAll,
    getOne,
    editOne,
    deleteOne,
}

export default apiServises;