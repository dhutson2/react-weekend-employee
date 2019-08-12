import React from "react";

const Employees = props => {
  console.log(props, " props in employee list");
  const employeeList = props.employeeList.map(employee => {
    return (
      <ul key={employee._id}>
        <li>
          <strong>{employee.name}</strong>
        </li>
        &nbsp;
        <li>position: {employee.position}</li>&nbsp;
        <li>birthday: {employee.birthDate}</li>&nbsp;
        <li>department: {employee.department}</li>&nbsp;
        <li>cashhhh: ${employee.annualSalary}</li>&nbsp;
        <button onClick={props.deleteEmployee.bind(null, employee)}>
          Delete
        </button>
        <button>Edit</button>
      </ul>
    );
  });
  return (
    <div>
      <h3>Employees</h3>
      <div>{employeeList}</div>
    </div>
  );
};

export default Employees;
