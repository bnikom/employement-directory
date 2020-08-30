import React , { useState } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import axios from 'axios';

const AddEmployeeForm = () => {
  const [ name, setName ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ date, setDate ] = useState('');
  const [ title, setTitle ] = useState('');
  const [ phone, setPhone ] = useState('');
  const [ department, setDepartment ] = useState('Select Department');

  const handleSubmit = async (e) => {
    await axios.post('http://localhost:8080/api/employees', 
      {
        name,
        title,
        "dob": date,
        email,
        department,
        phone,
      }
    )
  }

  return (
    <Form className="p-2" onSubmit={e => handleSubmit(e)}>
      <FormGroup>
        <Label for="name">Name</Label>
        <Input
          type="text"
          name="name"
          placeholder="Enter employee name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </FormGroup>
      <FormGroup>
        <Label for="date">Date</Label>
        <Input
          type="date"
          name="date"
          placeholder="Enter Employee Date Of Birth"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </FormGroup>
      <FormGroup>
        <Label for="jobTitle">Job Title</Label>
        <Input
          type="text"
          name="jobTitle"
          placeholder="Enter employee title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </FormGroup>
      <FormGroup>
        <Label for="phone">Phone</Label>
        <Input
          type="tel"
          name="phone"
          placeholder="Enter employee phone number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </FormGroup>
      <FormGroup>
        <Label for="employeeEmail">Email</Label>
        <Input
          type="email"
          name="employeeEmail"
          placeholder="Enter employee email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormGroup>
      <FormGroup>
        <Label for="department">Select Department</Label>
        <Input
          type="select"
          name="department"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
        >
          <option>Select Department</option>
          <option>Engineering</option>
          <option>Marketing</option>
          <option>Sales</option>
          <option>HR</option>
          <option>Customer Care</option>
        </Input>
      </FormGroup>
      <Button>Submit</Button>
    </Form>
  );
}

export default AddEmployeeForm;