import { useContext, useEffect, useState } from 'react';
// import { Redirect } from 'react-router-dom';

//Import global context and services
import AppContext from '../../AppContext';
import apiResultServices from '../../../sevices/api/apiResultServices';

//Import components
import Accordion from '../../Accordion';
import Toast from '../../Shared/Toast';

//Import local styles
import './ProfileResults.css';

const ProfileResults = (props) => {

    //Get actual state of Token if is authenticated
        // const hasToken = JSON.parse(localStorage.getItem('sid'));
        // let isAuth = !hasToken ? false : appContext.isAuthName;

    //Get authentication state from global Context
    const appContext = useContext(AppContext);
    let isAuth = appContext.isAuthName;

    let [userResults, setUserResults] = useState([]);
    let [noData, setNoData] = useState(false);

    const userId = appContext.userId;

    useEffect(() => {
        apiResultServices.getByUserId(userId)
            .then(results => {
                setNoData(false);
                setUserResults(results)
            })
            .catch(err => {
                console.log('Profile get Results error: ' + err);
                setNoData(true);
            })
    }, [userId, isAuth])

    //Execute guard - redirect if is not authenticated - variant without HOC isAuthenticated
        // if (!isAuth) {
        //     return <Redirect to="/auth/login" />;
        // }

    // Notify when there is stil no results for this user
    if (noData) {
        return (
            <Toast
                toastList={[{ id: "You haven't complete any Quezes !", title: 'Warning', description: "You haven't complete any Quezes !", position: 'middle' }]}
                // position="bottom-right"
                position="middle"
            />
        )
    }

    // Initial render   
    if (userResults.length === 0) {
        return (
            <Toast
                toastList={[{ id: "LoadingResults", title: "Info", description: "Loading Results..." }]}
                // position="bottom-right"
                position="middle"
            />
        )
    }

    return (
        <>
            <h3>RESULTS HISTORY</h3>
            <Accordion data={userResults} type="results" />
            <br />
            <br />
            <br />
        </>
    );
}

export default ProfileResults;