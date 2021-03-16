import {
    Switch,
    Route,
    // Redirect,
    useRouteMatch,
    // useParams
} from "react-router-dom";

import Login from './Login';
import Register from './Register';
import Logout from './Logout';

import './Auth.css';

const Auth = (props) => {
    let match = useRouteMatch();

    return (
        // <div className="auth-containter">
            <Switch>
                <Route path={`${match.url}/login`} component={Login} />
                <Route path={`${match.url}/register`} component={Register} />
                <Route path={`${match.url}/logout`} render={Logout} />
            </Switch>
        // </div>

    )
}

export default Auth;