import './Qitem.css';

const Qitem = ({ answers }) => {
    return (
        answers.map(a => (
            <li className="question-answer">{a}</li>
        ))
    );
}

export default Qitem;