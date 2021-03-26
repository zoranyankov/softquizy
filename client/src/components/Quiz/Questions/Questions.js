import { useEffect, useState } from 'react';

// import apiQuestionServices from '../../../sevices/api/apiQuestionServices';
import apiResultServices from '../../../sevices/api/apiResultServices';
// import triviaServices from '../../../sevices/trivia/triviaServices';
// import AppContext from '../../AppContext';
import { htmlDecode } from '../../../sevices/trivia/htmlHelper';

import Qlist from '../Qlist';
import BasicTable from '../Resulttable';

import './Questions.css'

const Questions = ({ props, quizName, questions, inLocal }) => {

    
    let q = null;

    // const appContext = useContext(AppContext);
    // const url = props.location.pathname;
    // const inLocal = !url.includes('external');
    // let [catQuestions, setCatQuestions] = useState([]);
    let [currentQuestion, setCurrentQuestion] = useState(0);
    let [score, setScore] = useState(0);
    let [userAnswers, setUserAnswers] = useState([]);
    let [endOfQuiz, setEndOfQuiz] = useState(false);

    useEffect(() => {
        console.log('userAnswers');
        if (endOfQuiz) {
            console.log('End');
            console.log(userAnswers);
            const userToUpdate = JSON.parse(localStorage.getItem('sid')).user._id;
            console.log(userAnswers)
            apiResultServices.add({ userToUpdate, quizName, userAnswers });
            // setEndOfQuiz(true);
            // questions.length = 0;
            // return (
            // <div>
            //     {/* <h1>Your score is: {score}</h1> */}
            //     <div className="quiz-results">
            //         <BasicTable rows={userAnswers} score={score} quizName={quizName} />
            //         {inLocal ? <h1 className="reload" onClick={() => window.location.reload()}>Try again?</h1> : ''}
            //     </div>
            // </div>
            // )
        }
    }, [userAnswers, questions, quizName, userAnswers, inLocal, score]);

    const handleItemClick = (event, question, correctAnswer, selected, id) => {
        event.preventDefault();
        console.log(currentQuestion);
        const isCorrect = selected === correctAnswer;
        const status = isCorrect ? 'correct' : 'wrong';
        const currResult = { question, selected, correctAnswer, isCorrect, status, id };
        console.log(isCorrect);
        console.log(currResult);
        if (isCorrect) {
            setScore((oldState) => oldState + 1);
        }
        setUserAnswers(oldResult => oldResult.concat(currResult));
        // setCatQuestions((oldQuestions) => oldQuestions.slice(1));
        if (currentQuestion !== questions.length - 1) {
            setCurrentQuestion((previous => previous + 1));
        } else {
            setEndOfQuiz(true);
            questions.length = 0;
        }
    }
    console.log(score);
    // console.log(catQuestions);

    // if (catQuestions.length === 0) {

    //     console.log(userAnswers);
    //     const userToUpdate = JSON.parse(localStorage.getItem('sid')).user._id;
    //     apiResultServices.add({userToUpdate, quizName, userAnswers});
    //     return (
    //         <div>
    //             {/* <h1>Your score is: {score}</h1> */}
    //             <div className="quiz-results">
    //                 <BasicTable rows={userAnswers} score={score} quizName={quizName} />
    //                 {inLocal ? <h1 className="reload" onClick={() => window.location.reload()}>Try again?</h1> : ''}
    //             </div>
    //         </div>
    //     )
    // }

    if (!endOfQuiz && (questions.length === 0)) {
        return null;
    }   

    console.log(questions);
    console.log('Questions render');
    if (questions.length !== 0) {
        q = questions[currentQuestion];
        q.question = htmlDecode(q.question);
        q.answer = htmlDecode(q.answer);
        q.incorrect_answers = q.incorrect_answers.map(htmlDecode);
    }

    return (
        <>
                {q && 
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
                }
                {endOfQuiz &&
                    <div>
                        {/* <h1>Your score is: {score}</h1> */}
                        <div className="quiz-results">
                            <BasicTable rows={userAnswers} score={score} quizName={quizName} />
                            {inLocal ? <h1 className="reload" onClick={() => window.location.reload()}>Try again?</h1> : ''}
                        </div>
                    </div>
                }
        </>

    );
}

export default Questions;