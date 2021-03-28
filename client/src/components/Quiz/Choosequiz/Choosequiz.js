import React, { useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';

import AppContext from '../../AppContext';

//Import components from Material UI
import Button from '@material-ui/core/Button';
// import VpnKeyIcon from '@material-ui/icons/VpnKey';
import { makeStyles } from '@material-ui/core/styles';
import ImportContactsIcon from '@material-ui/icons/ImportContacts';


import triviaServises from '../../../sevices/trivia/triviaServices';
import './Choosequiz.css';

// {trivia_category
//     trivia_difficulty
//     trivia_type}

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
        marginTop: '7rem',
        // margin: '3rem 5rem',
    }
}));

const Choosequiz = ({ history }) => {

    //Apply materials custom styles
    const classes = useStyles();

    //Get actual state of Token if is authenticated
    const hasToken = JSON.parse(localStorage.getItem('sid'));
    const context = useContext(AppContext);
    let isAuth = !hasToken ? false : context.isAuthName;

    // console.log(context);

    let [fields, setFields] = useState({ trivia_category: 'any', trivia_difficulty: 'any' });

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
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        triviaServises.getAll(fields)
            .then(res => {
                context.setTrivia(res.results);
                history.push(`/quizes/external/${fields.trivia_category}/${res.results[0].category}`);
            })
            .catch(err => console.log(err))
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
                    <option value="9">General Knowledge</option><option value="10">Entertainment: Books</option><option value="11">Entertainment: Film</option><option value="12">Entertainment: Music</option><option value="13">Entertainment: Musicals &amp; Theatres</option><option value="14">Entertainment: Television</option><option value="15">Entertainment: Video Games</option><option value="16">Entertainment: Board Games</option><option value="17">Science &amp; Nature</option><option value="18">Science: Computers</option><option value="19">Science: Mathematics</option><option value="20">Mythology</option><option value="21">Sports</option><option value="22">Geography</option><option value="23">History</option><option value="24">Politics</option><option value="25">Art</option><option value="26">Celebrities</option><option value="27">Animals</option><option value="28">Vehicles</option><option value="29">Entertainment: Comics</option><option value="30">Science: Gadgets</option><option value="31">Entertainment: Japanese Anime &amp; Manga</option><option value="32">Entertainment: Cartoon &amp; Animations</option>		</select>

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

                <Button
                    type="submit"
                    size='large'
                    className={classes.button}
                    variant="contained"
                    color="primary"
                    // href="/quizes/create-question"
                    // onClick={(e) => onButtonClick(e, '/quizes/create-question')}
                    startIcon={<ImportContactsIcon />}
                >
                    Get Quiz from Trivia
                </Button>

                {/* <button className="btn create-btn" type="submit">Get Quiz from Trivia</button> */}
            </form>
        </div>
    );
}

export default Choosequiz;