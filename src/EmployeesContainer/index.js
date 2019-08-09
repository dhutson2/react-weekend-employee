import React, { Component } from "react";
import CreateEmployee from "../CreateEmployee";

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

  addEmployee = async (employee, e) => {
    e.preventDefault();
    console.log(employee, "inside of add employee");
    try {
      const createEmployee = await fetch(
        "http://localhost:9000/api/v1/employee",
        {
          method: "POST",
          credentials: "include",
          body: JSON.stringify(employee),
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
      // if (CreateEmployee.message !== "Success") {
      //   throw Error("WTF? Resource not found");
      // }
      const createEmployeeResponse = await createEmployee.json();
      console.log(createEmployeeResponse, "Create employee response");
      this.setState({
        employees: [...this.state.employees, createEmployeeResponse.data]
      });
    } catch (err) {
      console.log(err, "add employee error");
      return err;
    }
  };

  render() {
    return <CreateEmployee addEmployee={this.addEmployee} />;
  }
}

export default Employees;
