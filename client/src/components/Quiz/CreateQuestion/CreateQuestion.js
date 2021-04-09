import React, { useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { Image } from 'cloudinary-react';

//Import components from Material UI
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import CreateIcon from '@material-ui/icons/Create';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';

//Import globav AppContext and services
import AppContext from '../../AppContext';
import apiQuestionServices from '../../../sevices/api/apiQuestionServices';
import testQuestionInput from '../../../sevices/test/questionsTestService';


//Import shared components
import Notificate from '../../Shared/Notificate';
import ButtonLink from '../../Shared/ButtonLink';

//Import custom styles for current component
import './CreateQuestion.css';

let errorTimeout = {};

const CreateQuestion = ({ history }) => {

    //Get actual state of Token if is authenticated
    // const hasToken = JSON.parse(localStorage.getItem('sid'));
    // let isAuth = !hasToken ? false : appContext.isAuthName;
    //Get autentication state from global AppContext
    const appContext = useContext(AppContext);
    let isAuth = appContext.isAuthName;

    let [fields, setFields] = useState({ category: 'any', difficulty: 'any', question: '', correct_answer: '', incorrect_answers: [''], errors: {} });

    //Execute guard - redirect if is not authenticated
    if (!isAuth) {
        return <Redirect to="/auth/login" />;
    }

    //Event callback for remove incorrect_answer
    const removeClick = (event, fields, i) => {
        event.preventDefault();
        fields.incorrect_answers.splice(i, 1);
        setFields(oldState => ({ ...oldState, incorrect_answers: fields.incorrect_answers }));
    }

    //Event for real-time control and validate input fields
    function handleInputChange(event, oldState, i) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        //Auto resize the textareas
        if (target.type === 'textarea') {
            target.style.height = 'auto';
            target.style.height = (target.scrollHeight) + 'px';
        }

        //Set state of incorrect_answers
        if (target.name.startsWith('incorrect_answer')) {
            clearTimeout(errorTimeout[name]);
            const newIncorrectAnswers = oldState.incorrect_answers;
            newIncorrectAnswers[i] = target.value;
            setFields(oldState => ({ ...oldState, incorrect_answers: newIncorrectAnswers }));
            const err = testQuestionInput(value);
            if (!err) {
                setFields(oldState => ({ ...oldState, errors: { ...oldState.errors, [name]: null } }));
            } else {
                errorTimeout[name] = setTimeout(() => {
                    setFields((oldState => ({ ...oldState, errors: { ...oldState.errors, [name]: err } })))
                }, 2000)
            }
            return;
        }

        //Set state of all other inputs
        clearTimeout(errorTimeout[name]);
        setFields({
            ...oldState,
            [name]: value,
        });

        //Real-time validation of select fields
        if (name === 'category' || name === 'difficulty') {
            if (value === 'any') {
                errorTimeout[name] = setTimeout(() => {
                    setFields((oldState => ({ ...oldState, errors: { ...oldState.errors, [name]: `Field ${name} is required` } })))
                }, 2000);
                return;
            } else {
                setFields((oldState => ({ ...oldState, errors: { ...oldState.errors, [name]: null } })));
                return;
            }
        }

        const err = testQuestionInput(value);

        if (err) {
            errorTimeout[name] = setTimeout(() => {
                setFields((oldState => ({ ...oldState, errors: { ...oldState.errors, [name]: err } })))
            }, 2000);
            return;
        } else {
            setFields((oldState => ({ ...oldState, errors: { ...oldState.errors, [name]: null } })))
            return;
        }
    }


    const handleSubmit = (event) => {
        event.preventDefault();
        const { category, difficulty, question, correct_answer, incorrect_answers } = fields;

        //Check for missing fields
        if (category === 'any' || difficulty === 'any' || !question || !correct_answer || !incorrect_answers[0]) {
            const msg = 'Field is required';
            setFields((oldState => ({ ...oldState, errors: { category: msg, difficulty: msg, question: msg, correct_answer: msg, incorrect_answer_0: msg, ...oldState.errors } })));
            const error = [{ id: 'AllFieldsAreRequired', title: 'Error', description: 'All fields are required' }];
            appContext.setNotifyList(error);
            return;
        }
        if (Object.values(fields.errors).some(x => x)) {
            console.log(fields.errors);
            const error = [{ id: 'PleaseFixYourWrongInputs', title: 'Error', description: 'Please Fix Your Wrong Inputs' }];
            appContext.setNotifyList(error);
            return;
        }
        if (fields.incorrect_answers.some(x => x === '')) {
            const error = [{ id: 'PleaseFillInAllIncorrectAnswers', title: 'Error', description: 'Please Fill In All Incorrect Answers' }];
            appContext.setNotifyList(error);
            return;            
        }

        apiQuestionServices.create(fields)
            .then(response => {
                if (!response || response.errors) {
                    const errorsList = response.errors.map((err, i) => ({ id: i + err.message, title: 'Error', description: err.message }));
                    appContext.setNotifyList(errorsList);
                    return;
                }
                appContext.setNotifyList([{ id: 'Question is created', title: 'Success', description: 'Question is created' }]);
                history.push('/');
            })
            .catch(err => {
                console.log('Create question fetch Error: ' + err);
                const errorsList = err.errors.map((err, i) => {
                    return ({ id: i + err.message, title: 'Error', description: err.message, position: 'middle' });
                });
                appContext.setNotifyList(errorsList);
            })
    }

    const addMoreAnswers = (event) => {
        event.preventDefault();
        fields.incorrect_answers.push('');
        setFields((oldState) => ({ ...oldState }));
    }

    return (
        <div className="create-question-content">
            <div className="create-question-header">
                <Image cloudName="softquizy" className="create-question-logo" publicId='create-question' />
            </div>
            <form onSubmit={handleSubmit} className="create-question-form">
                <h1 className="create-question-title">Create local Question</h1><br />
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
                            name={`incorrect_answer_${i}`}
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
                        <Notificate type="error">{fields.errors[`incorrect_answer_${i}`] || < br />}</Notificate><br />
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

export default CreateQuestion;