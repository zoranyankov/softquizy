import {Link } from 'react-router-dom';
import '../Home.css';

const Home = (props) => {
    return (
        <div className="home-container">
            <div className="quizes">
                <h1>CHOOSE YOUR QUIZ</h1>
                <Link className="quiz-link" to="/auth/login">
                    <img className="quiz-img" src="https://cdn1.focus.bg/bazar/25/pics/2542792e24b632d47d792969d51892ea.jpg" alt="quiz-math-pic" />
                </Link>
                <Link className="quiz-link" to="/auth/login">
                    <img className="quiz-img" src="https://thumbs.dreamstime.com/b/set-geography-symbols-equipments-web-banners-vintage-outline-sketch-web-banners-doodle-style-education-concept-back-to-136641038.jpg" alt="quiz-georaphy-pic" />
                </Link>
                <Link className="quiz-link" to="/auth/login">
                    <img className="quiz-img" src="http://www.heptx.com/wp-content/uploads/2018/02/Classical-History-MS-300x300.jpg" alt="quiz-math-pic" />
                </Link>
            </div>
        </div>
    );
}

export default Home;