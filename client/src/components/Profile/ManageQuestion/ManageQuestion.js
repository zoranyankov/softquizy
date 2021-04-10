import React, { useState, useContext, useEffect } from 'react';
import { useRouteMatch } from "react-router-dom";

//Import global AppContext and services
import AppContext from '../../AppContext';
import apiQuestionServices from '../../../sevices/api/apiQuestionServices';

//Import components
import CreateQuestion from '../../Quiz/CreateQuestion';
import Toast from '../../Shared/Toast';

const ManageQuestion = ({history}) => {

    let match = useRouteMatch();
    const appContext = useContext(AppContext);
    const { action, questionId } = match.params;
    const [questionData, setQuestionData] = useState({ question: {}, isCreator: false, buttonName: 'Create Question' });

    useEffect(() => {
        if (questionId) {
            apiQuestionServices.getOne(questionId)
                .then(question => {
                    if (!question || question.creatorId !== appContext.userId) {
                        history.push('/profile/profile-info/profile-questoins')
                        // appContext.setNotifyList([{ id: 'err.message', title: 'Error', description: 'err.message', position: 'middle' }]);
                        return;
                    }
                    const isCreator = question.creatorId === appContext.userId;
                    const buttonName = action === 'edit' ? 'Apply Changes' : 'Confirm Deletion';
                    setQuestionData(oldState => ({ ...oldState, question, isCreator, buttonName }));
                })
                .catch(err => {
                    console.log('Get question fetch Error: ' + err);
                    const errorsList = err.errors.map((err, i) => {
                        return ({ id: i + err.message, title: 'Error', description: err.message, position: 'middle' });
                    });
                    appContext.setNotifyList(errorsList);
                })
        }
    }, [questionId, action, appContext, history])

    const questionLength = Object.keys(questionData.question).length;

    return (
        <>
            {questionLength > 0
                ? <CreateQuestion
                    action={action}
                    question={questionData.question}
                    questionId={questionId}
                    isCreator={questionData.isCreator}
                    buttName={questionData.buttonName}
                />
                : <Toast
                    toastList={[{ id: "LoadingQuizes", title: "Info", description: "Loading Quizes..." }]}
                    position="middle"
                // position="bottom-right"
                />
            }
        </>
    );
}

export default ManageQuestion;