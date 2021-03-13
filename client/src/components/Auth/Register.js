import { Component } from 'react';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        return (
            <div className="auth-container">
                <h1>Register page</h1>
                <form className="form-container" id="register-form">
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" className="form-control" placeholder="Email" name="email" value="" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control" placeholder="Password" name="password" value="" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="repeatPassword">Repeat Password</label>
                        <input type="password" className="form-control" placeholder="Repeat-Password" name="repeatPassword" value="" />
                    </div>
                    <br></br>
                    <button type="submit" className="btn btn-primary" >Register</button>
                </form>
            </div>
        );
    }
}

export default Register;