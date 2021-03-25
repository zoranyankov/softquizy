import api from './api';
import request, { getToken } from '../../config/config';

// const token = getToken();
// console.log(token);

const create = (data) => {
    const token = getToken();
    return request(api.createQuestion, "POST", data, { 'x-access-token': token })
}

const getAllQuestions = () => {
    const token = getToken();
    return request(api.getAllQuestions, "GET", '', { 'x-access-token': token });
    // return request...
}

const getCategories = () => {
    const token = getToken();
    return request(api.getCategories, "GET", '', { 'x-access-token': token });
    // return request...
}

const getCategory = (category) => {
    const token = getToken();
    return request(`${api.getCategory}/${category}`, "GET", '', { 'x-access-token': token });
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

const apiQuestionServices = {
    create,
    getAllQuestions,
    getOne,
    editOne,
    deleteOne,
    getCategories,
    getCategory,
}

export default apiQuestionServices;