import { Component } from 'react';
import authService from '../../sevices/authServices';

class Register extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            username: '',
            password: ''
        };
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
        authService.register(this.state)
            .then(result => {
                console.log(result);
                alert('A name was submitted (registered): ' + result.username + ' with Id: ' + result._id);
            })
            .catch(err => console.log(err))
    }

    render() {
        return (
            <div className="auth-container">
                <h1>Register page</h1>
                <form className="form-container" id="register-form" onSubmit={this.handleSubmit}>
                    {/* <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" className="form-control" placeholder="Email" name="email" value={this.state.email} onChange={this.handleChange} />
                    </div> */}
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input type="username" className="form-control" placeholder="Username" name="username" value={this.state.username} onChange={this.handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control" placeholder="Password" name="password" value={this.state.password} onChange={this.handleChange} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="repeatPassword">Repeat Password</label>
                        <input type="password" className="form-control" placeholder="Repeat-Password" name="repeatPassword" onChange={this.handleChange} />
                    </div>
                    <br></br>
                    <button type="submit" className="btn btn-primary" >Register</button>
                </form>
            </div>
        );
    }
}

export default Register;