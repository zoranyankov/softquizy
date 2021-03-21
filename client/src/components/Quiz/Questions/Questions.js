import { useEffect, useState } from 'react';

import apiServises from '../../../sevices/api/apiServises';

import Qlist from '../Qlist';

import './Questions.css'

const Questions = ({ category }) => {
    let [catQuestions, setCatQuestions] = useState([]);
    category = category.toLowerCase();
    
    useEffect(() => {
        apiServises.getCategory(category)
        .then(questions => {
            console.log(questions)
            setCatQuestions(questions)
        })
        .catch(err => console.log(err));
    }, [category]);

    console.log(catQuestions);
    return (
        <div className="questions">
            <ul className="question-list">
                {catQuestions.map(q => (
                    <Qlist key={q._id} question={q.question} incAnswers={q.incorrect_answers} answer={q.correct_answer} />
                ))}
            </ul>
        </div>
    );
}

export default Questions;