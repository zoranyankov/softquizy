import { Switch, Route, useRouteMatch} from "react-router-dom";

//Import components
import Quiz from '../Quiz/Quiz';
import CreateQuestion from '../CreateQuestion';
import ChooseQuiz from '../ChooseQuiz';

const Quizes = () => {
    let match = useRouteMatch();

    return (
        <Switch>
            <Route path={`${match.url}/local/:category/:quizName`} component={Quiz} />
            <Route path={`${match.url}/external/:category/:quizName`} component={Quiz} />
            <Route path={`${match.url}/create-question`} component={CreateQuestion} />
            <Route path={`${match.url}/choose-ext-quiz`} component={ChooseQuiz} />
        </Switch>
    )
}

export default Quizes;