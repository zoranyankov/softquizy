import { useEffect, useState, useContext } from 'react';
import {Link} from 'react-router-dom';

//Import services
import AppContext from '../../AppContext';
import apiResultServices from '../../../sevices/api/apiResultServices';
import { htmlDecode } from '../../../sevices/trivia/htmlHelper';

//Import components
import QuizHeader from '../QuizHeader';
import Qlist from '../Qlist';
import ResultsTable from '../ResultsTable';
import Toast from '../../Shared/Toast';


//Import local styles
import './Questions.css';

const Questions = ({ props, quizName, questions, inLocal }) => {

    //Get actual state of Token if is authenticated
    const appContext = useContext(AppContext);

    //Set local states
    let q = null;
    let [currentQuestion, setCurrentQuestion] = useState(0);
    let [score, setScore] = useState(0);
    let [userResults, setUserResults] = useState([]);
    let [endOfQuiz, setEndOfQuiz] = useState(false);

    useEffect(() => {
        //If quiz is over - send results to Database
        if (endOfQuiz) {
            const creatorId = appContext.userId;
            console.log(creatorId);
            apiResultServices.add({ creatorId, quizName, userResults, score });
        }
    }, [userResults, quizName, endOfQuiz, score, appContext.userId]);

    const handleItemClick = (event, question, correctAnswer, selected, id) => {
        event.preventDefault();

        //Check if answer is correct
        const isCorrect = selected === correctAnswer;
        const status = isCorrect ? 'correct' : 'wrong';
        const currResult = { question, selected, correctAnswer, isCorrect, status, id };

        //Increase score by correct answer
        if (isCorrect) {
            setScore((oldState) => oldState + 1);
        }

        //Add current result to all answers
        setUserResults(oldResult => oldResult.concat(currResult));


        // Set next question index or the end of quiz
        if (currentQuestion !== questions.length - 1) {
            setCurrentQuestion((previous => previous + 1));
        } else {
            setEndOfQuiz(true);
            questions.length = 0;
        }
    }

    //Initial render
    if (!endOfQuiz && (questions.length === 0)) {
        return (
            <Toast
                toastList={[{ id: "LoadingQuestions", title: "Info", description: "Loading Questions..." }]}
                // position="bottom-right"
                position="middle"
            />
        );
    }

    //Questions charachters decode
    if (questions.length !== 0) {
        if (questions.error) {
            console.log('Error :' + questions.error.name + ' - ' + questions.error.message);
            return (
                <>
            <h1>There is authorisation problems!</h1>
            <h3>Please <Link to='/auth/login'>Login </Link> or <Link to='/auth/register'> Register </Link></h3>
                </>
            );
        }
        q = questions[currentQuestion];
        q.question = htmlDecode(q.question);
        q.answer = htmlDecode(q.answer);
        q.incorrect_answers = q.incorrect_answers.map(htmlDecode);
    }

    return (
        <>

            {q && <QuizHeader quizName={quizName} currentQuestion={currentQuestion} questoinsCount={questions.length} score={score} />}
            {q &&
                <div className="questions">
                    <ul className="question-list">
                        <Qlist
                            key={q._id}
                            id={q._id}
                            question={q.question}
                            incAnswers={q.incorrect_answers}
                            answer={q.correct_answer}
                            onClick={handleItemClick}
                        />
                    </ul>
                </div>
            }
            {endOfQuiz &&
                <div>
                    <h1 className="quiz-results-header">Your result from {quizName} is: {score} Pts</h1>
                    <div className="quiz-results">
                        <ResultsTable rows={userResults} score={score} quizName={quizName} />
                        {inLocal ? <h1 className="reload" onClick={() => window.location.reload()}>Try again?</h1> : ''}
                    </div>
                </div>
            }
        </>

    );
}

export default Questions;