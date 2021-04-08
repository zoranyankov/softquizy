import { Link } from 'react-router-dom';

import { Image } from 'cloudinary-react';

import '../Home.css';

const Home = (props) => {
    return (
        <div className="home-container">
            <div className="quizes">
                <h1>CHOOSE YOUR QUIZ</h1>
                <Link className="quiz-link" to="/auth/register">
                    <Image cloudName="softquizy" className="quiz-img" publicId='Categories/Math' />
                </Link>
                <Link className="quiz-link" to="/auth/register">
                    <Image cloudName="softquizy" className="quiz-img" publicId='Categories/Geography' />
                </Link>
                <Link className="quiz-link" to="/auth/register">
                    <Image cloudName="softquizy" className="quiz-img" publicId='Categories/History' />
                </Link>
            </div>
        </div>
    );
}

export default Home;