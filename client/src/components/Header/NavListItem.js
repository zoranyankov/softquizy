import { Link } from "react-router-dom";

const NavListItem = ({ to, content }) => {
    return (
        <li className='nav-item'>
            <Link to={to} > <span className="nav-content">{content}</span> </Link>
            {/* <a className='nav-link' id="welcome-item" href="home"></a> */}
        </li>
    );
}

export default NavListItem;