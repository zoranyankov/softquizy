import React, { useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';

//Import components from Material UI
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import CreateIcon from '@material-ui/icons/Create';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';

import AppContext from '../../AppContext';
import apiQuestionServices from '../../../sevices/api/apiQuestionServices';
import testQuestionInput from '../../../sevices/test/questionsTestService';


//Import shared components
import Notificate from '../../Shared/Notificate';
import ButtonLink from '../../Shared/ButtonLink';

import './Createquestion.css';

const Createquestion = ({ history }) => {

    //Get actual state of Token if is authenticated
    const hasToken = JSON.parse(localStorage.getItem('sid'));
    const context = useContext(AppContext);
    let isAuth = !hasToken ? false : context.isAuthName;

    let [fields, setFields] = useState({ category: 'any', difficulty: 'any', question: '', correct_answer: '', incorrect_answers: [''], errors: '', errorTimeout: '' });


    //Execute guard - redirect if is not authenticated
    if (!isAuth) {
        return <Redirect to="/auth/login" />;
    }

    const removeClick = (event, fields, i) => {
        event.preventDefault();
        fields.incorrect_answers.splice(i, 1);
        setFields(oldState => ({ ...oldState, incorrect_answers: fields.incorrect_answers }));
    }

    function handleInputChange(event, oldState, i) {

        const target = event.target;
        // console.log(target);

        //Auto resize the textareas
        if (target.name === 'incorrect_answer') {
            target.style.height = 'auto';
            target.style.height = (target.scrollHeight) + 'px';
            console.log(target.value);
            oldState.incorrect_answers[i] = target.value;
            setFields(oldState => ({ ...oldState, incorrect_answers: oldState.incorrect_answers }));
            return;
        }

        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        setFields({
            ...oldState,
            [name]: value
        });
        clearInterval(fields.errorTimeout[name]);

        if (name === 'category' || name === 'difficulty') {
            if (value === 'any') {
                setFields(oldState => ({
                    ...oldState,
                    errorTimeout: {
                        [name]: setTimeout(() => {
                            setFields((oldState => ({ ...oldState, errors: { ...oldState.errors, [name]: `Field ${name} is required` } })))
                        }, 3000)
                    }
                }));
                return;
            } else {
                setFields((oldState => ({ ...oldState, errors: { ...oldState.errors, [name]: null } })));
                return;
            }
        }

        const err = testQuestionInput(name, value);


        if (err) {
            setFields(oldState => ({...oldState,
                errorTimeout: {[name]: setTimeout(() => {
                        setFields((oldState => ({ ...oldState, errors: { ...oldState.errors, [name]: err } })))
                    }, 3000)
                }
            }));
            return;
        } else {
            setFields((oldState => ({ ...oldState, errors: { ...oldState.errors, [name]: null } })))
        }
    }


    const handleSubmit = (event) => {
        event.preventDefault();
        apiQuestionServices.create(fields)
            .then(res => {
                console.log(res);
                history.push('/');
            })
            .catch(err => console.log(err))
    }

    const addMoreAnswers = (event) => {
        event.preventDefault();
        fields.incorrect_answers.push('');
        setFields((oldState) => ({ ...oldState }));
    }

    return (
        <div>
            <form onSubmit={handleSubmit} className="create-form">
                <h2 className="form-signin-heading">Create local Question</h2><br />
                <label htmlFor="category">Select Category: </label><br />
                <select
                    name="category"
                    className="form-control"
                    value={fields.category}
                    onChange={(e) => handleInputChange(e, fields)}
                >
                    <option value="any">Any Category</option>
                    <option value="6">Math</option>
                    <option value="7">Geography</option>
                    <option value="8">History</option>
                </select>
                <Notificate type="error">{fields.errors.category || < br />}</Notificate><br />

                <label htmlFor="difficulty">Select Difficulty: </label><br />
                <select
                    name="difficulty"
                    className="form-control"
                    value={fields.difficulty}
                    onChange={(e) => handleInputChange(e, fields)}
                >
                    <option value="any">Any Difficulty</option>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                </select>
                <Notificate type="error">{fields.errors.difficulty || < br />}</Notificate><br />
                <label htmlFor="question">Write the question: </label><br />
                <textarea
                    type="text"
                    className="form-control text"
                    placeholder="Who (Where / What) is the...?"
                    name="question"
                    value={fields.question}
                    onChange={(e) => handleInputChange(e, fields)}
                />
                <Notificate type="error">{fields.errors.question || < br />}</Notificate><br />
                <label htmlFor="correct_answer">Write the correct answer: </label><br />
                <textarea
                    type="text"
                    className="form-control text"
                    placeholder="Correct answer is..."
                    name="correct_answer"
                    value={fields.correct_answer}
                    onChange={(e) => handleInputChange(e, fields)}
                />
                <Notificate type="error">{fields.errors.correct_answer || < br />}</Notificate><br /><br />
                <label htmlFor="incorrect_answer">Write the wrong answers: </label><br />
                {fields.incorrect_answers.map((wa, i) =>
                    <div key={i} >
                        <textarea
                            type="text"
                            className="form-control incorrect-answer"
                            placeholder={`Some wrong answer ${i}`}
                            name="incorrect_answer"
                            value={wa || ''}
                            onChange={(e) => handleInputChange(e, fields, i)}
                        />
                        {i > 0
                            ? <button className="remove-btn" onClick={(e) => removeClick(e, fields, i)} >
                                <RemoveCircleIcon />
                            </button>
                            : <button className="remove-btn" onClick={(e) => {
                                e.preventDefault();
                                console.log('You must give at least one wrong answer')
                            }} >
                                <VpnKeyIcon />
                            </button>
                        }
                    </div>
                )}
                <button onClick={addMoreAnswers} >
                    <AddCircleIcon />
                </button><br /><br /><br />
                <ButtonLink component={<CreateIcon />} type="submit">
                    Create Question
                </ButtonLink>
            </form>
        </div>
    );
}

export default Createquestion;