import triviaApi from './triviaApi';
import request from '../../config/config';

// const token = getToken();
// console.log(token);

const getAll = ({trivia_category, trivia_difficulty}) => {
    console.log(trivia_category, trivia_difficulty);
    return request(`${triviaApi.getAll}?amount=10&category=${trivia_category}&difficulty=${trivia_difficulty}`, "GET");
}

const getCategories = () => {
    return request(triviaApi.getCategories, "GET");
}

const getCategory = (category) => {
    return request(`${triviaApi.getCategory}/${category}`, "GET");
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

const triviaApiServises = {
    getAll,
    getOne,
    editOne,
    deleteOne,
    getCategories,
    getCategory,
}

export default triviaApiServises;