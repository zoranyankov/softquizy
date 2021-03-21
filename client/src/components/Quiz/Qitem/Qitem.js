import './Qitem.css';

const Qitem = ({ answers, onClick }) => {
    return (
        answers.map(a => (
            <li className="question-answer" onClick={onClick(a)}>{a}</li>
        ))
    );
}

export default Qitem;