import { useEffect, useState, useContext } from 'react';

import AppContext from '../../AppContext';

import apiQuestionServices from '../../../sevices/api/apiQuestionServices';

// import Quizheader from '../Quizheader';
import Questions from '../Questions';
import Toast from '../../Shared/Toast';


const Quiz = (props) => {
    const appContext = useContext(AppContext);

    const quizName = props.match.params.quizName.toUpperCase();
    const category = props.match.params.category;
    const url = props.location.pathname;
    const inLocal = !url.includes('external');


    let [questions, setQuestions] = useState([]);

    console.log('render Quiz component');
    useEffect(() => {
        console.log('in useEffect of Quiz');
        if (inLocal) {
            apiQuestionServices.getCategory(category)
                .then(apiQuestions => {
                    console.log(apiQuestions);
                    setQuestions(apiQuestions);
                })
                .catch(err => console.log("Quiz component Error:" + err));
        } else {
            setQuestions(appContext.trivia);
        }
    }, [category, url, appContext.trivia, inLocal])

    return (
        <div className="quiz-content">
            {/* <Quizheader quizName={quizName} currentQuestion={} /> */}
            {questions
                ? <Questions props={props} quizName={quizName} questions={questions} inLocal={inLocal} />
                : <Toast
                toastList={[{ id: "LoadingQuizes", title: "Info", description: "Loading Quizes..." }]}
                // position="bottom-right"
                position="middle"
            />
        }
        </div>
    );
}

export default Quiz;