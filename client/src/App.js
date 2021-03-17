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
import AppContext from './components/AppContext';

import './App.css';

import Header from './components/Header';
import Home from './components/Home';
import Profile from './components/Profile';
import Auth from './components/Auth';
import Footer from './components/Footer';


function App() {
    const [isAuth, setIsAuth] = React.useState(JSON.parse(localStorage.getItem('sid'))?.user.username);
    const updateIsAuth = (switching) => {
        (switching === 'auth') ? setIsAuth(true) : setIsAuth(false);
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

                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route path="/auth" component={Auth} />
                        <Route path="/profile" component={Profile} />
                    </Switch>

                </div >
                    <Footer />
            </AppContext.Provider>
        </Router >
    );
}

export default App;
