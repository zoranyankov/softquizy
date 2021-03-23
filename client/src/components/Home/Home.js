import { Fragment, useContext, useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import CreateIcon from '@material-ui/icons/Create';
import ImportContactsIcon from '@material-ui/icons/ImportContacts';

import AppContext from '../AppContext';
import authService from '../../sevices/auth/authServices';
import apiServises from '../../sevices/api/apiServises';
import { CATEGORY_NAMES, CATEGORY_IMAGES } from '../../config/config';

import './Home.css';

import Quizcard from './Quizcard';


const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    button: {
        backgroundColor: 'skyblue',
        color: 'blue',
        margin: theme.spacing(5),
        // margin: '3rem 5rem',
    },
}));

const Home = (props) => {

    const classes = useStyles();

    let [questions, setQuestions] = useState('');
    const hasToken = JSON.parse(localStorage.getItem('sid'));
    const context = useContext(AppContext);
    let isAuth = !hasToken ? false : context.isAuthName;

    useEffect(() => {
        if (hasToken) {
            const { token, user } = hasToken;
            authService.verify({ username: user.username, token })
                .then(res => {
                    // console.log(res.result);
                    if (!res.result) {
                        localStorage.removeItem('sid');
                        context.setIsAuth(false);
                    }
                })
                .catch(err => console.log(err))
            // return () => {
            //     cleanup
            // }
        }

        if (questions === '') {
            apiServises.getCategories()
                .then(qss => {
                    // console.log(qss);
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
                    setQuestions(qss);
                })
                .catch(err => console.log("Home Error:" + err));
        }
    });
    // console.log(isAuth);

    return (
        <div className="home-container">
            <div className="quizes">
                {isAuth ? <h1>SCHOOSE FROM LOCAL QUIZES</h1> : <h1>SCHOOSE YOUR QUIZ</h1>}

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
                    : <h1>No Questions Yet</h1>
                }

            </div>
            {isAuth ? <div className={classes.root} >
                <Button
                    size='large'
                    className={classes.button}
                    variant="contained"
                    color="primary"
                    href="/quizes/create-question"
                    startIcon={<CreateIcon />}
                >
                    Create own Question
                </Button>
                <Button
                    size='large'
                    className={classes.button}
                    variant="contained"
                    color="primary"
                    href="/quizes/choose-ext-quiz"
                    startIcon={<ImportContactsIcon />}
                >
                    Choose external Quiz
                </Button>
            </div> : ''}
        </div>
    );
}

export default Home;