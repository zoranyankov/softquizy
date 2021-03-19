import { Component } from 'react';
import { Redirect } from 'react-router-dom';

import authService from '../../sevices/auth/authServices';
import AppContext from '../AppContext';

class Login extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            username: '',
            password: '',
            redirectToHome: false
        };
    }

    static contextType = AppContext;

    // componentDidMount() {
    //     let isAuth = this.context;
    // }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
        authService.login(this.state)
            .then(({ user, token }) => {
                // console.log(user);
                // console.log(token);
                this.context.updateIsAuth('auth');
                localStorage.setItem('sid', JSON.stringify({ user, token }));
                this.context.setIsAuth(JSON.parse(localStorage.getItem('sid')).user.username);
                this.setState({ redirectToHome: true });
            })
            .catch(err => console.log(err))
    }

    render() {
        const redirectToHome = this.state.redirectToHome;
        if (redirectToHome || this.isAuth) {
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
                        <input type="username" className="form-control" placeholder="Username" name="username" value={this.state.username} onChange={this.handleChange} />
                    </div>
                    <div className="form-group">
                        <label className="form-label" htmlFor="password">Password</label>
                        <input type="password" className="form-control" placeholder="Password" name="password" value={this.state.password} onChange={this.handleChange} />
                    </div>
                    <br></br>
                    <button type="submit" className="btn btn-primary">Login</button>
                </form>
            </div>
        );
    }
}
Login.contextType = AppContext;

export default Login;