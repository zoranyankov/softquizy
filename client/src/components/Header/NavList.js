import { Fragment, useContext } from 'react';

//Import icons from Material UI
import { CreateIcon, ImportContactsIcon, ExitToAppIcon, VpnKeyIcon, PersonIcon } from '../../config/materialConfig';

//Import components
import NavListItem from './NavListItem';
import AppContext from '../AppContext';


const NavList = () => {

    const isAuth = useContext(AppContext).isAuthName;

    return (isAuth
        ? <Fragment>
            <NavListItem icon={<PersonIcon fontSize='small' color='primary' className='matIcon' />} to="/profile/profile-info" content={` Welcome, ${isAuth.toUpperCase()} `} />
            <NavListItem icon={<CreateIcon fontSize='small' color='primary' className='matIcon' />} to="/quizes/create-question" content="Create Question" />
            <NavListItem icon={<ImportContactsIcon fontSize='small' color='primary' className='matIcon external' />} to="/quizes/choose-ext-quiz" content="Choose external Quiz" />
            <NavListItem icon={<ExitToAppIcon fontSize='small' color='primary' className='matIcon' />} to="/auth/logout" content="Logout" />
        </Fragment>
        : <Fragment>
            <NavListItem icon={<VpnKeyIcon fontSize='small' color='primary' className='matIcon' />} to="/auth/login" content="Login" />
            <NavListItem icon={<CreateIcon fontSize='small' color='primary' className='matIcon' />} to="/auth/register" content="Register" />
        </Fragment>
    )
}

export default NavList;