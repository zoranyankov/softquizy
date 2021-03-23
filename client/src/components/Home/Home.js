import { Fragment, useContext } from 'react';

import AppContext from '../AppContext';

import Guestpage from './Guestpage';
import Userpage from './Userpage';
import './Home.css';

const Home = (props) => {

    const hasToken = JSON.parse(localStorage.getItem('sid'));
    const context = useContext(AppContext);
    let isAuth = !hasToken ? false : context.isAuthName;
   
    console.log(isAuth);

    return (
        <Fragment>
            {isAuth ? <Userpage /> : <Guestpage />}
        </Fragment>
    );
}

export default Home;