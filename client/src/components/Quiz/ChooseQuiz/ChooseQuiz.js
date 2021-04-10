import React, { useState, useContext } from 'react';
// import { Redirect } from 'react-router-dom';
import { Image } from 'cloudinary-react';

//import global AppContext
import AppContext from '../../AppContext';

//Import components from Material UI
import { ImportContactsIcon } from '../../../config/materialConfig';

//Import services
import triviaServises from '../../../sevices/trivia/triviaServices';

//Import shared components
import Notificate from '../../Shared/Notificate';
import ButtonLink from '../../Shared/ButtonLink';

//Import custom styles for this component
import './ChooseQuiz.css';

const errorTimeout = {};

const ChooseQuiz = ({ history }) => {

    //Get actual state of Token if is authenticated
        // const hasToken = JSON.parse(localStorage.getItem('sid'));
        // let isAuth = !hasToken ? false : appContext.isAuthName;

    //Get the state of Token from global Context
    const appContext = useContext(AppContext);
    // let isAuth = appContext.isAuthName;

    //Controll the fields for real-time validation
    let [fields, setFields] = useState({ trivia_category: 'any', trivia_difficulty: 'any', errors: '' });

    //Execute guard - redirect if is not authenticated - variant without HOC isAuthenticated
        // if (!isAuth) {
        //     return <Redirect to="/auth/login" />;
        // }

    const handleInputChange = (event, oldState) => {
        
        //Get target field and it's value
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        clearInterval(errorTimeout[name]);
        setFields({
            ...oldState,
            [name]: value,
            errorTimeout: { ...oldState.errorTimeout, [name]: '' }
        });

        const err = (value === 'any') ? `Field ${name.replace('trivia_', '')} is required` : null;

        if (err) {
            errorTimeout[name] = setTimeout(() => {
                setFields((oldState => ({ ...oldState, errors: { ...oldState.errors, [name]: err } })))
            }, 1000)
        } else {
            setFields((oldState => ({ ...oldState, errors: { ...oldState.errors, [name]: null } })))
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        //Check for errors
        let errors = [];
        if (fields.trivia_category === 'any') {
            errors.push(`Field Category is required`); 
            setFields((oldState => ({ ...oldState, errors: { ...oldState.errors, trivia_category: `Field Category is required` } })));
        } else {
            setFields((oldState => ({ ...oldState, errors: { ...oldState.errors, trivia_category: null } })));
        }
        if (fields.trivia_difficulty === 'any') {
            errors.push(`Field Difficulty is required`); 
            setFields((oldState => ({ ...oldState, errors: { ...oldState.errors, trivia_difficulty: `Field Difficulty is required` } })));
        } else {
            setFields((oldState => ({ ...oldState, errors: { ...oldState.errors, trivia_difficulty: null } })));
        }
        if (errors.length > 0) { 
            // errors = errors.map(er => ({id: er, title: "Error", description: er}));
            appContext.setNotifyList([{id: "AllFieldsRequired", title: "Error", description: "All fields are required"}]);
            return 
         }
         
         //If no errors in user input - load (fetch) the quiz
        triviaServises.getAll(fields)
            .then(res => {
                if (res.response_code === 2) {
                    appContext.setNotifyList([{ id: 'Not Found', title: 'Error', description: `Still don't have this quiz :(` }]);
                    return;
                }
                if (res.results.length === 0) {
                    appContext.setNotifyList([{ id: 'Not Found', title: 'Error', description: `Still don't have this quiz :(` }]);
                    return;
                }
                appContext.setTrivia(res.results);
                history.push(`/quizes/external/${fields.trivia_category}/${res.results[0].category}`);
            })
            .catch(err => {
                console.log('Trivia fetch error' + err);
                const errorsList = err.errors.map((err, i) => {
                    return ( { id: i + err.message, title: 'Error', description: err.message, position:'middle' });
                });
                appContext.setNotifyList(errorsList);
            })
    }

    return (
        <div  className="choose-external-content">
            <div className="choose-external-header">
                <Image cloudName="softquizy" className="choose-external-logo" publicId='choose-quiz'/>
            </div>
            <form onSubmit={handleSubmit} className="choose-external-form">
                <h2 className="choose-external-title">Choose form Trivia API</h2><br />
                <label htmlFor="trivia_category">Select Category: </label><br />
                <select
                    name="trivia_category"
                    className="form-control"
                    value={fields.trivia_category}
                    onChange={(e) => handleInputChange(e, fields)}
                >
                    <option value="any">Any Category</option>
                    <option value="9">General Knowledge</option><option value="10">Entertainment: Books</option><option value="11">Entertainment: Film</option><option value="12">Entertainment: Music</option><option value="13">Entertainment: Musicals &amp; Theatres</option><option value="14">Entertainment: Television</option><option value="15">Entertainment: Video Games</option><option value="16">Entertainment: Board Games</option><option value="17">Science &amp; Nature</option><option value="18">Science: Computers</option><option value="19">Science: Mathematics</option><option value="20">Mythology</option><option value="21">Sports</option><option value="22">Geography</option><option value="23">History</option><option value="24">Politics</option><option value="25">Art</option><option value="26">Celebrities</option><option value="27">Animals</option><option value="28">Vehicles</option><option value="29">Entertainment: Comics</option><option value="30">Science: Gadgets</option><option value="31">Entertainment: Japanese Anime &amp; Manga</option><option value="32">Entertainment: Cartoon &amp; Animations</option>
                </select>
                <Notificate type="error">{fields.errors.trivia_category || <br />}</Notificate><br />
                <label htmlFor="trivia_difficulty">Select Difficulty: </label><br />
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
                <Notificate type="error">{fields.errors.trivia_difficulty || <br />}</Notificate>
                <ButtonLink component={<ImportContactsIcon />} type="submit">
                    Get Quiz from Trivia
                </ButtonLink>
            </form>
        </div>
    );
}

export default ChooseQuiz;
