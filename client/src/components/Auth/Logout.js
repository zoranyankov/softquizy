import { useContext, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import AppContext from '../AppContext';

const Logout = () => {
    const isAuth = useContext(AppContext);
    useEffect(() => {
        localStorage.removeItem('sid');
        isAuth.updateIsAuth('out');       
    })
    return <Redirect to="/" />
}

export default Logout;