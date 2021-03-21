import api from './api';
import request, { getToken } from '../../config/config';

const token = getToken();
// console.log(token);

const create = (data) => {
    return request(api.create, "POST", data, { 'x-access-token': token })
}

const getAll = () => {
    return request(api.getAll, "GET", '', { 'x-access-token': token } );
    // return request...
}

const getCategories = () => {
    return request(api.getCategories, "GET", '', { 'x-access-token': token } );
    // return request...
}

const getCategory = (category) => {
    return request(`${api.getCategory}/${category}`, "GET", '', { 'x-access-token': token } );
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
    getCategories,
    getCategory,
}

export default apiServises;