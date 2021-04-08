import { Switch, Route, useRouteMatch} from "react-router-dom";

//Import components
// import Quiz from '../Quiz/Quiz';
import CreateQuestion from '../CreateQuestion';
// import ChooseQuiz from '../ChooseQuiz';

const Quizes = () => {
    let match = useRouteMatch();

    return (
        <Switch>
            <Route path={`${match.url}/edit/:qid`} component={CreateQuestion} />
            <Route path={`${match.url}/delete/:qid`} component={CreateQuestion} />
        </Switch>
    )
}

export default Quizes;