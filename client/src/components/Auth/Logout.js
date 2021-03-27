import { useContext, useEffect } from 'react';
import { Redirect } from 'react-router-dom';

//Import services
import AppContext from '../AppContext';

const Logout = () => {
    const { setIsAuth } = useContext(AppContext);
    useEffect(() => {
        localStorage.removeItem('sid');
        setIsAuth(false);
    })
    return <Redirect to="/" />
}

export default Logout;