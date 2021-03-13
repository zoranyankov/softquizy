import { Component } from 'react';

// import './Auth';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        return (
            <div className="auth-container">
                <h1>Login page</h1>
                <form className="form-container" id="login-form">
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" className="form-control" placeholder="Email" name="email" value="" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control" placeholder="Password" name="password" value="" />
                    </div>
                    <br></br>
                    <button type="submit" className="btn btn-primary" >Login</button>
                </form>
            </div>
        );
    }
}

export default Login;