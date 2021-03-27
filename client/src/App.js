import React, { useEffect } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    // Redirect,
    // Link,
    // useRouteMatch,
    // useParams
} from "react-router-dom";

//Import component styles - for current component
import './App.css';

//Import Services
import AppContext from './components/AppContext';
import authService from './sevices/auth/authServices';

//Import Components
import Header from './components/Header';
import Home from './components/Home';
import Auth from './components/Auth';
import Profile from './components/Profile';
import Quizes from './components/Quiz/Quizes';
import Footer from './components/Footer';


function App() {
    //Get actual state of Token if is authenticated
    let parsedToken = JSON.parse(localStorage.getItem('sid'));
    const getUserName = (parsedToken && parsedToken.user) ? parsedToken.user.username : false;
    const userId = (parsedToken && parsedToken.user) ? parsedToken.user._id : false;

    //Define global states
    const [isAuth, setIsAuth] = React.useState(getUserName);
    const [trivia, setTrivia] = React.useState([]);

    //Global App context object
    const userSettings = {
        userId,
        isAuthName: isAuth,
        setIsAuth,
        trivia,
        setTrivia
    };

    useEffect(() => {
        //Verify if Token is valid
        if (parsedToken) {
            const { token, user } = parsedToken;
            authService.verify({ username: user.username, token })
                .then(res => {
                    if (!res || !res.result) {
                        localStorage.removeItem('sid');
                        setIsAuth(false);
                        // return null;
                    }
                })
                .catch(err => {
                    localStorage.removeItem('sid');
                    console.log('Userpage Verify Error:' + err)
                })
        }
    }, [parsedToken, isAuth])

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
