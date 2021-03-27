import { useContext, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';

//Import global context and services
import AppContext from '../AppContext';
import apiResultServices from '../../sevices/api/apiResultServices';

//Import components
import ResultsTable from '../Quiz/ResultsTable';

//Import local styles
import './Profile.css';

const Profile = (props) => {

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
                console.log(results);
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
            <h1>THE PROFILE PAGE</h1>
            <div className="profile-page">
                {/* <h1>Your score is: {score}</h1> */}
                {userResults.map(result => (
                    <div className="quiz-results" key={result._id}>
                        <ResultsTable rows={result.userResults} score={result.score} quizName={result.quizName} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Profile;