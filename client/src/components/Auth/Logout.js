import { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import AppContext from '../AppContext';

const Logout = () => {
    const isAuth = useContext(AppContext);
    console.log(isAuth);
    localStorage.removeItem('sid');
    isAuth.updateIsAuth('out');

    return <Redirect to="/" />
}

export default Logout;