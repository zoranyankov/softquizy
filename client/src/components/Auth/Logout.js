import { Redirect } from 'react-router-dom';

const Logout = () => {
    localStorage.removeItem('sid');
    return <Redirect to="/" />
}

export default Logout;