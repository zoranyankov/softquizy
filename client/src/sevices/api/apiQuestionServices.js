import api from './api';
import request, { getToken } from '../../config/config';


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
    const token = getToken();
    return request(`${api.getQuestionsByUser}/${userId}`, "GET", '', { 'x-access-token': token });
}

const getOne = (questionId) => {
    const token = getToken();
    return request(`${api.getQuestion}/${questionId}`, "GET", '', { 'x-access-token': token });
}

const editOne = (questionId, data) => {
    const token = getToken();
    return request(`${api.editQuestion}/${questionId}`, "PATCH", data, { 'x-access-token': token });
}

const deleteOne = (questionId) => {
    const token = getToken();
    return request(`${api.deleteQuestion}/${questionId}`, "DELETE", '', { 'x-access-token': token });
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