import React, { Component } from "react";
import CreateEmployee from "../CreateEmployee";
import EmployeeList from "../EmployeeList";

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
  componentDidMount = () => {
    this.getEmployees();
  };

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

  getEmployees = async () => {
    try {
      const responseGetEmployees = await fetch(
        "http://localhost:9000/api/v1/employee",
        {
          credentials: "include",
          method: "GET"
        }
      );

      if (responseGetEmployees.status !== 200) {
        throw Error("404 from server");
      }
      // this will parse json string into an object we can manipulate
      const employeesJson = await responseGetEmployees.json();
      console.log(employeesJson, " employees response");

      // spread operator(...) takes array you got back in moviesJson to a new copy in movies variable
      this.setState({
        employees: [...employeesJson.data]
      });
    } catch (err) {
      console.log(err, " getEmployees error");
      return err;
    }
  };

  render() {
    return (
      <div>
        <CreateEmployee addEmployee={this.addEmployee} />
        <EmployeeList employeeList={this.state.employees} />
      </div>
    );
  }
}

export default Employees;
