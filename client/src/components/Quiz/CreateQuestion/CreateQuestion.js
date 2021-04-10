import React, { Redirect, useState, useContext, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { Image } from 'cloudinary-react';

//Import components from Material UI
import { VpnKeyIcon, CreateIcon, AddCircleIcon, RemoveCircleIcon } from '../../../config/materialConfig';

//Import global AppContext and services
import AppContext from '../../AppContext';
import apiQuestionServices from '../../../sevices/api/apiQuestionServices';
import testQuestionInput from '../../../sevices/test/questionsTestService';

//Import shared components
import Notificate from '../../Shared/Notificate';
import ButtonLink from '../../Shared/ButtonLink';

//Import custom styles for current component
import './CreateQuestion.css';

let errorTimeout = {};

const CreateQuestion = ({ history, action, question, buttName, questionId, isCreator, ...props }) => {

    //Set the page title
    let title = 'Create local Question';
    if (action) {
        title = action === 'delete' ? 'Delete local Question' : 'Edit local Question';
    }
    const buttonName = buttName ? buttName : 'Create local Question';
    //Get actual state of Token if is authenticated
    // const hasToken = JSON.parse(localStorage.getItem('sid'));
    // let isAuth = !hasToken ? false : appContext.isAuthName;
    //Get autentication state from global AppContext
    const appContext = useContext(AppContext);

    //Load data in case of edit / delete
    useEffect(() => {
        if (action) {
            window.scrollTo(0, 0);
            setFields(oldState => ({ ...oldState, ...question }));
        }
    }, [action, question])
    
    let isAuth = appContext.isAuthName;
    
    let [fields, setFields] = useState({ category: 'any', difficulty: 'any', question: '', correct_answer: '', incorrect_answers: [''], errors: {} });

    //Execute guard - redirect if is not authenticated - variant without HOC isAuthenticated
    if (!isAuth) {
        return <Redirect to="/auth/login" />;
    }

    //Event callback for remove/add incorrect_answer
    const removeClick = (event, fields, i) => {
        event.preventDefault();
        if (action === 'delete') return;
        fields.incorrect_answers.splice(i, 1);
        setFields(oldState => ({ ...oldState, incorrect_answers: fields.incorrect_answers }));
    }
    const addMoreAnswers = (event) => {
        event.preventDefault();
        if (action === 'delete') return;
        fields.incorrect_answers.push('');
        setFields((oldState) => ({ ...oldState }));
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

        //Delete current question
        if (action === 'delete') {
            console.log('inDelete');
            if (isCreator) {
                apiQuestionServices.deleteOne(questionId)
                    .then((response) => {
                        appContext.setNotifyList([{ id: 'Question has been deleted', title: 'Success', description: 'Question has been deleted' }]);
                        return ()=> {
                            history.push('/profile/profile-info/profile-questoins');
                        }
                        // return null;
                    })
                    .catch(err => {
                        console.log('Delete question fetch Error: ' + err);
                        const errorsList = err.errors.map((err, i) => {
                            return ({ id: i + err.message, title: 'Error', description: err.message, position: 'middle' });
                        });
                        appContext.setNotifyList(errorsList);
                        return null;
                    })
            }
            return;
        }

        //Check for missing fields
        const emptyIncAnswer = incorrect_answers.some(x => !x);
        if (category === 'any' || difficulty === 'any' || !question || !correct_answer || emptyIncAnswer) {
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

        //Edit current question
        if (action === 'edit') {
            apiQuestionServices.editOne(questionId, fields)
                .then(() => {
                    appContext.setNotifyList([{ id: 'Question has been updated', title: 'Success', description: 'Question has been updated' }]);
                        history.push('/profile/profile-info/profile-questions');
                    return null;
                })
                .catch(err => {
                    console.log('Edit question fetch Error: ' + err);
                    const errorsList = err.errors.map((err, i) => {
                        return ({ id: i + err.message, title: 'Error', description: err.message, position: 'middle' });
                    });
                    appContext.setNotifyList(errorsList);
                    return;
                })
            return;
        }

        //Create new question
        apiQuestionServices.create(fields)
            .then(response => {
                if (!response || response.errors) {
                    const errorsList = response.errors.map((err, i) => ({ id: i + err.message, title: 'Error', description: err.message }));
                    appContext.setNotifyList(errorsList);
                    return;
                }
                appContext.setNotifyList([{ id: 'Question has been created', title: 'Success', description: 'Question has been created' }]);
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

    return (
        <div className="create-question-content">
            <div className="create-question-header">
                <Image cloudName="softquizy" className="create-question-logo" publicId='create-question' />
            </div>
            <form onSubmit={handleSubmit} className="create-question-form">
                <h1 className="create-question-title">{title}</h1><br />
                <label htmlFor="category">Select Category: </label><br />
                <select
                    name="category"
                    className="form-control"
                    value={fields.category}
                    disabled={action === 'delete' && true}
                    onChange={(e) => handleInputChange(e, fields)}
                >
                    <option value="any">Any Category</option>
                    <option value="6">Math</option>
                    <option value="7">Geography</option>
                    <option value="8">History</option>
                </select>
                <Notificate maxWidth2={true} type="error">{fields.errors.category || < br />}</Notificate><br />

                <label htmlFor="difficulty">Select Difficulty: </label><br />
                <select
                    name="difficulty"
                    className="form-control"
                    value={fields.difficulty}
                    disabled={action === 'delete' && true}
                    onChange={(e) => handleInputChange(e, fields)}
                >
                    <option value="any">Any Difficulty</option>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                </select>
                <Notificate maxWidth2={true} type="error">{fields.errors.difficulty || < br />}</Notificate><br />
                <label htmlFor="question">Write the question: </label><br />
                <textarea
                    type="text"
                    className="form-control text"
                    placeholder="Who (Where / What) is the...?"
                    name="question"
                    disabled={action === 'delete' && true}
                    value={fields.question}
                    onChange={(e) => handleInputChange(e, fields)}
                />
                <Notificate maxWidth={true} type="error">{fields.errors.question || < br />}</Notificate><br />
                <label htmlFor="correct_answer">Write the correct answer: </label><br />
                <textarea
                    type="text"
                    className="form-control text"
                    placeholder="Correct answer is..."
                    name="correct_answer"
                    value={fields.correct_answer}
                    disabled={action === 'delete' && true}
                    onChange={(e) => handleInputChange(e, fields)}
                />
                <Notificate maxWidth={true} type="error">{fields.errors.correct_answer || < br />}</Notificate><br /><br />
                <label htmlFor="incorrect_answer">Write the wrong answers: </label><br />
                {fields.incorrect_answers.map((wa, i) =>
                    <div key={i} >
                        <textarea
                            type="text"
                            className="form-control incorrect-answer"
                            placeholder={`Some wrong answer ${i}`}
                            name={`incorrect_answer_${i}`}
                            value={wa || ''}
                            disabled={action === 'delete' && true}
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
                        <Notificate maxWidth={true} type="error">{fields.errors[`incorrect_answer_${i}`] || < br />}</Notificate><br />
                    </div>
                )}
                <button onClick={addMoreAnswers}>
                    <AddCircleIcon />
                </button><br /><br /><br />
                <ButtonLink component={<CreateIcon />} type="submit" setColor={action === 'delete' ? "secondary" : "primary"}>
                    {buttonName}
                </ButtonLink>
            </form>
        </div>
    );
}

export default withRouter(CreateQuestion);