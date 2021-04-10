import { useContext } from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import { Image, Transformation } from 'cloudinary-react';

//Import global context and services
import AppContext from '../../AppContext';

//Import components from Material UI
import { Button, makeStyles, ImportContactsIcon } from '../../../config/materialConfig';

//Import components
import ProfileResults from '../ProfileResults';
import ProfileQuestions from '../ProfileQuestions';

//Import local styles
import './ProfileInfo.css';

//Make custom styles for Material UI Button component
const useStyles = makeStyles((theme) => ({
    button: {
        backgroundColor: 'skyblue',
        color: 'darkBlue',
        // margin: theme.spacing(5),
        borderRadius: "0em",
        margin: '2rem 1rem 5rem 5rem ',
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
    // const hasToken = JSON.parse(localStorage.getItem('sid'));
    // let isAuth = !hasToken ? false : appContext.isAuthName;

    //Get authentication state from global Context
    const appContext = useContext(AppContext);
    let isAuth = appContext.isAuthName;


    //Execute guard - redirect if is not authenticated - variant without HOC isAuthenticated
    // if (!isAuth) {
    //     return <Redirect to="/auth/login" />;
    // }

    return (
        <div className="quiz-content">
            <div className="profile-header">
                <Image cloudName="softquizy" className="profile-animation" publicId='profile-page-logo' />
                <div className="profile-data">
                    <h1 className="profile-title">{isAuth.toUpperCase()}</h1>
                    <Image cloudName="softquizy" className="profile-logo" publicId='placeholder-profile'>
                        <Transformation effect="bgremoval" radius="130" width="180" crop="scale" />
                    </Image>
                    <h6 className="profile-logo-title">Profile picture is comming up...</h6>
                </div>
            </div>
            <div className="profile-page-buttons">

                {/* PROFILE RESULTS BUTTON */}
                <Button
                    size='large'
                    className={classes.button}
                    variant="contained"
                    color="primary"
                    onClick={(e) => onButtonClick(e, '/profile/profile-info/results')}
                    startIcon={<ImportContactsIcon />}
                >
                    {isAuth}'s Results
                </Button>

                {/* PROFILE QUESTIONS BUTTON */}
                <Button
                    size='large'
                    className={classes.button}
                    variant="contained"
                    color="primary"
                    onClick={(e) => onButtonClick(e, '/profile/profile-info/profile-questions')}
                    startIcon={<ImportContactsIcon />}
                >
                    {isAuth}'s Questions
                </Button>
                <div className="profile-results">
                    <Switch>
                        <Route path={`${match.url}/results`} component={ProfileResults} />
                        <Route path={`${match.url}/profile-questions`} component={ProfileQuestions} />
                    </Switch>
                </div>
            </div>
        </div>
    );
}

export default Profile;