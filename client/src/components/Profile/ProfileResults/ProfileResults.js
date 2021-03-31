import { useContext, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';

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
    const hasToken = JSON.parse(localStorage.getItem('sid'));
    const appContext = useContext(AppContext);
    let isAuth = !hasToken ? false : appContext.isAuthName;

    let [userResults, setUserResults] = useState([]);

    const userId = appContext.userId;
    // console.log(userId);

    useEffect(() => {
        console.log('inUseEffect of Profile comp');
        apiResultServices.getByUserId(userId)
            .then(results => {
                setUserResults(results)
            })
            .catch(err => console.log('Profile get Results error: ' + err))
    }, [userId, isAuth])

    //Execute guard - redirect if is not authenticated
    if (!isAuth) {
        return <Redirect to="/auth/login" />;
    }

    //Initial render
    if (userResults.length === 0) {
        return (
            <Toast
                toastList={[{ id: "LoadingResults", title: "Info", description: "Loading Results..." }]}
                // position="bottom-right"
                position="middle"
            />
        )
    }
    // return <h1>Still loading...</h1>;
    //     appContext.setNotifyList([{ id: 'Loading results', title: 'Info', description: 'Loading results', position: 'middle' }])
    //     return null;
    // }

    return (
        <>
            <h3>RESULTS HISTORY</h3>
            <Accordion data={userResults} type="results" />
            {/* {userResults.map(result => (
                    <div className="quiz-results" key={result._id}>
                        <ResultsTable rows={result.userResults} score={result.score} quizName={result.quizName} />
                    </div>
                ))} */}
            {/* {userResults.length === 0 && <Toast
                        toastList={appContext.notifyList}
                        // position="bottom-right"
                        position="top-left"
                    />} */}
            <br />
            <br />
            <br />
        </>
    );
}

export default ProfileResults;