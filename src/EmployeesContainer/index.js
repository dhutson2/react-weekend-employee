import React, { Component } from "react";
import Employee from "../CreateEmployee";

class Employees extends Component {
  constructor() {
    super();
    this.state = {
      employees: [],
      showModal: false,
      employeeToEdit: {
        id: null,
        name: "",
        position: "",
        birthDate: "",
        department: "",
        annualSalary: ""
      }
    };
  }

  render() {
    return <Employee />;
  }
}

export default Employees;
