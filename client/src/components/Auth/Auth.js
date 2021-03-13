import {
    Switch,
    Route,
    // Redirect,
    useRouteMatch,
    // useParams
} from "react-router-dom";

import Login from './Login';
import Register from './Register';

import './Auth.css';

const Auth = (props) => {
    let match = useRouteMatch();
    console.log(match);

    return (
        // <div className="auth-containter">
            <Switch>
                <Route path={`${match.url}/login`}>
                    <Login />
                </Route>
                <Route path={`${match.url}/register`}>
                    <Register />
                </Route>
                <Route to={`${match.url}/logout`}></Route>
            </Switch>
        // </div>

    )
}

export default Auth;