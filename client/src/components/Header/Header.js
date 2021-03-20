import React from 'react';
import { Link } from "react-router-dom";
// import AppContext from '../AppContext';

import NavList from './NavList';

import './Header.css';

const Header = (props) => {
    // let [isAuth, setAuth] = React.useState('false');
    // setAuth = (localStorage.getItem('sid'));
    // const isAuth = JSON.parse(localStorage.getItem('sid')).user.username;
    // console.log(isAuth);

    // const isAuth = JSON.parse(useContext(AppContext)).user.username;

    return (
        <header className="nav-header">
            <nav className="navbar">
                <Link to="/" className='navbar-brand'><span className="nav-content">Quizes</span></Link>
                {/* <a className='navbar-brand' href="home">Books</a> */}

                <ul className='navbar-nav'>
                    <NavList />
                </ul>
            </nav >
        </header >
    );
}

export default Header;