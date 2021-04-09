import React from 'react';
import { Link } from "react-router-dom";

//Import icon from Material UI
import { HomeIcon } from '../../config/materialConfig';

//Import components
import NavList from './NavList';

import './Header.css';

const Header = (props) => {

    return (
        <header className="nav-header">
            <nav className="navbar">
                <Link to="/" className='navbar-brand'><span className="nav-content nav-link" ><HomeIcon fontSize='small' color='primary' className='matIcon' /> Quizes</span></Link>
                <ul className='navbar-nav'>
                    <NavList />
                </ul>
            </nav >
        </header >
    );
}

export default Header;