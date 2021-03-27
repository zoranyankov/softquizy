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
}

const getCategories = () => {
    const token = getToken();
    return request(api.getCategories, "GET", '', { 'x-access-token': token });
}

const getCategory = (category) => {
    const token = getToken();
    return request(`${api.getCategory}/${category}`, "GET", '', { 'x-access-token': token });
}

const getByUserId = (userId) => {
    console.log(userId);
    const token = getToken();
    return request(`${api.getQuestions}/${userId}`, "GET", '', { 'x-access-token': token });
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
    getByUserId,
    getOne,
    editOne,
    deleteOne,
    getCategories,
    getCategory,
}

export default apiQuestionServices;