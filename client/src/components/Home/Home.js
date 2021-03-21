import { Fragment, useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import AppContext from '../AppContext';
import authService from '../../sevices/auth/authServices';
import apiServises from '../../sevices/api/apiServises';
import { CATEGORY_NAMES } from '../../config/config';

import './Home.css';

import Quizcard from './Quizcard'

const Home = (props) => {
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
        // if (questions === '') {
        //     apiServises.getAll()
        //         .then(qss => {
        //             console.log(qss);
        //             qss = qss.map(x => ({ category: x.category, id: x._id }));
        //             console.log(qss);
        //             setQuestions(qss);
        //         })
        //         .catch(err => console.log("Home Error:" + err));
        // }
        if (questions === '') {
            apiServises.getCategories()
                .then(qss => {
                    // console.log(qss);
                    qss = qss.map(x => ({ ...x, categoryName: CATEGORY_NAMES[x.category], }));
                    console.log(qss);
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
                {/* <link rel="stylesheet" href=""/> */}

                {questions
                    ? <Fragment>
                        {questions.map(({ category, categoryName, _id }) => (
                            <Quizcard
                                to={`/quizes/local/${category}`}
                                categoryName={categoryName}
                                logoImgUrl="https://cdn1.focus.bg/bazar/25/pics/2542792e24b632d47d792969d51892ea.jpg"
                                alt={`quiz-${category}-pic`}
                                key={_id}
                            />
                        ))}
                    </Fragment>
                    : <h1>No Questions Yet</h1>}

                {/* <Quizcard to="/quizes/local/math" logoImgUrl="https://cdn1.focus.bg/bazar/25/pics/2542792e24b632d47d792969d51892ea.jpg" alt={`quiz-{category}-pic`} /> */}

                {/* <Link className="quiz-link" to={isAuth ? "/quizes/local/math" : "/auth/login"}>
                    <img className="quiz-img" src="https://cdn1.focus.bg/bazar/25/pics/2542792e24b632d47d792969d51892ea.jpg" alt="quiz-math-pic" />
                </Link> */}
                {/* <Link className="quiz-link" to={isAuth ? "/quizes/local/goegraphy" : "/auth/login"}>
                    <img className="quiz-img" src="https://thumbs.dreamstime.com/b/set-geography-symbols-equipments-web-banners-vintage-outline-sketch-web-banners-doodle-style-education-concept-back-to-136641038.jpg" alt="quiz-georaphy-pic" />
                </Link>
                <Link className="quiz-link" to={isAuth ? "/quizes/local/history" : "/auth/login"}>
                    <img className="quiz-img" src="http://www.heptx.com/wp-content/uploads/2018/02/Classical-History-MS-300x300.jpg" alt="quiz-math-pic" />
                </Link> */}
            </div>
            {isAuth ? <div className="quiz-footer">
                <Link to="/quizes/create-question"><h1 className="quiz-nav" >Create own Question</h1></Link>
                <Link to="/quizes/choose-ext-quiz"><h1 className="quiz-nav" >Choose external Quiz</h1></Link>
            </div> : ''}
        </div>
    );
}

export default Home;