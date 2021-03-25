import { useEffect, useState, useContext } from 'react';

import apiServises from '../../../sevices/api/apiServises';
import authServices from '../../../sevices/auth/authServices';
// import triviaServices from '../../../sevices/trivia/triviaServices';
import AppContext from '../../AppContext';
import { htmlDecode } from '../../../sevices/trivia/htmlHelper';

import Qlist from '../Qlist';
import BasicTable from '../Resulttable';

import './Questions.css'

const Questions = ({ props, category, quizName }) => {

    const appContext = useContext(AppContext);
    const url = props.location.pathname;
    const inLocal = !url.includes('external');
    let [catQuestions, setCatQuestions] = useState([]);
    let [score, setScore] = useState(0);
    let [userAnswers, setUserAnswers] = useState([]);
    category = category.toLowerCase();

    useEffect(() => {
        if (inLocal) {
            apiServises.getCategory(category)
                .then(questions => {
                    setCatQuestions(questions);
                })
                .catch(err => console.log(err));
        } else {
            setCatQuestions(appContext.trivia);
        }
    }, [category, url, appContext.trivia, inLocal]);

    const handleItemClick = (event, question, correctAnswer, selected, id) => {
        event.preventDefault();
        const isCorrect = selected === correctAnswer;
        const status = isCorrect ? 'correct' : 'wrong';
        const currResult = { question, selected, correctAnswer, isCorrect, status, id };
        console.log(isCorrect);
        console.log(currResult);
        if (isCorrect) {
            setScore((oldState) => oldState + 1);
        }
        setUserAnswers(oldResult => oldResult.concat(currResult));
        setCatQuestions((oldQuestions) => oldQuestions.slice(1));
    }
    // console.log(score);
    // console.log(catQuestions);

    if (catQuestions.length === 0) {
        
        console.log(userAnswers);
        const userToUpdate = JSON.parse(localStorage.getItem('sid')).user._id;
        authServices.updateUserResults(userToUpdate, {[quizName]: userAnswers});
        return (
            <div>
                {/* <h1>Your score is: {score}</h1> */}
                <div className="quiz-results">
                    <BasicTable rows={userAnswers} score={score} quizName={quizName} />
                    {inLocal ? <h1 className="reload" onClick={() => window.location.reload()}>Try again?</h1> : ''}
                </div>
            </div>
        )
    }
    const q = catQuestions[0];
    q.question = htmlDecode(q.question);
    q.answer = htmlDecode(q.answer);
    q.incorrect_answers = q.incorrect_answers.map(htmlDecode);

    return (
        <div className="questions">
            <ul className="question-list">
                {/* {catQuestions.map(q => ( */}
                <Qlist
                    key={q._id}
                    id={q._id}
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