import { TRIVIA_API_URL } from '../../config/config';

const api = {
    getAll: `${TRIVIA_API_URL}`,
    getCategories: `${TRIVIA_API_URL}/categories`,
    getCategory: `${TRIVIA_API_URL}/category`,
}

export default api;