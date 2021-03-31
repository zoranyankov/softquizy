import { useContext, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';

//Import global context and services
import AppContext from '../../AppContext';
import apiQuestionServices from '../../../sevices/api/apiQuestionServices';

//Import components
import Accordion from '../../Accordion';
import Toast from '../../Shared/Toast';

//Import local styles
import './ProfileQuestions.css';

const ProfileQuestions = (props) => {

    //Get actual state of Token if is authenticated
    const hasToken = JSON.parse(localStorage.getItem('sid'));
    const appContext = useContext(AppContext);
    let isAuth = !hasToken ? false : appContext.isAuthName;

    let [userQuestions, setuserQuestions] = useState([]);

    const userId = appContext.userId;
    // console.log(userId);

    useEffect(() => {
        console.log('inUseEffect of Profile comp');
        apiQuestionServices.getByUserId(userId)
            .then(questions => {
                setuserQuestions(questions);
            })
            .catch(err => console.log('Profile get Question error: ' + err))
    }, [userId, isAuth])

    //Execute guard - redirect if is not authenticated
    if (!isAuth) {
        return <Redirect to="/auth/login" />;
    }

    //Initial render
    if (userQuestions.length === 0) {
        return (
            <Toast
                toastList={[{ id: "LoadingQuestons", title: "Info", description: "Loading Questons..." }]}
                // position="bottom-right"
                position="middle"
            />
        );
    }

    return (
        <>
            <h3>CEATED QUESTIONS</h3>
            <Accordion data={userQuestions} />
            {/* {userQuestions.map(result => (
                    <div className="quiz-questions" key={result._id}>
                        <QuestionTable rows={result.userQuestions} score={result.score} quizName={result.quizName} />
                    </div>
                ))} */}
            <br />
            <br />
            <br />
        </>
    );
}

export default ProfileQuestions;