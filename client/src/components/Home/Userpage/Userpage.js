import { Fragment, useEffect, useState, useContext } from 'react';
import { withRouter } from 'react-router-dom';

//Import components from Material UI
import { CreateIcon, ImportContactsIcon, SentimentVeryDissatisfiedIcon } from '../../../config/materialConfig';


//Import global AppContext and services
import AppContext from '../../AppContext';
import apiQuestionServices from '../../../sevices/api/apiQuestionServices';

//Import constants
import { CATEGORY_NAMES } from '../../../config/config';

//Import custom styles for current component
import '../Home.css';

//Import components
import Quizcard from '../Quizcard';
import ButtonLink from '../../Shared/ButtonLink';

const Userpage = () => {

    let [questions, setQuestions] = useState('');
    const appContext = useContext(AppContext);
    let restCategories = Object.values({ ...CATEGORY_NAMES }).slice(0, 3);
    let qCount = restCategories.length;


    useEffect(() => {
        if (questions === '') {
            apiQuestionServices.getCategories()
                .then(qss => {
                    //Filter to unique categories with images - to show in Userpage
                    qss = qss.reduce((a, x) => {                            //TODO: find better way
                        if (a.find(y => y.category === x.category)) {
                            return a;
                        }
                        x = { ...x, categoryName: CATEGORY_NAMES[x.category] }
                        a.push(x);
                        return a;
                    }, []);
                    qss ? setQuestions(qss) : setQuestions('');
                })
                .catch(err => {
                    console.log("Userpage Get Categories Error:" + err)
                    const errorsList = err.errors.map((err, i) => {
                        return ({ id: err.message, title: 'Error', description: err.message, position: 'middle' });
                    });
                    appContext.setNotifyList(errorsList);
                });
        }
    }, [questions, appContext]);
    if (questions) {
        questions.forEach(question => {
            if (restCategories.includes(question.categoryName)) {
                restCategories = restCategories.splice(restCategories.indexOf([question.category]), 1);
            }
        });
        qCount = restCategories.length;
        restCategories = Object.values(restCategories).join(', ');
    }


    return (
        <div className="home-container">
            <div className="quizes">
                <h1>CHOOSE FROM LOCAL QUIZES</h1>

                {/* LOAD LOCAL QUIZES */}
                {questions.length > 0
                    ? <Fragment>
                        {questions.map(({ category, categoryName, _id, logoImgUrl }) => (
                            <Quizcard
                                to={`/quizes/local/${category}/${categoryName}`}
                                categoryName={categoryName}
                                alt={`quiz-${category}-pic`}
                                key={_id}
                            />
                        ))}
                        {qCount > 0 && (
                            <>
                                <h1>{qCount === 1 ? "Category": "Categories"}: {restCategories} {qCount ? "is" : "are"} very sad <SentimentVeryDissatisfiedIcon />, ...</h1>
                                <h1>because {qCount === 1 ? "it has": "they have"} no questions yet...</h1>
                                <h2>Can you help?</h2>
                            </>
                        )}
                        <ButtonLink path="/quizes/create-question" component={<CreateIcon />}>
                            Help the sadly Categories now
                        </ButtonLink>
                    </Fragment>
                    : <Fragment>
                        <h1>No Questions Yet</h1>
                        <ButtonLink path="/quizes/create-question" component={<CreateIcon />}>
                            Be the First to Create a new one!
                        </ButtonLink>
                    </Fragment>
                }
            </div>
            <div>
                {/* LOCAL QUESTIONS BUTTON */}
                <ButtonLink path="/quizes/create-question" component={<CreateIcon />}>
                    Create own Question
                </ButtonLink>

                {/* REMOTE QUIZ BUTTON */}
                <ButtonLink path="/quizes/choose-ext-quiz" component={<ImportContactsIcon />}>
                    Choose external Quiz
                </ButtonLink>
            </div>
        </div>
    );
}

export default withRouter(Userpage);