import React, { Component } from "react";

class Employee extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      position: "",
      birthDate: "",
      department: "",
      annualSalary: ""
    };
  }

  updateEmployee = e => {
    this.setState({ [e.currentTarget.name]: e.currentTarget.value });
  };

  render() {
    return (
      <form onSubmit={this.props.addEmployee.bind(null, this.state)}>
        <label htmlFor="">
          Employee Name:
          <input
            type="text"
            name="name"
            onChange={this.updateEmployee}
            value={this.state.name}
          />
        </label>
        <label htmlFor="">
          Position:
          <input
            type="text"
            name="position"
            onChange={this.updateEmployee}
            value={this.state.position}
          />
        </label>
        <label htmlFor="">
          Birthday:
          <input
            type="date"
            name="birthDate"
            onChange={this.updateEmployee}
            value={this.state.birthDate}
          />
        </label>
        <label htmlFor="">
          Department:
          <input
            type="text"
            name="department"
            onChange={this.updateEmployee}
            value={this.state.department}
          />
        </label>
        <label htmlFor="">
          Salary:
          <input
            type="text"
            name="annualSalary"
            onChange={this.updateEmployee}
            value={this.state.annualSalary}
          />
        </label>
        <button class="ui primary button" type="submit">
          Hire Employee
        </button>
      </form>
    );
  }
}

export default Employee;
