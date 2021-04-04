import triviaApi from './triviaApi';
import request from '../../config/config';


const getAll = ({trivia_category, trivia_difficulty}) => {
    return request(`${triviaApi.getAll}?amount=10&category=${trivia_category}&difficulty=${trivia_difficulty}&type=multiple`, "GET");
}

const getCategories = () => {
    return request(triviaApi.getCategories, "GET");
}

const getCategory = (category) => {
    return request(`${triviaApi.getCategory}/${category}`, "GET");
}

const triviaApiServises = {
    getAll,
    getCategories,
    getCategory,
}

export default triviaApiServises;