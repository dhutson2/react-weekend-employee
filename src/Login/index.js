import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Login extends Component {
    constructor(){
        super();

        this.state = {
            username: '',
            password: ''
        }
    }

    handleChange = (e) => {
        this.setState({[e.currentTarget.name]: e.currentTarget.value});
    }

    handleSubmit = async (e) => {
        e.preventDefault();

        const login = await fetch('http://localhost:9000/auth/login', {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify(this.state),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const parsedLogin = await login.json();

        console.log(parsedLogin, ' < login response');

        if(parsedLogin.status.message === 'User Logged In'){
            console.log('logged in');

            this.props.history.push('/employees');
        }
    }

    render() {
        return (
            <div>
            <form onSubmit={this.handleSubmit}>
              <label>
                  Username: <input type='text' name='username' onChange={this.handleChange}/>
              </label>
              <label>
                Password: <input type='password' name='password' onChange={this.handleChange}/>
              </label>
              <button type='submit'>Login</button>
            </form>
            </div>
        )
    }
}
export default Login