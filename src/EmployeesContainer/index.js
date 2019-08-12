import React, { Component } from "react";
import CreateEmployee from "../CreateEmployee/index";
import EmployeeList from "../EmployeeList/index";
import EditEmployee from "../EditEmployee/index";

class Employees extends Component {
  constructor() {
    super();
    this.state = {
      employees: [],
      showEditModal: false,
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

  handleFormChange = e => {
    this.setState({
      employeeToEdit: {
        ...this.state.employeeToEdit,
        [e.currentTarget.name]: e.currentTarget.value
      }
    });
  };

  closeAndEdit = async e => {
    e.preventDefault();
    try {
      const editRequest = await fetch(
        "http://localhost:9000/api/v1/employee" + this.state.employeeToEdit._id,
        {
          method: "PUT",
          credentials: "include",
          body: JSON.stringify(this.state.employeeToEdit),
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
      if (editRequest.status !== 200) {
        throw Error("editRequest not working");
      }
      const editResponse = await editRequest.json();
      // map will create a new array
      const editedEmployees = this.state.employees.map(employee => {
        if (employee._id === editResponse.data._id) {
          employee = editResponse.data;
        }
        return employee;
      });
      this.setState({
        employees: editedEmployees,
        showEditModal: false
      });
    } catch (err) {
      console.log(err, "error close and edit");
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

  deleteEmployee = async (employee, e) => {
    e.preventDefault();
    try {
      const deleteRequest = await fetch(
        "http://localhost:9000/api/v1/employee/" + employee._id,
        {
          method: "Delete",
          credentials: "include"
        }
      );
      if (deleteRequest.status !== 200) {
        throw Error("editRequest not working");
      }
      const employeeToDelete = employee;
      // filter will create a new array excluding items after !==
      const filteredEmployees = this.state.employees.filter(
        employee => employee !== employeeToDelete
      );
      this.setState({
        employees: filteredEmployees
      });
    } catch (err) {
      console.log(err, "error delete");
      return err;
    }
  };

  handleFormChange = e => {
    this.setState({
      employeeToEdit: {
        ...this.state.employeeToEdit,
        [e.target.name]: e.target.value
      }
    });
  };

  showModal = employee => {
    console.log(employee, " employeeID in show Modal");
    this.setState({
      employeeToEdit: employee,
      showEditModal: !this.state.showEditModal
    });
  };

  closeAndEdit = async e => {
    e.preventDefault();

    try {
      const editRequest = await fetch(
        "http://localhost:9000/api/v1/employee/" +
          this.state.employeeToEdit._id,
        {
          method: "PUT",
          credentials: "include",
          body: JSON.stringify(this.state.employeeToEdit),
          headers: {
            "Content-Type": "application/json"
          }
        }
      );

      if (editRequest.status !== 200) {
        throw Error("editResquest not working");
      }

      const editResponse = await editRequest.json();

      const editedEmployeeArray = this.state.employees.map(employee => {
        if (employee._id === editResponse.data._id) {
          employee = editResponse.data;
        }

        return employee;
      });

      this.setState({
        employees: editedEmployeeArray,
        showEditModal: false
      });

      console.log(editResponse, " editResponse");
    } catch (err) {
      console.log(err, " error closeAndEdit");
      return err;
    }
  };

  render() {
    return (
      <div>
        <CreateEmployee addEmployee={this.addEmployee} />
        <EmployeeList
          employeeList={this.state.employees}
          deleteEmployee={this.deleteEmployee}
          showModal={this.showModal}
        />

        {this.state.showEditModal ? (
          <EditEmployee
            closeAndEdit={this.closeAndEdit}
            employeeToEdit={this.state.employeeToEdit}
            handleFormChange={this.handleFormChange}
          />
        ) : null}
      </div>
    );
  }
}

export default Employees;
