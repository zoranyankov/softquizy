import { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';

import AppContext from '../AppContext';
import authService from '../../sevices/auth/authServices';

import './Home.css'

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
            <h1>SCHOOSE YOUR QUIZ</h1>
            {/* <link rel="stylesheet" href=""/> */}
            <Link className="quiz-link" to={isAuth ? "/quizes/math" : "/auth/login"}>
                <img className="quiz-img" src="https://cdn1.focus.bg/bazar/25/pics/2542792e24b632d47d792969d51892ea.jpg" alt="quiz-math-pic" />
            </Link>
            <Link className="quiz-link" to={isAuth ? "/quizes/goegraphy" : "/auth/login"}>
                <img className="quiz-img" src="https://thumbs.dreamstime.com/b/set-geography-symbols-equipments-web-banners-vintage-outline-sketch-web-banners-doodle-style-education-concept-back-to-136641038.jpg" alt="quiz-georaphy-pic" />
            </Link>
            <Link className="quiz-link" to={isAuth ? "/quizes/history" : "/auth/login"}>
                <img className="quiz-img" src="http://www.heptx.com/wp-content/uploads/2018/02/Classical-History-MS-300x300.jpg" alt="quiz-math-pic" />
            </Link>
        </div>
    );
}

export default Home;