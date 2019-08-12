import React, { Component } from "react";
import Employee from "../CreateEmployee";
import EditEmployee from "../EditEmployee";


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


      getEmployees = async () => {

    try {

      const responseGetEmployees = await fetch('http://localhost:9000/api/v1/employee', {
        credentials: 'include',
        method: 'GET'
      });

      console.log(responseGetEmployees, ' responseGetEmployees')

      if(responseGetEmployees.status !== 200){
        throw Error('404 from server');
      }

    
      const employeesResponse = await responseGetEmployees.json();
      
      console.log(employeesResponse, ' employeesResponse <')

      this.setState({
        employees: [...employeesResponse.data]
      });


    } catch(err){
      console.log(err, ' getEmployees errors');
      return err
    }


  }
    handleFormChange = (e) => {

    this.setState({
      employeeToEdit: {
        ...this.state.employeeToEdit,
        [e.target.name]: e.target.value
      }
    })
  }

  showModal = (employee) => {
    console.log(employee, ' employeeID in show Modal')
    this.setState({
      employeeToEdit: employee,
      showEditModal: !this.state.showEditModal
    })
  }

  closeAndEdit = async (e) => {
    e.preventDefault();

    try {
      const editRequest = await fetch('http://localhost:9000/api/v1/employee/' + this.state.employeeToEdit._id, {
        method: 'PUT',
        credentials: 'include',
        body: JSON.stringify(this.state.employeeToEdit),
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if(editRequest.status !== 200){
        throw Error('editResquest not working')
      }

      const editResponse = await editRequest.json();

      const editedEmployeeArray = this.state.employees.map((employee) => {
        
        if(employee._id === editResponse.data._id){
       
          employee = editResponse.data
        }

        return employee
      });

      this.setState({
        employees: editedEmployeeArray,
        showEditModal: false
      })

      console.log(editResponse, ' editResponse');

    } catch(err){
      console.log(err, ' error closeAndEdit');
      return err
    }
  }


  render() {
    return <Employee />;
  }
}

export default Employees;
