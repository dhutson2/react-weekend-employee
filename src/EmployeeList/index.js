import React from "react";

const Employees = props => {
  console.log(props, " props in movie list");
  const employeeList = props.employeeList.map(employee => {
    return (
      <li key={employee._id}>
        <span>{employee.name}</span>&nbsp;
        <span>{employee.position}</span>&nbsp;
        <span>{employee.birthDate}</span>&nbsp;
        <span>{employee.department}</span>&nbsp;
        <span>{employee.annualSalary}</span>&nbsp;
        <button onClick={props.deleteEmployee.bind(null, employee)}>
          Delete
        </button>
        <button onClick={props.showModal.bind(null, employee)}>Edit</button>
      </li>
    );
  });
  return (
    <div>
      <h3>Employees</h3>
      <ul>{employeeList}</ul>
    </div>
  );
};

export default Employees;
