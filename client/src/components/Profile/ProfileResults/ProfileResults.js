import { useContext, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';

//Import global context and services
import AppContext from '../../AppContext';
import apiResultServices from '../../../sevices/api/apiResultServices';

//Import components
import Accordion from '../../Accordion';

//Import local styles
import './ProfileResults.css';

const ProfileResults = (props) => {

    //Get actual state of Token if is authenticated
    const hasToken = JSON.parse(localStorage.getItem('sid'));
    const context = useContext(AppContext);
    let isAuth = !hasToken ? false : context.isAuthName;

    let [userResults, setUserResults] = useState([]);

    const userId = context.userId;
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
        return <h1>Still loading...</h1>;
    }

    return (
        <div className="quiz-content">
                        <h3>RESULTS HISTORY</h3>
            <div className="profile-page">
                <Accordion data={userResults} type="results" />
                {/* {userResults.map(result => (
                    <div className="quiz-results" key={result._id}>
                        <ResultsTable rows={result.userResults} score={result.score} quizName={result.quizName} />
                    </div>
                ))} */}
            </div>
            <br />
            <br />
            <br />
        </div>
    );
}

export default ProfileResults;