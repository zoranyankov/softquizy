import { useContext, useEffect } from 'react';
import { Redirect } from 'react-router-dom';

import authService from '../../sevices/auth/authServices';

import AppContext from '../AppContext';

const Profile = (props) => {

    //Get actual state of Token if is authenticated
    const hasToken = JSON.parse(localStorage.getItem('sid'));
    const context = useContext(AppContext);
    let isAuth = !hasToken ? false : context.isAuthName;
    
    const userId = context.userId;
    // console.log(userId);

    useEffect(() => {
        console.log('inUseEffect of Profile comp');
        authService.get({userId})
        .then(user => console.log(user))
    },[userId, isAuth])

    //Execute guard - redirect if is not authenticated
    if (!isAuth) {
        return <Redirect to="/auth/login" />;
    }

    return (
        <div>
            <h1>THE PROFILE PAGE</h1>
        </div>
    );
}

export default Profile;