import { useContext } from 'react';
import { Redirect, Switch, Route, useRouteMatch } from 'react-router-dom';

//Import global context and services
import AppContext from '../AppContext';

//Import components from Material UI
import Button from '@material-ui/core/Button';
// import VpnKeyIcon from '@material-ui/icons/VpnKey';
import { makeStyles } from '@material-ui/core/styles';
// import CreateIcon from '@material-ui/icons/Create';
import ImportContactsIcon from '@material-ui/icons/ImportContacts';

//Import components
import ProfileResults from '../Profile/ProfileResults';
import ProfileQuestions from '../Profile/ProfileQuestions';

//Import local styles
import './Profile.css';

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
    },
    create_button: {
        backgroundColor: 'green',
        color: 'darkBlue',
        margin: theme.spacing(5),
        // margin: '3rem 5rem',
    },
}));

const Profile = ({ history }) => {

    const onButtonClick = (event, path) => {
        event.preventDefault();
        history.push(path);
    }

    const classes = useStyles();

    let match = useRouteMatch();

    //Get actual state of Token if is authenticated
    const hasToken = JSON.parse(localStorage.getItem('sid'));
    const appContext = useContext(AppContext);
    let isAuth = !hasToken ? false : appContext.isAuthName;


    //Execute guard - redirect if is not authenticated
    if (!isAuth) {
        return <Redirect to="/auth/login" />;
    }

    return (
        <div className="quiz-content">
            <div className="logo" />
            {/* <h1>THE PROFILE PAGE</h1> */}
            <div className="profile-page">

                {/* PROFILE RESULTS BUTTON */}
                <Button
                    size='large'
                    className={classes.button}
                    variant="contained"
                    color="primary"
                    // href="/profile/results"
                    onClick={(e) => onButtonClick(e, '/profile/results')}
                    startIcon={<ImportContactsIcon />}
                >
                    Profile Results
                </Button>

                {/* PROFILE QUESTIONS BUTTON */}
                <Button
                    size='large'
                    className={classes.button}
                    variant="contained"
                    color="primary"
                    // href="/profile/questions"
                    onClick={(e) => onButtonClick(e, '/profile/questions')}
                    startIcon={<ImportContactsIcon />}
                >
                    Profile Questions
                </Button>

                <Switch>
                    <Route path={`${match.url}/results`} component={ProfileResults} />
                    <Route path={`${match.url}/questions`} component={ProfileQuestions} />
                </Switch>

                {/* <Accordion data={userResults} /> */}
                {/* {userResults.map(result => (
                    <div className="quiz-results" key={result._id}>
                        <ResultsTable rows={result.userResults} score={result.score} quizName={result.quizName} />
                    </div>
                ))} */}
            </div>
        </div>
    );
}

export default Profile;