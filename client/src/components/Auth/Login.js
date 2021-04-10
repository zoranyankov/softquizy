import { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';

//Import services
import AppContext from '../AppContext';
import authService from '../../sevices/auth/authServices';
import testAuthInput from '../../sevices/test/authTestServices';

//Import components from Material UI
import { VpnKeyIcon } from '../../config/materialConfig';

//Import shared components
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
            errors: '',
            errorTimeout: '',
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
        this.setState({ [inputName]: inputValue });
        clearInterval(this.state.errorTimeout[inputName]);
        const err = testAuthInput.values[inputName](inputValue);
        // this.setState((oldState => ({ ...oldState, errors: { ...oldState.errors, [inputName]: null } })));

        //Real-time validation of user inputs
        if (err) {
            this.setState({
                errorTimeout: {
                    [inputName]: setTimeout(() => {
                        this.setState((oldState => ({ ...oldState, errors: { ...oldState.errors, [inputName]: err } })))
                    }, 2000)
                }
            });
        } else {
            this.setState((oldState => ({ ...oldState, errors: { ...oldState.errors, [inputName]: null } })))
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        if (!testAuthInput.validation(this.context, this.state)) {
            return
        }
        authService.login(this.state)
            .then((response) => {
                if (!response || response.errors) {
                    const errorsList = response.errors.map((err, i) => {
                        return ({ id: i + err.message, title: 'Error', description: err.message, position: 'middle' });
                    });
                    this.context.setNotifyList(errorsList);
                    return;
                }
                const { user, token } = response;
                localStorage.setItem('sid', JSON.stringify({ user, token }));
                this.context.setIsAuth(user.username);
                this.context.setNotifyList([{ id: 'Login successful', title: 'Success', description: `Wellcome ${user.username.toUpperCase()}`, position: 'middle' }])
                this.setState({ redirectToHome: true });
            })
            .catch(err => {
                let errorsList = [];
                if (err.message === 'Failed to fetch') {
                    errorsList = [{ id: 'Server problem', title: 'Error', description: 'Server problem', position: 'middle' }];
                }
                if (err.message) {
                    errorsList = [{ id: err.message, title: 'Error', description: err.message, position: 'middle' }];
                }
                if (err.errors && err.errors.length !== 0) {
                    errorsList = err.errors.map((err, i) => {
                        return ({ id: i + err.message, title: 'Error', description: err.message, position: 'middle' });
                    });
                }
                this.context.setNotifyList(errorsList);
            })
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
                            onChange={this.handleChange}
                        />
                        <Notificate type="error">{this.state.errors.username } < br /></Notificate>
                    </div>
                    <div className="form-group">
                        <label className="form-label" htmlFor="password">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Password"
                            name="password"
                            onChange={this.handleChange}
                        />
                        <Notificate type="error">{this.state.errors.password} < br /></Notificate>
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