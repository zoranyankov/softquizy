import { useEffect, useState } from 'react';
import _uniqueId from 'lodash/uniqueId';

import { shuffleArray } from '../../../config/config';

import './Qlist.css'

const Qlist = ({
    question,
    answer,
    incAnswers,
    onClick,
    id,
}) => {
    let [answers, setAnswers] = useState([]);

    useEffect(() => {
        let answers = [answer, ...incAnswers];
        answers = answers.map(a => ({ id: _uniqueId(), a }));
        answers = shuffleArray(answers);

        setAnswers(answers);
    }, [answer, incAnswers])

    return (
        <li className="question">
            <h2 className="question-title">{question}</h2>
            <ul className="question-answers">
                {answers.map(a => (
                    <li
                        key={a.id}
                        className="question-answer"
                        onClick={(event) => onClick(event, question, answer, a.a, id)}
                    >
                        {a.a}
                    </li>
                ))}
            </ul>
        </li>
    );
}

export default Qlist;