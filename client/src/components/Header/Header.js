import {
    // Switch,
    // Route,
    Link
    // Redirect,
    // useRouteMatch,
    // useParams
} from "react-router-dom";
import './Header.css';

const Header = (props) => {
    return (
        <header className="nav-header">
            <nav className="navbar">
            <Link to="/" className='navbar-brand'>Quizes</Link>
            {/* <a className='navbar-brand' href="home">Books</a> */}


            <ul className='navbar-nav'>
                {/* {{#if isLogged}} */}
                <li className='nav-item'>
                    <Link to="/profile" > Welcome, {'email'} </Link>
                    {/* <a className='nav-link' id="welcome-item" href="home"></a> */}
                </li>
                <li className='nav-item'>
                    <Link to="/auth/logout" > Logout</Link>
                    {/* <a className='nav-link' id="logout-link" href="logout">Logout</a> */}
                </li>
                {/* {{else}} */}
                <li className='nav-item'>
                    <Link to="/auth/login" > Login</Link>
                    {/* <a className='nav-link' id="login-link" href="login">Login</a> */}
                </li>
                <li className='nav-item'>
                    <Link to="/auth/register" > Register</Link>
                    {/* <a className='nav-link' id="register-link" href="register">Register</a> */}
                </li>
                {/* {{/if}} */}
            </ul>
            </nav >
        </header >
    );
}

export default Header;