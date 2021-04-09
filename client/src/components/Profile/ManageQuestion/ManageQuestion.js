import { Switch, Route, useRouteMatch} from "react-router-dom";

//Import components
// import Quiz from '../Quiz/Quiz';
import CreateQuestion from '../../Quiz/CreateQuestion';
// import ChooseQuiz from '../ChooseQuiz';

const ManageQuestion = () => {
    let match = useRouteMatch();

    return (
        <Switch>
            <Route path={`${match.url}/edit/:qid`} render={() =><CreateQuestion />} />
            <Route path={`${match.url}/delete/:qid`} render={() => (<CreateQuestion manage={'delete'} qid={'qid'}/>)} />
        </Switch>
    )
}

export default ManageQuestion;