import { Switch, Route, useRouteMatch } from "react-router-dom";

import Login from './Login';
import Register from './Register';
import Logout from './Logout';
import ErrorPage from '../ErrorPage';

import './Auth.css';

const Auth = () => {
    let match = useRouteMatch();

    return (
        <Switch>
            <Route path={`${match.url}/login`} component={Login} />
            <Route path={`${match.url}/register`} component={Register} />
            <Route path={`${match.url}/logout`} component={Logout} />
            <Route path="*" component={ErrorPage} />
        </Switch>
    )
}

export default Auth;