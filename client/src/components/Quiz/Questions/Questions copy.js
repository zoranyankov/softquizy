import { useEffect, useState, useContext } from 'react';

import apiQuestionServices from '../../../sevices/api/apiQuestionServices';
// import triviaServices from '../../../sevices/trivia/triviaServices';
import AppContext from '../../AppContext';
import { htmlDecode } from '../../../sevices/trivia/htmlHelper';

import Qlist from '../Qlist';

import './Questions.css'

const Questions = ({ props, category }) => {

    const appContext = useContext(AppContext);
    const url = props.location.pathname;
    const inLocal = !url.includes('external');
    let [catQuestions, setCatQuestions] = useState([]);
    let [score, setScore] = useState(0);
    let [userAnswers, setUserAnswers] = useState([]);
    category = category.toLowerCase();

    useEffect(() => {
        if (inLocal) {
            apiQuestionServices.getCategory(category)
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
        return (
            <div>
                <h1>Your score is: {score}</h1>
                {inLocal ? <h3 className="reload" onClick={() => window.location.reload()}>Try again?</h3> : ''}
                <div className="quiz-results">
                    {userAnswers.map(({ question, selected, correctAnswer, isCorrect, status, id }, i) => (
                        <div className="answer-result" key={id}>
                            {/* <p>{question}</p> 
                        <p>{selected}</p> 
                        <p>{i}</p> 
                        <p>{correctAnswer}</p> 
                        <p>{status}</p>  */}
                            <h3>Question {i + 1}: {question} : </h3>
                            <h4>Your answer {selected} is {status} </h4>
                            <h5>{status === 'correct' ? 'Well done!' : `correct answer is ${correctAnswer} ;(`}</h5>
                            {status === 'correct'
                                ? `you answered ${status} with "${selected}"`
                                : `your answer ${selected} is ${status} - correct answer is ${correctAnswer}`}
                            {/* // <div className="answer-result" key="id">
                        // <h3>Question {i}: {question} : </h3>
                        // <h4>Your answer {selected} is {status} </h2>
                        // <h5>{status === 'correct' ? 'Well done!' : `correct answer is ${correctAnswer} ;(`}</h3>
                        // </div>
                        // {status === 'correct' 
                        // ? `you answered ${status} with "${selected}"`
                        // : `your answer ${selected} is ${wrong} - correct answer is ${correct answer}</h3> */}
                            {/* ))} */}
                        </div>
                    ))}
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