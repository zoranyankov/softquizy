import { API_QUESTION_URL, API_RESULT_URL } from '../../config/config';

const api = {
    //Questions Endpoints
    createQuestion: `${API_QUESTION_URL}/create`,
    getAllQuestions: `${API_QUESTION_URL}/`,
    getQuestion: `${API_QUESTION_URL}`,
    editQuestion: `${API_QUESTION_URL}/edit`,
    deleteQuestion: `${API_QUESTION_URL}/delete`,
    getQuestionsByUser: `${API_QUESTION_URL}/byUser`,
    getCategories: `${API_QUESTION_URL}/categories`,
    getCategory: `${API_QUESTION_URL}/category`,
    
    //Results Endpoints
    addResult : `${API_RESULT_URL}/add`,
    getAllResults: `${API_RESULT_URL}/`,
    getResults: `${API_RESULT_URL}`,
}

export default api;