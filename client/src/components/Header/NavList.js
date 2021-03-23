import { Fragment, useContext } from 'react';
import CreateIcon from '@material-ui/icons/Create';
import ImportContactsIcon from '@material-ui/icons/ImportContacts';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import PersonIcon from '@material-ui/icons/Person';


import NavListItem from './NavListItem';
import AppContext from '../AppContext';


const NavList = () => {
    
    const isAuth = useContext(AppContext).isAuthName;
    // const isAuth = JSON.parse(localStorage.getItem('sid')).user.username;
    // console.log(isAuth);

    return (isAuth ?
        <Fragment>
            <NavListItem icon={<PersonIcon fontSize='small'color='primary'/>} to="/profile" content={` Welcome, ${isAuth} `} />
            <NavListItem icon={<CreateIcon fontSize='small'color='primary'/>} to="/quizes/create-question" content="Create Question" />
            <NavListItem icon={<ImportContactsIcon fontSize='small' color='primary' />} to="/quizes/choose-ext-quiz" content="Choose external Quiz" />
            <NavListItem icon={<ExitToAppIcon fontSize='small' color='primary' />} to="/auth/logout" content="Logout" />
            </Fragment> :
        <Fragment>
            <NavListItem icon={<VpnKeyIcon fontSize='small' color='primary' />} to="/auth/login" content="Login" />
            <NavListItem icon={<CreateIcon fontSize='small' color='primary' />} to="/auth/register" content="Register" />
        </Fragment>
    )
}

export default NavList;