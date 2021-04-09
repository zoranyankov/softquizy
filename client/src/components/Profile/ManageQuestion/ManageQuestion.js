import { Switch, Route, useRouteMatch} from "react-router-dom";

//Import components
// import Quiz from '../Quiz/Quiz';
import CreateQuestion from '../../Quiz/CreateQuestion';
// import ChooseQuiz from '../ChooseQuiz';

const ManageQuestion = () => {
    let match = useRouteMatch();

    return (
        <Switch>
            <Route path={`${match.url}/:action/:questionId`} render={() =><CreateQuestion />} />
        </Switch>
    )
}

export default ManageQuestion;