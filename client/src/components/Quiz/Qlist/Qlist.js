import { useEffect, useState } from 'react';
import _uniqueId from 'lodash/uniqueId';

import { shuffleArray } from '../../../config/config';

// import Qitem from '../Qitem';

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
        // console.log(answers);
        answers = shuffleArray(answers);

        setAnswers(answers);
        // return () => {
        //     cleanup
        // }
    }, [answer, incAnswers])

    return (
        <li className="question">
            <h2 className="question-title">{question}</h2>
            <ul className="question-answers">
                {answers.map(a => (
                    <li
                        className="question-answer"
                        key={a.id}
                        onClick={(event) => onClick(event, question, answer, a.a, id)}
                    >
                        {a.a}
                    </li>
                ))}
                {/* <Qitem answers={answers}/> */}
            </ul>
        </li>
    );
}

export default Qlist;