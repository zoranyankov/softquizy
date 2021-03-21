import { SERVER_API_URL } from '../../config/config';

const api = {
    create: `${SERVER_API_URL}/create`,
    getAll: `${SERVER_API_URL}/`,
    getCategories: `${SERVER_API_URL}/categories`,
    getCategory: `${SERVER_API_URL}/category`,
}

export default api;