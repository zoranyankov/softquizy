import { Switch, Route, useRouteMatch } from 'react-router-dom';

//Import components
import ProfileInfo from './ProfileInfo';
import ManageQuestion from './ManageQuestion';
import ErrorPage from '../ErrorPage';

const Profile = ({ history }) => {

    let match = useRouteMatch();

    return (
        <div className="profile-results">
            
            <Switch>
                <Route path={`${match.url}/profile-info`} component={ProfileInfo} />
                <Route path={`${match.url}/questions/:action/:questionId`} component={ManageQuestion} />
                <Route path={`${match.url}/*`} component={ErrorPage} />
            </Switch>
        </div>
    );
}

export default Profile;