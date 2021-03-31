import { Fragment, useContext } from 'react';

import AppContext from '../AppContext';

import Guestpage from './Guestpage';
import Userpage from './Userpage';
import './Home.css';

const Home = (props) => {

    //Get actual state of Token if is authenticated
    const hasToken = JSON.parse(localStorage.getItem('sid'));
    const appContext = useContext(AppContext);
    let isAuth = !hasToken ? false : appContext.isAuthName;
   
    // console.log(isAuth);

    return (
        <Fragment>
            {isAuth ? <Userpage /> : <Guestpage />}
        </Fragment>
    );
}

export default Home;