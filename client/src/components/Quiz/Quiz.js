import Quizheader from './Quizheader';
import Questions from './Questions';

const Quiz = (props) => {
    const quizName = props.match.params.quizName.toUpperCase();
    return (
        <div className="quiz-content">
            <Quizheader quizName={quizName}/>
            <Questions />
        </div>
    );
}

export default Quiz;