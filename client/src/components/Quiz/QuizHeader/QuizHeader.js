import './QuizHeader.css';

const QuizHeader = ({ currentQuestion, questoinsCount, quizName, score }) => {
    return (
        <div className="question-header">
            <div className="question-count">
                <h2>Question</h2>
                <div className="question-number">{currentQuestion}</div>
                <div className="description">of <span>{questoinsCount}</span></div>
            </div>
            <h1>{quizName || "DEFALUT QUIZ NAME"}</h1>
            <div className="score-container">
                <h2>Score</h2>
                <div className="score">{score}</div>
                <div className="description">points</div>
            </div>
        </div>
    );
}

export default QuizHeader;
