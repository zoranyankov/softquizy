import { useContext } from 'react';
import { Redirect } from 'react-router-dom';

import AppContext from '../AppContext';

const Profile = (props) => {
    const context = useContext(AppContext);
    if (!context.isAuthName) {
        return <Redirect to="/" />;
    }
    return (
        <div>
            <h1>THE PROFILE PAGE</h1>
        </div>
    );
}

export default Profile;