import React from "react";
import { Form, Button, Label } from "semantic-ui-react";

const EditEmployee = props => {
  return (
    <div>
      <h3> Edit Employee</h3>
      <Form onSubmit={props.closeAndEdit}>
        <Label>
          Edit Employee Name:
          <Form.Input
            type="text"
            name="name"
            onChange={props.handleFormChange}
            value={props.employeeToEdit.name}
          />
        </Label>
        <br />
        <Label>
          Edit Employee Position:
          <Form.Input
            type="text"
            name="position"
            onChange={props.handleFormChange}
            value={props.employeeToEdit.position}
          />
        </Label>
        <br />
        <Label>
          Edit Employee BirthDate:
          <Form.Input
            type="date"
            name="birthDate"
            onChange={props.handleFormChange}
            value={props.employeeToEdit.birthDate}
          />
        </Label>
        <br />
        <Label>
          Edit Employee Department:
          <Form.Input
            type="text"
            name="department"
            onChange={props.handleFormChange}
            value={props.employeeToEdit.department}
          />
        </Label>
        <br />
        <Label>
          Edit Annual Salary:
          <Form.Input
            type="text"
            name="annualSalary"
            onChange={props.handleFormChange}
            value={props.movieToEdit.annualSalary}
          />
        </Label>
        <br />
        <button class="ui secondary button" type="Submit">
          Edit
        </button>
      </Form>
    </div>
  );
};

export default EditEmployee;
