import { Component } from 'react';
import { Redirect } from 'react-router-dom';

//Import services
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

    componentDidMount() {
        //Get actual state (of Token) - if is authenticated
        const hasToken = JSON.parse(localStorage.getItem('sid'));
        let isAuth = !hasToken ? false : this.context.isAuthName;
        
        //Execute guard if already logged in
        if (isAuth) {
            this.setState({ redirectToHome: true });
        }
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
        authService.login(this.state)
            .then(({ user, token }) => {
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