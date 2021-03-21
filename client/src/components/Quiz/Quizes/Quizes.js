import {
    Switch,
    Route,
    // Redirect,
    useRouteMatch,
    // useParams
} from "react-router-dom";

import Quiz from '../Quiz';
import Createquestion from '../Createquestion';
import Choosequiz from '../Choosequiz';


// import Login from './Login';
// import Register from './Register';
// import Logout from './Logout';

// import './Quizes.css';

const Quizes = (props) => {
    let match = useRouteMatch();

    return (
        // <div className="auth-containter">
        <Switch>
            {/* <Route path="/quizes/local/:quizName" component={Quiz} /> */}
            <Route path={`${match.url}/local/:category/:quizName`} component={Quiz} />
            <Route path={`${match.url}/external/:category/:quizName`} component={Quiz} />
            <Route path={`${match.url}/create-question`} component={Createquestion} />
            <Route path={`${match.url}/choose-ext-quiz`} component={Choosequiz} />
        </Switch>
        // </div>

    )
}

export default Quizes;