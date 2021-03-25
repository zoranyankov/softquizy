import { API_QUESTION_URL } from '../../config/config';

const api = {
    createQuestion: `${API_QUESTION_URL}/create`,
    getAllQuestions: `${API_QUESTION_URL}/`,
    getCategories: `${API_QUESTION_URL}/categories`,
    getCategory: `${API_QUESTION_URL}/category`,
}

export default api;