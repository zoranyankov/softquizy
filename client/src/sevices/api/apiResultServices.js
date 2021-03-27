import api from './api';
import request, { getToken } from '../../config/config';

// const token = getToken();
// console.log(token);

const add = (data) => {
    const token = getToken();
    return request(api.addResult, "POST", data, { 'x-access-token': token })
}

const getAll = () => {
    const token = getToken();
    return request(api.getAllResults, "GET", '', { 'x-access-token': token });
    // return request...
}

// const getCategories = () => {
//     const token = getToken();
//     return request(api.getCategories, "GET", '', { 'x-access-token': token });
//     // return request...
// }

// const getCategory = (category) => {
//     const token = getToken();
//     return request(`${api.getCategory}/${category}`, "GET", '', { 'x-access-token': token });
//     // return request...
// }

const getByUserId = (userId) => {
    const token = getToken();
    return request(`${api.getResults}/${userId}`, "GET", '', { 'x-access-token': token });
}

const editOne = () => {
    // return request...
}

const deleteOne = () => {
    // return request...
}

const apiQuestionServices = {
    add,
    getAll,
    getByUserId,
    editOne,
    deleteOne,
    // getCategories,
    // getCategory,
}

export default apiQuestionServices;