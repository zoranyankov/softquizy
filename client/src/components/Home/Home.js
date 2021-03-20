import { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';

import AppContext from '../AppContext';
import authService from '../../sevices/auth/authServices';

import './Home.css';

const Home = (props) => {
    const hasToken = JSON.parse(localStorage.getItem('sid'));
    const context = useContext(AppContext);
    let isAuth = !hasToken ? false : context.isAuthName;

    useEffect(() => {
        if (hasToken) {
            const { token, user } = hasToken;
            authService.verify({ username: user.username, token })
                .then(res => {
                    console.log(res.result);
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
    });
    console.log(isAuth);

    return (
        <div className="home-container">
            <div className="quizes">
                <h1>SCHOOSE YOUR QUIZ</h1>
                {/* <link rel="stylesheet" href=""/> */}
                <Link className="quiz-link" to={isAuth ? "/quizes/local/math" : "/auth/login"}>
                    <img className="quiz-img" src="https://cdn1.focus.bg/bazar/25/pics/2542792e24b632d47d792969d51892ea.jpg" alt="quiz-math-pic" />
                </Link>
                <Link className="quiz-link" to={isAuth ? "/quizes/local/goegraphy" : "/auth/login"}>
                    <img className="quiz-img" src="https://thumbs.dreamstime.com/b/set-geography-symbols-equipments-web-banners-vintage-outline-sketch-web-banners-doodle-style-education-concept-back-to-136641038.jpg" alt="quiz-georaphy-pic" />
                </Link>
                <Link className="quiz-link" to={isAuth ? "/quizes/local/history" : "/auth/login"}>
                    <img className="quiz-img" src="http://www.heptx.com/wp-content/uploads/2018/02/Classical-History-MS-300x300.jpg" alt="quiz-math-pic" />
                </Link>
            </div>
            <br/>
            <br/>
            <br/>
            <div className="quiz-header">
                <Link to="/quizes/create-quiz"><h1 className="quiz-nav" >Create own Quiz</h1></Link>
                <Link to="/quizes/choose-ext-quiz"><h1 className="quiz-nav" >Choose external Quiz</h1></Link>
            </div>
        </div>
    );
}

export default Home;