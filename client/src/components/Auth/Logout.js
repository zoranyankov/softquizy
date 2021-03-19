import { useContext, useRef } from 'react';
import { Redirect } from 'react-router-dom';
import AppContext from '../AppContext';

const Logout = () => {
    const isAuth = useContext(AppContext);
    console.log(isAuth);
    const willMount = useRef(true);
    console.log(willMount);
    if(willMount.current) {
        localStorage.removeItem('sid');
        isAuth.updateIsAuth('out');
        willMount.current = false;
        <Redirect to="/" />;
        return null;
    }

    return <Redirect to="/" />
}

export default Logout;