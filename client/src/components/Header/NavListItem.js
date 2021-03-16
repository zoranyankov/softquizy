import { Link } from "react-router-dom";

const NavListItem = ({to, content}) => {
    return (
        <li className='nav-item'>
            <Link to={to} > {content} </Link>
            {/* <a className='nav-link' id="welcome-item" href="home"></a> */}
        </li>
    );
}

export default NavListItem;