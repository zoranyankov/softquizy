import { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';

//Import services
import AppContext from '../AppContext';
import authService from '../../sevices/auth/authServices';
import testInput from '../../sevices/test/authTestServices';

//Import components from Material UI
import VpnKeyIcon from '@material-ui/icons/VpnKey';

import Notificate from '../Shared/Notificate';
import ButtonLink from '../Shared/ButtonLink';


class Login extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            username: '',
            password: '',
            redirectToHome: false,
            errors: ''
        };
    }

    static contextType = AppContext;

    componentDidMount() {
        //Get actual state (of Token) - if is authenticated
        const hasToken = JSON.parse(localStorage.getItem('sid'));
        let isAuth = !hasToken ? false : this.context.isAuthName;

        //Execute guard if already logged in
        if (isAuth) {
            this.setState({ redirectToHome: true });
        }
    }

    //Error handling and control inputs
    handleChange(event) {
        const [inputName, inputValue] = [event.target.name, event.target.value];
        const err = testInput[inputName](inputValue);
        if (err) {
            this.setState((oldState => ({ ...oldState, errors: { ...oldState.errors, [inputName]: err } })))
        } else {
            this.setState((oldState => ({ ...oldState, errors: { ...oldState.errors, [inputName]: null } })))
        }
        this.setState({ [inputName]: inputValue });
    }

    handleSubmit(event) {
        event.preventDefault();
        authService.login(this.state)
            .then(({ user, token }) => {
                console.log(user);
                localStorage.setItem('sid', JSON.stringify({ user, token }));
                this.context.setIsAuth(user.username);
                this.setState({ redirectToHome: true });
            })
            .catch(err => console.log(err))
    }

    render() {
        const redirectToHome = this.state.redirectToHome;

        //Redirect if login is successful
        if (redirectToHome) {
            return <Redirect to="/" />
        }

        return (
            <div className="auth-container">
                <h1>Login page</h1>
                <form className="form-container" id="login-form" onSubmit={this.handleSubmit}>
                    {/* <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" className="form-control" placeholder="Email" name="email" value="" />
                    </div> */}
                    <div className="form-group">
                        <label className="form-label" htmlFor="username">Username</label>
                        <input
                            type="username"
                            className="form-control"
                            placeholder="Username"
                            name="username"
                            // value={this.state.username}
                            // onChange={this.handleChange}
                            onBlur={this.handleChange}
                        />
                        <Notificate type="error">{this.state.errors.username}</Notificate>
                    </div>
                    <div className="form-group">
                        <label className="form-label" htmlFor="password">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Password"
                            name="password"
                            // value={this.state.password}
                            onBlur={this.handleChange}
                        />
                        <Notificate type="error">{this.state.errors.password}</Notificate>
                    </div>
                    <br></br>
                    <ButtonLink component={<VpnKeyIcon />} type="submit">
                        Login
                    </ButtonLink>
                </form>
                <div style={{ padding: '0rem 2rem 2rem 2rem' }}>
                    Don't have an account?
                <Link to="/auth/register"><span className="nav-link">   Register now</span> </Link>
                </div>
            </div>
        );
    }
}
Login.contextType = AppContext;

export default Login;