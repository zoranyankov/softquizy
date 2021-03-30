import React, { useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';

//import global AppContext
import AppContext from '../../AppContext';

//Import components from Material UI
import ImportContactsIcon from '@material-ui/icons/ImportContacts';

//Import services
import triviaServises from '../../../sevices/trivia/triviaServices';

//Import shared components
import Notificate from '../../Shared/Notificate';
import ButtonLink from '../../Shared/ButtonLink';

import './Choosequiz.css';



const Choosequiz = ({ history }) => {

    //Get actual state of Token if is authenticated
    const hasToken = JSON.parse(localStorage.getItem('sid'));
    const context = useContext(AppContext);
    let isAuth = !hasToken ? false : context.isAuthName;

    // console.log(context);

    let [fields, setFields] = useState({ trivia_category: 'any', trivia_difficulty: 'any', errors: '', errorTimeout: '' });

    //Execute guard - redirect if is not authenticated
    if (!isAuth) {
        return <Redirect to="/auth/login" />;
    }

    const handleInputChange = (event, oldState) => {
        const target = event.target;
        // console.log(target.value);

        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        setFields({
            ...oldState,
            [name]: value
        });
        clearInterval(fields.errorTimeout[name]);

        const err = (value === 'any') ? `Field ${name.replace('trivia_', '')} is required` : null;
        // this.setState((oldState => ({ ...oldState, errors: { ...oldState.errors, [inputName]: null } })));

        if (err) {
            setFields(oldState => ({ ...oldState,
            errorTimeout :{[name] : setTimeout(() => {
            setFields((oldState => ({ ...oldState, errors: { ...oldState.errors, [name]: err } })))
            }, 3000)}}));
        } else {
            setFields((oldState => ({ ...oldState, errors: { ...oldState.errors, [name]: null } })))
        }

        // if (value === 'any') {
        //     setFields((oldState => ({ ...oldState, errors: { ...oldState.errors, [name]: `Field ${name.replace('trivia_', '')} is required` } })));
        // }

    }

    const handleSubmit = (event) => {
        event.preventDefault();

        if (fields.trivia_category === 'any') {
            setFields((oldState => ({ ...oldState, errors: { ...oldState.errors, trivia_category: `Field Category is required` } })));
            return;
        } else {
            setFields((oldState => ({ ...oldState, errors: { ...oldState.errors, trivia_category: null } })));
        }
        if (fields.trivia_difficulty === 'any') {
            setFields((oldState => ({ ...oldState, errors: { ...oldState.errors, trivia_difficulty: `Field Difficulty is required` } })));
            return;
        } else {
            setFields((oldState => ({ ...oldState, errors: { ...oldState.errors, trivia_difficulty: null } })));
        }

        triviaServises.getAll(fields)
            .then(res => {
                if (res.results.length === 0) {
                    context.setNotifyList([{id: 'Not Found', title:'Error', description: `Still don't have this quiz :(`}]);
                }
                context.setTrivia(res.results);
                history.push(`/quizes/external/${fields.trivia_category}/${res.results[0].category}`);
            })
            .catch(err => {
                console.log('trivia error');
                console.log(err);
                // const errorsList = err.errors.map((err, i) => {
                //     return ( { id: i + err.message, title: 'Error', description: err.message, position:'middle' });
                // });
                // context.setNotifyList(errorsList);
            })
    }


    return (
        <div>
            <form onSubmit={handleSubmit} className="form-api">
                <h2 className="form-signin-heading">Choose form Trivia API</h2>

                {/* <label htmlFor="trivia_amount">Number of Questions:</label>
                <input type="number" name="trivia_amount" id="trivia_amount" className="form-control" min="1" max="50" value="10" />

                <br /> */}
                <br />

                <label htmlFor="trivia_category">Select Category: </label>
                <br />
                <select
                    name="trivia_category"
                    className="form-control"
                    value={fields.trivia_category}
                    onChange={(e) => handleInputChange(e, fields)}
                >
                    <option value="any">Any Category</option>
                    <option value="9">General Knowledge</option><option value="10">Entertainment: Books</option><option value="11">Entertainment: Film</option><option value="12">Entertainment: Music</option><option value="13">Entertainment: Musicals &amp; Theatres</option><option value="14">Entertainment: Television</option><option value="15">Entertainment: Video Games</option><option value="16">Entertainment: Board Games</option><option value="17">Science &amp; Nature</option><option value="18">Science: Computers</option><option value="19">Science: Mathematics</option><option value="20">Mythology</option><option value="21">Sports</option><option value="22">Geography</option><option value="23">History</option><option value="24">Politics</option><option value="25">Art</option><option value="26">Celebrities</option><option value="27">Animals</option><option value="28">Vehicles</option><option value="29">Entertainment: Comics</option><option value="30">Science: Gadgets</option><option value="31">Entertainment: Japanese Anime &amp; Manga</option><option value="32">Entertainment: Cartoon &amp; Animations</option>
                </select>
                <Notificate type="error">{fields.errors.trivia_category}</Notificate>
                <br />
                <br />

                <label htmlFor="trivia_difficulty">Select Difficulty: </label>
                <br />
                <select
                    name="trivia_difficulty"
                    className="form-control"
                    value={fields.trivia_difficulty}
                    onChange={(e) => handleInputChange(e, fields)}
                >
                    <option value="any">Any Difficulty</option>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                </select><br />
                <Notificate type="error">{fields.errors.trivia_difficulty}</Notificate>

                {/* <label htmlFor="trivia_type">Select Type: </label>
                <br />
                <select name="trivia_type" className="form-control">
                    <option value="any">Any Type</option>
                    <option value="multiple">Multiple Choice</option>
                    <option value="boolean">True / False</option>
                </select>

                <br />
                <br /> */}

                {/*<label htmlFor="trivia_encode">Select Encoding: </label>
                <br />
                 <select name="trivia_encode" className="form-control">
                    <option value="default">Default Encoding</option>
                    <option value="urlLegacy">Legacy URL Encoding</option>
                    <option value="url3986">URL Encoding (RFC 3986)</option>
                    <option value="base64">Base64 Encoding</option>
                </select> */}
                {/* 
                <input type="hidden" name="token" value="67235e41e438b551ab682c633cd1a439a3f8d55a6cd854a02e044a0c3a05ba3a" />

                <br /> */}
                <ButtonLink component={<ImportContactsIcon />} type="submit">
                    Get Quiz from Trivia
                </ButtonLink>

                {/* <button className="btn create-btn" type="submit">Get Quiz from Trivia</button> */}
            </form>
        </div>
    );
}

export default Choosequiz;