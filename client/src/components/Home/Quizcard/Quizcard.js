import { Link } from 'react-router-dom';

const Quizcard = ({
    to,
    logoImgUrl,
    category,
}) => {
    return (
        <div>
            <Link className="quiz-link" to={to}>
                <img className="quiz-img" src={logoImgUrl} alt={category} />
            </Link>
        </div>
    );
}

export default Quizcard;