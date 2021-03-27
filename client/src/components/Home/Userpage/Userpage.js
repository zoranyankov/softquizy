import { Fragment, useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';

//Import components from Material UI
import Button from '@material-ui/core/Button';
// import VpnKeyIcon from '@material-ui/icons/VpnKey';
import { makeStyles } from '@material-ui/core/styles';
import CreateIcon from '@material-ui/icons/Create';
import ImportContactsIcon from '@material-ui/icons/ImportContacts';

import apiQuestionServices from '../../../sevices/api/apiQuestionServices';
import { CATEGORY_NAMES, CATEGORY_IMAGES } from '../../../config/config';

import '../Home.css';

// import NavListItem from '../../Header/NavListItem';
import Quizcard from '../Quizcard';

//Make custom styles for Material UI Button component
const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    button: {
        backgroundColor: 'skyblue',
        color: 'darkBlue',
        margin: theme.spacing(5),
        // margin: '3rem 5rem',
    },
    create_button: {
        backgroundColor: 'green',
        color: 'darkBlue',
        margin: theme.spacing(5),
        // margin: '3rem 5rem',
    },
}));


const Userpage = ({ history }) => {
    
    const onButtonClick = (event, path) => {
        event.preventDefault();
        history.push(path);
    }
    const classes = useStyles();

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
                        <Button
                            size='large'
                            className={classes.create_button}
                            variant="contained"
                            color="primary"
                            href="/quizes/create-question"
                            startIcon={<CreateIcon />}
                        >
                            Be the First to Create a new one!
                            </Button>
                    </Fragment>
                }

            </div>
            <div className={classes.root} >

                {/* LOCAL QUESTIONS BUTTON */}
                <Button
                    size='large'
                    className={classes.button}
                    variant="contained"
                    color="primary"
                    // href="/quizes/create-question"
                    onClick={(e) => onButtonClick(e, '/quizes/create-question')}
                    startIcon={<CreateIcon />}
                >
                    Create own Question
                </Button>

                {/* REMOTE QUIZ BUTTON */}
                <Button
                    size='large'
                    className={classes.button}
                    variant="contained"
                    color="primary"
                    // href="/quizes/choose-ext-quiz"
                    onClick={(e) => onButtonClick(e, '/quizes/choose-ext-quiz')}
                    startIcon={<ImportContactsIcon />}
                >
                    Choose external Quiz
                </Button>
            </div>
        </div>
    );
}

export default withRouter(Userpage);