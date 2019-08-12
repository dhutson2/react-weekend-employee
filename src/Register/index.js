import React, { Component } from 'react';


class Register extends Component {
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

    const register = await fetch('http://localhost:9000/auth/register', {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify(this.state),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const parsedRegister = await register.json();

    console.log(parsedRegister, ' response from register');

    if(parsedRegister.status.message === 'User Logged In'){
      console.log('logged in')
      // programmatically switch between a route

      this.props.history.push('/employees');
    }
  }
  render(){
    return (
     <form onSubmit={this.handleSubmit}>
      <label>
        Username:
        <input type="text" name='username' onChange={this.handleChange}/>
      </label>
      <label>
        Password:
        <input type="password" name='password' onChange={this.handleChange}/>
      </label>
      <button type='Submit'>
        Register
      </button>
     </form>
      )
  }
}


export default Register;