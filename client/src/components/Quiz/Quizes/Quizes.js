import { Switch, Route, useRouteMatch} from "react-router-dom";

//Import components
import Quiz from '../Quiz/Quiz';
import Createquestion from '../Createquestion';
import Choosequiz from '../Choosequiz';

const Quizes = () => {
    let match = useRouteMatch();

    return (
        <Switch>
            <Route path={`${match.url}/local/:category/:quizName`} component={Quiz} />
            <Route path={`${match.url}/external/:category/:quizName`} component={Quiz} />
            <Route path={`${match.url}/create-question`} component={Createquestion} />
            <Route path={`${match.url}/choose-ext-quiz`} component={Choosequiz} />
        </Switch>
    )
}

export default Quizes;