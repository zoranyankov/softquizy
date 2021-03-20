import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    // Redirect,
    // Link,
    // useRouteMatch,
    // useParams
} from "react-router-dom";

import './App.css';

import AppContext from './components/AppContext';

import Header from './components/Header';
import Home from './components/Home';
import Auth from './components/Auth';
import Profile from './components/Profile';
import Quizes from './components/Quiz/Quizes';
import Footer from './components/Footer';


function App() {
    let parsedToken = JSON.parse(localStorage.getItem('sid'));
    const getUserName = (parsedToken && parsedToken.user) ? parsedToken.user.username : false;
    const [isAuth, setIsAuth] = React.useState(getUserName);
    const updateIsAuth = (switching) => {
        (switching === 'auth') ? setIsAuth(getUserName) : setIsAuth(false);
    };
    const userSettings = {
        isAuthName: isAuth,
        setIsAuth,
        updateIsAuth,
    };

    return (
        <Router>
            <AppContext.Provider value={userSettings}>
                <div className="App">
                    <Header />
                    <div className="main">
                        <Switch>
                            <Route exact path="/" component={Home} />
                            <Route path="/auth" component={Auth} />
                            <Route path="/profile" component={Profile} />
                            <Route path="/quizes" component={Quizes} />
                        </Switch>
                    </div>

                    <Footer />
                </div >
            </AppContext.Provider>
        </Router >
    );
}

export default App;
