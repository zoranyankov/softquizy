import { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';

//Import services
import AppContext from '../AppContext';
import authService from '../../sevices/auth/authServices';
import testInput from '../../sevices/test/authTestServices';

//Import components from Material UI
import CreateIcon from '@material-ui/icons/Create';

import Notificate from '../Shared/Notificate';
import ButtonLink from '../Shared/ButtonLink';


class Register extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            username: '',
            password: '',
            rePassword: '',
            redirectToLogin: false,
            errors: '',
            errorTimeout: '',
        };
    }

    static contextType = AppContext;

    //Error handling and control inputs
     handleChange(event) {
        const [inputName, inputValue] = [event.target.name, event.target.value];
        this.setState({ [inputName]: inputValue });
        clearInterval(this.state.errorTimeout[inputName]);
        const err = testInput[inputName](inputValue);
        this.setState((oldState => ({ ...oldState, errors: { ...oldState.errors, [inputName]: null } })));

        if (err) {
            this.setState({
            errorTimeout :{[inputName] : setTimeout(() => {
            this.setState((oldState => ({ ...oldState, errors: { ...oldState.errors, [inputName]: err } })))
            }, 3000)}});
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        if (this.state.rePassword !== this.state.password) {
            this.context.setTestList([{ id: 'Both passwords must match', title: 'Error', description: 'Both passwords must match' }])
            return;
        }
        authService.register(this.state)
            .then((response) => {
                if (!response || response.errors) {
                    const errorsList = response.errors.map((err, i) => ({ id: i + err.message, title: 'Error', description: err.message }));
                    this.context.setTestList(errorsList);
                    return;
                }
                this.context.setTestList([{ id: 'Register successful', title: 'Success', description: 'Register successful' }])
                this.setState({ redirectToLogin: true });
            })
            .catch(err => {
                const errorsList = err.errors.map((err, i) => ( { id: i + err.message, title: 'Error', description: err.message }));
                this.context.setTestList(errorsList);
                console.log('inRegisterFendler')
                console.log(err)
            })
    }

    render() {
        const redirectToLogin = this.state.redirectToLogin;

        //Execute guard if already logged in
        if (this.context.isAuthName) {
            return <Redirect to="/" />
        }

        //Redirect to login page if successfully registered
        if (redirectToLogin) {
            return <Redirect to="/auth/login" />
        }
        return (
            <div className="auth-container">
                <h1>Register page</h1>
                <form className="form-container" id="register-form" onSubmit={this.handleSubmit}>
                    {/* <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" className="form-control" placeholder="Email" name="email" value={this.state.email} onChange={this.handleChange} />
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
                    </div>
                    <Notificate type="error">{this.state.errors.username}</Notificate>
                    <div className="form-group">
                        <label className="form-label" htmlFor="password">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Password"
                            name="password"
                            onChange={this.handleChange}
                        />
                    </div>
                    <Notificate type="error">{this.state.errors.password}</Notificate>
                    <div className="form-group">
                        <label className="form-label" htmlFor="repeatPassword">Repeat Password</label>
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Repeat-Password"
                            name="rePassword"
                            onChange={this.handleChange}
                        />
                    </div>
                    <Notificate type="error">{this.state.errors.rePassword}</Notificate>
                    <br></br>
                    <ButtonLink component={<CreateIcon />} type="submit">
                        Register
                    </ButtonLink>
                    <div style={{ padding: '0rem 2rem 2rem 2rem' }}>
                        Already have an account?
                        <Link to="/auth/login"><span className="nav-link">   Login now</span> </Link>
                    </div>
                </form>
            </div>
        );
    }
}

export default Register;