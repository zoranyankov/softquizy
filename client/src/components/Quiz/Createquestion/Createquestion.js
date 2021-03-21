import React, { useState } from 'react';

import apiServises from '../../../sevices/api/apiServises';

import './Createquestion.css';

// let timer = null;
const Createquestion = ({ history }) => {

    let [fields, setFields] = useState({ category: 'any', difficulty: 'any', question: '', correct_answer: '', incorrect_answers: '' });
    const handleInputChange = (event, oldState) => {
        // clearInterval(timer);
        // console.log('timer');

        const target = event.target;
                
        //Auto resize the textareas
        if (target.nodeName === 'TEXTAREA') {
            target.style.height = 'auto';
            target.style.height = (target.scrollHeight) + 'px';
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
        apiServises.create(fields)
            .then(res => {
                console.log(res);
                history.push('/');
            })
            .catch(err => console.log(err))
    }

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
                <textarea
                    type="text"
                    className="form-control text"
                    placeholder="Some wrong answer 1 / Some wrong answer 2 / Some wrong answer 3..."
                    name="incorrect_answers"
                    value={fields.incorrect_answers}
                    onChange={(e) => handleInputChange(e, fields)}
                />
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

                <button className="btn create-btn" type="submit">Create Question</button>
                {/* <button className="btn btn-lg btn-primary btn-block create-btn" type="submit">Create Question</button> */}
            </form>
        </div>
    );
}

export default Createquestion;