import { Fragment, useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';

//Import components from Material UI
import CreateIcon from '@material-ui/icons/Create';
import ImportContactsIcon from '@material-ui/icons/ImportContacts';

import ButtonLink from '../../Shared/ButtonLink';

import apiQuestionServices from '../../../sevices/api/apiQuestionServices';
import { CATEGORY_NAMES, CATEGORY_IMAGES } from '../../../config/config';

import '../Home.css';

// import NavListItem from '../../Header/NavListItem';
import Quizcard from '../Quizcard';

const Userpage = ({ history }) => {

    let [questions, setQuestions] = useState('');

    useEffect(() => {
        if (questions === '') {
            apiQuestionServices.getCategories()
                .then(qss => {
                    // console.log(qss);

                    //Filter to unique categories with images - to show in Userpage
                    qss = qss.reduce((a, x) => {                            //TODO: find better way
                        if (a.find(y => y.category === x.category)) {
                            return a;
                        }
                        x = {
                            ...x,
                            categoryName: CATEGORY_NAMES[x.category],
                            logoImgUrl: CATEGORY_IMAGES[x.category],
                        }
                        a.push(x);
                        return a;
                    }, []);
                    // console.log(qss);
                    qss ? setQuestions(qss) : setQuestions('');
                })
                .catch(err => console.log("Userpage Get Categories Error:" + err));
        }
    }, [questions]);

    return (
        <div className="home-container">
            <div className="quizes">
                <h1>CHOOSE FROM LOCAL QUIZES</h1>

                {/* LOAD LOCAL QUIZES */}
                {questions
                    ? <Fragment>
                        {questions.map(({ category, categoryName, _id, logoImgUrl }) => (
                            <Quizcard
                                to={`/quizes/local/${category}/${categoryName}`}
                                categoryName={categoryName}
                                logoImgUrl={logoImgUrl}
                                alt={`quiz-${category}-pic`}
                                key={_id}
                            />
                        ))}
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