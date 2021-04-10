import { useEffect, useState } from 'react';
import _uniqueId from 'lodash/uniqueId';

import { shuffleArray } from '../../../config/config';

import './Qlist.css'

const Qlist = ({
    question,
    answer,
    incAnswers,
    onClick,
    qid,
}) => {
    let [answers, setAnswers] = useState([]);

    useEffect(() => {
        let answers = [answer, ...incAnswers];
        answers = answers.map(answer => ({ id: _uniqueId(), answer }));
        answers = shuffleArray(answers);

        setAnswers(answers);
    }, [answer, incAnswers])

    return (
        <li className="question">
            <h2 className="question-title">{question}</h2>
            <ul className="question-answers">
                {answers.map(currAnswer => (
                    <li
                        key={currAnswer.id}
                        className="question-answer"
                        onClick={(event) => onClick(event, question, answer, currAnswer.answer, qid)}
                    >
                        {currAnswer.answer}
                    </li>
                ))}
            </ul>
        </li>
    );
}

export default Qlist;