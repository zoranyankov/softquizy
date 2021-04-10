import { useEffect, useState, useContext, Fragment } from 'react';

//Import global AppContext and services
import AppContext from '../../AppContext';
import apiQuestionServices from '../../../sevices/api/apiQuestionServices';
import { shuffleArray } from '../../../config/config';
import isAuthenticated from '../../../hocs/isAuthenticated';

//Import components
import Questions from '../Questions';
import Toast from '../../Shared/Toast';
import ButtonLink from '../../Shared/ButtonLink';

//Import components from Material UI
import { CreateIcon, ImportContactsIcon } from '../../../config/materialConfig';

const Quiz = (props) => {
    const appContext = useContext(AppContext);

    const quizName = props.match.params.quizName.toUpperCase();
    const category = props.match.params.category;
    const url = props.location.pathname;
    const inLocal = !url.includes('external');


    let [questions, setQuestions] = useState([]);
    let [noQuestions, setNoQuestions] = useState(false);

    useEffect(() => {
        if (inLocal) {
            apiQuestionServices.getCategory(category)
                .then(apiQuestions => {
                    if (apiQuestions.length === 0) {
                        setNoQuestions(true);
                    }
                    apiQuestions = shuffleArray(apiQuestions);
                    apiQuestions = apiQuestions.slice(0, 5);
                    setQuestions(apiQuestions);
                })
                .catch(err => {
                    console.log("Quiz component Error:" + err);
                    const errorsList = err.errors.map((err, i) => {
                        return ({ id: i + err.message, title: 'Error', description: err.message, position: 'middle' });
                    });
                    appContext.setNotifyList(errorsList);
                });
        } else {
            setQuestions(appContext.trivia);
        }
    }, [category, url, appContext.trivia, appContext, inLocal])

    if (noQuestions) {
        return (
            <Fragment>
                <div className="home-container">
                    <h1>No Questions Yet</h1>
                    <ButtonLink path="/quizes/create-question" component={<CreateIcon />}>
                        Be the First to Create a new one!
                    </ButtonLink>
                </div>

                {/* REMOTE QUIZ BUTTON */}
                <ButtonLink path="/quizes/choose-ext-quiz" component={<ImportContactsIcon />}>
                    Choose external Quiz
                </ButtonLink>
            </Fragment>
        );
    }

    return (
        <div className="quiz-content">
            {questions
                ? <Questions props={props} quizName={quizName} questions={questions} inLocal={inLocal} />
                : <Toast
                    toastList={[{ id: "LoadingQuizes", title: "Info", description: "Loading Quizes..." }]}
                    position="middle"
                // position="bottom-right"
                />
            }
        </div>
    );
}

export default isAuthenticated(Quiz);