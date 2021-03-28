import React, { useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';

//Import components from Material UI
import Button from '@material-ui/core/Button';
// import VpnKeyIcon from '@material-ui/icons/VpnKey';
import { makeStyles } from '@material-ui/core/styles';
import CreateIcon from '@material-ui/icons/Create';
import AddCircleIcon from '@material-ui/icons/AddCircle';

import AppContext from '../../AppContext';
import apiQuestionServices from '../../../sevices/api/apiQuestionServices';

// import WrongAnswerInput from './WrongAnswerInput';

import './Createquestion.css';

//Make custom styles for Material UI Button component
const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    button: {
        backgroundColor: 'skyblue',
        color: 'darkBlue',
        margin: theme.spacing(5),
        // margin: '3rem 5rem',
    }
}));
// let timer = null;
const Createquestion = ({ history }) => {

    //Apply materials custom styles
    const classes = useStyles();

    //Get actual state of Token if is authenticated
    const hasToken = JSON.parse(localStorage.getItem('sid'));
    const context = useContext(AppContext);
    let isAuth = !hasToken ? false : context.isAuthName;

    let [fields, setFields] = useState({ category: 'any', difficulty: 'any', question: '', correct_answer: '', incorrect_answers: [''] });
    // let [wrongAnswersState, setWrongAnswersState] = useState({
    //     index: `${0}`,
    //     wa: [<textarea
    //         type="text"
    //         className="form-control text"
    //         placeholder="Some wrong answer"
    //         name="incorrect_answers_0"
    //         value={fields.incorrect_answers[0]}
    //         onChange={(e) => handleInputChange(e, fields)}
    //     />]
    // });
    //Execute guard - redirect if is not authenticated
    if (!isAuth) {
        return <Redirect to="/auth/login" />;
    }

    // const createWrongAnswersTextareas = () => {
    //     return fields.incorrect_answers.map((wa, i) =>
    //         <div key={i}>
    //             <textarea
    //                 type="text"
    //                 className="form-control text"
    //                 placeholder={`Some wrong answer ${i}`}
    //                 name="incorrect_answers"
    //                 value={wa || ''}
    //                 onChange={(e) => handleInputChange(e, fields, i)}
    //             />
    //             <input type='button' value='remove' onClick={(e) => removeClick(e, fields, i)} />
    //         </div>
    //     )
    // }

    const removeClick = (event, oldState, i) => {
        event.preventDefault();
        oldState.incorrect_answers.splice(i, 1);
        setFields({ oldState });
    }

    function handleInputChange(event, oldState, i) {

        const target = event.target;

        // let wrongAnswers = [...oldState.incorrect_answers];
        // wrongAnswers[i] = event.target.value;



        //Auto resize the textareas
        if (target.nodeName === 'TEXTAREA') {
            target.style.height = 'auto';
            target.style.height = (target.scrollHeight) + 'px';
            oldState.incorrect_answers[i] = target.value;
            setFields(oldState);
            return;
        }

        // target.className += " text-content";
        // timer = setTimeout(() => {target.className="form-control text"}, 2500);

        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        setFields({
            ...oldState,
            [name]: value
        });
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

    // const addMoreAnswers = (event) => {
    //     event.preventDefault();
    //     const newIndex = wrongAnswersState.index + 1;
    //     wrongAnswersState.wa.push(
    //         <textarea
    //             type="text"
    //             className="form-control text"
    //             placeholder="Some wrong answer 1 / Some wrong answer 2 / Some wrong answer 3..."
    //             name={`incorrect_answers_${newIndex}`}
    //             value={`${fields.incorrect_answers}${newIndex}`}
    //             onChange={(e) => handleInputChange(e, fields)}
    //         />)
    //     setWrongAnswersState((oldState) => ({ index: `${oldState.index + 1}`, wa: oldState.wa }))
    //     // setWrongAnswersState((oldState) => oldState.concat(<WrongAnswerInput index={oldAnswers.length} inputValue={fields.incorrect_answers[oldAnswers.length]} />))
    // }

    // const changeSize = (event) => {
    //     event.preventDefault();
    //     event.target.className += " text-content";
    // }

    // const reduceSize = (event) => {
    //     event.preventDefault();
    //     event.target.className = "form-control";
    // }

    return (
        <div>
            <form onSubmit={handleSubmit} className="create-form">
                <h2 className="form-signin-heading">Create local Question</h2>

                {/* <br />
                <label htmlFor="amount">Number of Questions:</label>
                <br />
                <input type="number" name="amount" id="amount" className="form-control" min="1" max="50" value="10" />

                <br /> */}

                <br />
                <label htmlFor="category">Select Category: </label>
                <br />
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

                <br />

                <br />
                <label htmlFor="difficulty">Select Difficulty: </label>
                <br />
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

                <br />

                <br />
                <label htmlFor="question">Write the question: </label>
                <br />
                <textarea
                    type="text"
                    className="form-control text"
                    placeholder="Who (Where / What) is the...?"
                    name="question"
                    value={fields.question}
                    onChange={(e) => handleInputChange(e, fields)}
                // onFocus={(e) => changeSize(e)}
                // onMouseLeave={(e) => reduceSize(e)}
                />
                {/* value={this.state.password} onChange={this.handleChange} /> */}

                <br />

                <br />
                <label htmlFor="correct_answer">Write the correct answer: </label>
                <br />
                <textarea
                    type="text"
                    className="form-control text"
                    placeholder="Correct answer is..."
                    name="correct_answer"
                    value={fields.correct_answer}
                    onChange={(e) => handleInputChange(e, fields)}
                />
                {/* value={this.state.password} onChange={this.handleChange} /> */}

                <br />

                <br />
                <label htmlFor="incorrect_answers">Write the wrong answers: </label>
                <br />
                <div className="quiz-answers">
                    {/* {wrongAnswersState.wa.map((wa, i) => (
                        <div key={`${wa}${i}`}>
                            {wa}
                        </div>
                        // <WrongAnswerInput index={i} inputValue={fields.incorrect_answers[i]} />
                    ))} */}
                    {/* {wrongAnswersState.wa[0]} */}
                    {/* <textarea
                        type="text"
                        className="form-control text"
                        placeholder="Some wrong answer 1 / Some wrong answer 2 / Some wrong answer 3..."
                        name="incorrect_answers"
                        value={fields.incorrect_answers}
                        onChange={(e) => handleInputChange(e, fields)}
                    /> */}
                    {/* {createWrongAnswersTextareas()} */}

                    {fields.incorrect_answers.map((wa, i) =>
                        <div key={i}>
                            <textarea
                                type="text"
                                className="form-control text"
                                placeholder={`Some wrong answer ${i}`}
                                name="incorrect_answers"
                                value={wa || ''}
                                onChange={(e) => handleInputChange(e, fields, i)}
                            />
                            <input type='button' value='remove' onClick={(e) => removeClick(e, fields, i)} />
                        </div>
                    )}

                    <button onClick={addMoreAnswers} >
                        <AddCircleIcon />
                    </button>
                </div>
                {/* value={this.state.password} onChange={this.handleChange} /> */}

                <br />

                {/* <br />
                <label htmlFor="type">Select Type: </label>
                <br />
                <select name="type" className="form-control">
                    <option value="any">Any Type</option>
                    <option value="multiple">Multiple Choice</option>
                    <option value="boolean">True / False</option>
                </select>

                <br /> */}

                {/* <br />
                <label htmlFor="encode">Select Encoding: </label>
                <br />
                <select name="encode" className="form-control">
                    <option value="default">Default Encoding</option>
                    <option value="urlLegacy">Legacy URL Encoding</option>
                    <option value="url3986">URL Encoding (RFC 3986)</option>
                    <option value="base64">Base64 Encoding</option>
                </select>

                <input type="hidden" name="token" value="67235e41e438b551ab682c633cd1a439a3f8d55a6cd854a02e044a0c3a05ba3a" /> */}

                <br />
                <br />
                <Button
                    size='large'
                    className={classes.button}
                    variant="contained"
                    color="primary"
                    // href="/quizes/create-question"
                    // onClick={(e) => onButtonClick(e, '/quizes/create-question')}
                    startIcon={<CreateIcon />}
                >
                    Create Question
                </Button>
                {/* <button className="btn create-btn" type="submit">Create Question</button> */}
                {/* <button className="btn btn-lg btn-primary btn-block create-btn" type="submit">Create Question</button> */}
            </form>
        </div>
    );
}

export default Createquestion;