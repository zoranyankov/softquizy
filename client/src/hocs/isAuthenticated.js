import { useContext } from 'react';
// import { useHistory } from 'react-router-dom';
import { Redirect } from 'react-router-dom';

//Import global AppContext
import AppContext from '../components/AppContext';

const isAuthenticated = (TargetComponent) => {

    const Component = (props) => {
        const { isAuthName } = useContext(AppContext);
        // const history = useHistory();

        if (!isAuthName) {
            return <Redirect to="/auth/login" />;
            // history.push('/auth/login');
            // return null;
        }

        return <TargetComponent {...props} />
    }

    return Component;
};

export default isAuthenticated;