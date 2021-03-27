import { API_QUESTION_URL, API_RESULT_URL } from '../../config/config';

const api = {
    createQuestion: `${API_QUESTION_URL}/create`,
    getAllQuestions: `${API_QUESTION_URL}/`,
    getQuestions: `${API_QUESTION_URL}`,
    getCategories: `${API_QUESTION_URL}/categories`,
    getCategory: `${API_QUESTION_URL}/category`,
    addResult : `${API_RESULT_URL}/add`,
    getAllResults: `${API_RESULT_URL}/`,
    getResults: `${API_RESULT_URL}`,
}

export default api;