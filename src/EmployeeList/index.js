import React from "react";
import { List, Button } from "semantic-ui-react";

const Employees = props => {
  console.log(props, " props in employee list");
  const employeeList = props.employeeList.map(employee => {
    return (
      <List as="ul" key={employee._id}>
        <List.Item>
          <strong>{employee.name}</strong>
        </List.Item>
        <br />
        <li>position: {employee.position}</li>
        <br />
        <li>birthday: {employee.birthDate}</li>
        <br />
        <li>department: {employee.department}</li>
        <br />
        <li>cashhhh: ${employee.annualSalary}</li>
        <br />
        <button
          class="ui secondary button"
          onClick={props.deleteEmployee.bind(null, employee)}
        >
          Delete
        </button>
        <button class="ui secondary button">Edit</button>
      </List>
    );
  });
  return (
    <div>
      <h3>Employees</h3>
      <div class="ui container">{employeeList}</div>
    </div>
  );
};

export default Employees;
