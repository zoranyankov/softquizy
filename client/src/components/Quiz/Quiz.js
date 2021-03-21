import Quizheader from './Quizheader';
import Questions from './Questions';

const Quiz = (props) => {
    const quizName = props.match.params.quizName.toUpperCase();
    const category = props.match.params.category;
    return (
        <div className="quiz-content">
            <Quizheader quizName={quizName} />
            <Questions category={category} props={props} />
        </div>
    );
}

export default Quiz;