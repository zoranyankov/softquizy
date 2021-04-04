import { Fragment, useContext } from 'react';

//Import global AppContext
import AppContext from '../AppContext';

//Import components
import Guestpage from './Guestpage';
import Userpage from './Userpage';
import './Home.css';

const Home = (props) => {

    //Get authentication state from global Context
    const appContext = useContext(AppContext);
    let isAuth = appContext.isAuthName;
   
    return (
        <Fragment>
            {isAuth ? <Userpage /> : <Guestpage />}
        </Fragment>
    );
}

export default Home;