import { Fragment, useContext } from 'react';
import NavListItem from './NavListItem';
import AppContext from '../AppContext';



const NavList = () => {
    
    const isAuth = useContext(AppContext).isAuthName;
    // const isAuth = JSON.parse(localStorage.getItem('sid')).user.username;
    // console.log(isAuth);

    return (isAuth ?
        <Fragment>
            <NavListItem to="/profile" content={` Welcome, ${isAuth} `} />
            <NavListItem to="/quizes/create-question" content="Create Question" />
            <NavListItem to="/quizes/choose-ext-quiz" content="Choose external Quiz" />
            <NavListItem to="/auth/logout" content="Logout" />
            </Fragment> :
        <Fragment>
            <NavListItem to="/auth/login" content="Login" />
            <NavListItem to="/auth/register" content="Register" />
        </Fragment>
    )
}

export default NavList;