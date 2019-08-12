import React, { Component } from "react";
import { Button, Form } from "semantic-ui-react";
import "./main.css";

class Register extends Component {
  constructor() {
    super();

    this.state = {
      username: "",
      password: ""
    };
  }
  handleChange = e => {
    this.setState({ [e.currentTarget.name]: e.currentTarget.value });
  };
  handleSubmit = async e => {
    e.preventDefault();

    const register = await fetch("http://localhost:9000/auth/register", {
      method: "POST",
      credentials: "include",
      body: JSON.stringify(this.state),
      headers: {
        "Content-Type": "application/json"
      }
    });

    const parsedRegister = await register.json();

    console.log(parsedRegister, " response from register");


    if(parsedRegister.status.message === 'User Logged In'){
      console.log('logged in')


      this.props.history.push("/employees");
    }
  };
  render() {
    return (
      <Form onSubmit={this.handleSubmit} id="main-form">
        <label>
          Create Username:
          <input
            type="text"
            name="username"
            id="username"
            onChange={this.handleChange}
          />
        </label>
        <label>
          Create Password:
          <input
            type="password"
            name="password"
            id="password"
            onChange={this.handleChange}
          />
        </label>
        <button type="Submit" class="ui primary button" id="button">
          Register
        </button>
      </Form>
    );
  }
}

export default Register;
