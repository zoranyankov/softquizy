import { Link } from "react-router-dom";

const NavListItem = ({ to, content, icon }) => {
    return (
        <li className="nav-item">
            <Link to={to} > {icon}<span className="nav-link">{content}</span> </Link>
            {/* <a className="nav-link" id="welcome-item" href="home"></a> */}
        </li>
    );
}

export default NavListItem;