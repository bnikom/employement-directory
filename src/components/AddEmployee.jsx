import React , { useState } from 'react';
import { Button, Form, FormGroup, FormText, Label, Input } from 'reactstrap';
import axios from 'axios';
import { useHistory, withRouter } from 'react-router-dom';

const AddEmployeeForm = ({ setFormSubmit, toggleModal }) => {
  const [ name, setName ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ date, setDate ] = useState('');
  const [ title, setTitle ] = useState('');
  const [ phone, setPhone ] = useState('');
  const [ department, setDepartment ] = useState('Select Department');
  const [ photo, setPhoto ] = useState(null);
  const history = useHistory();

  const handleSubmit = async (e) => {
    const formData = new FormData();
    
    formData.append("name", name);
    formData.append("title", title);
    formData.append('dob', date);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("department", department);
    formData.append('imageUrl', photo);

    const config = {
      headers: {
          'content-type': 'multipart/form-data'
      }
    };

    await axios.post('http://localhost:8080/api/employees', formData, config);
    setFormSubmit(prevSubmit => !prevSubmit);
    toggleModal(prevToggle => !prevToggle);
  };

  return (
    <Form className="p-2">
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
        <Label for="dob">Date</Label>
        <Input
          type="date"
          name="dob"
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
        <Label for="email">Email</Label>
        <Input
          type="email"
          name="email"
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
      <FormGroup>
        <Label for="imageUrl">File</Label>
        <Input
          type="file"
          name="imageUrl"
          onChange={(e) => setPhoto(e.target.files[0])}
        />
        <FormText color="muted">
          Upload Employee Photo
        </FormText>
      </FormGroup>
      <Button onClick={(e) => handleSubmit(e)}>Submit</Button>
    </Form>
  );
}

export default AddEmployeeForm;