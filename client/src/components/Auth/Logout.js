import { useContext, useEffect } from 'react';
import { Redirect } from 'react-router-dom';

//Import services
import AppContext from '../AppContext';

const Logout = () => {
    const { setIsAuth, setNotifyList } = useContext(AppContext);
    useEffect(() => {
        setIsAuth(false);
        setNotifyList([{id:'You leave successfully', title:'Success', description: 'You leave successfully'}]);
        return () => {
            localStorage.removeItem('sid');
        }
    })
    return <Redirect to="/" />
}
export default Logout;