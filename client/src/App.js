import './App.css';

import Header from './components/Header';
import Home from './components/Home';
import Profile from './components/Profile';
import Auth from './components/Auth';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    // Redirect,
    // Link,
    // useRouteMatch,
    // useParams
} from "react-router-dom";

function App() {
    return (
        <Router>
            <div className="App">
                <Header />

                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/auth" component={Auth} />
                    <Route path="/profile" component={Profile} />
                </Switch>

            </div>
        </Router>
    );
}

export default App;
