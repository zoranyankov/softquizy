import { Fragment } from 'react';
import { Link } from 'react-router-dom';

import { Image } from 'cloudinary-react';


import './Quizcard.css'

const Quizcard = ({
    to,
    logoImgUrl,
    category,
    categoryName,
}) => {
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