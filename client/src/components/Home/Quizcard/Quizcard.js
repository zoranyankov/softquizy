import { Fragment } from 'react';
import { Link } from 'react-router-dom';

//Import Claudinary component
import { Image } from 'cloudinary-react';

//Import custom styles for current component
import './Quizcard.css'

const Quizcard = ({ to, categoryName}) => {
    return (
        <Fragment>
            <Link to={to} className="quiz-link ">
                <Image cloudName="softquizy" className="quiz-img" publicId={`Categories/${categoryName}`} />
                <h3 className="card-title">{categoryName}</h3>
            </Link>
        </Fragment>
    );
}

export default Quizcard;