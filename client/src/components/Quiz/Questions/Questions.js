import { useEffect, useState, useContext } from 'react';

import apiServises from '../../../sevices/api/apiServises';
// import triviaServices from '../../../sevices/trivia/triviaServices';
import AppContext from '../../AppContext';

import Qlist from '../Qlist';

import './Questions.css'

const Questions = ({props, category }) => {

    const appContext = useContext(AppContext);
    const url = props.location.pathname;
    const inLocal = !url.includes('external');
    let [catQuestions, setCatQuestions] = useState([]);
    let [score, setScore] = useState(0);
    category = category.toLowerCase();

    useEffect(() => {
        if(inLocal) {
            apiServises.getCategory(category)
            .then(questions => {
                setCatQuestions(questions);
            })
            .catch(err => console.log(err));
        } else {
            setCatQuestions(appContext.trivia);
        }
    }, [category, url, appContext.trivia]);

    const handleItemClick = (event, question, correctAnswer, selected) => {
        event.preventDefault();
        console.log(selected === correctAnswer);
        if (selected === correctAnswer) {
            setScore((oldState) => oldState + 1);
        }
        setCatQuestions((oldQuestions) => oldQuestions.slice(1));

    }
    // console.log(score);
    // console.log(catQuestions);

    if (catQuestions.length === 0) {
        return (
            <>
                <h1>Your score is: {score}</h1>
                {inLocal ? <h3 className="reload" onClick={() => window.location.reload()}>Try again?</h3> : ''}
            </>
        )
    }
    const q = catQuestions[0];
    return (
        <div className="questions">
            <ul className="question-list">
                {/* {catQuestions.map(q => ( */}
                <Qlist
                    key={q._id}
                    question={q.question}
                    incAnswers={q.incorrect_answers}
                    answer={q.correct_answer}
                    onClick={handleItemClick}
                />
                {/*))}*/}
            </ul>
        </div>
    );
}

export default Questions;