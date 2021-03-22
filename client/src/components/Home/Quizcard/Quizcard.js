import { Fragment } from 'react';
import { Link } from 'react-router-dom';

import './Quizcard.css'

const Quizcard = ({
    to,
    logoImgUrl,
    category,
    categoryName,
}) => {
    return (
        <Fragment>
            <Link to={to} className="quiz-link">
                <img className="quiz-img" src={logoImgUrl} alt={category} />
                <h3 className="card-title">{categoryName}</h3>
            </Link>
        </Fragment>
    );
}

export default Quizcard;