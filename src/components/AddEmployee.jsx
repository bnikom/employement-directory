import React, { useState } from 'react';
import { Button, Form, FormGroup, FormText, Label, Input } from 'reactstrap';
import axios from 'axios';

const AddEmployeeForm = ({
  setFormSubmit,
  toggleModal,
  nameProp,
  titleProp,
  departmentProp,
  phoneProp,
  emailProp,
  dateProp,
  type,
  id,
}) => {
  // set valaues in form either to be empty (when adding a new user)
  // or use existing value (when updating a user)
  const [name, setName] = useState(nameProp || '');
  const [email, setEmail] = useState(emailProp || '');
  const [date, setDate] = useState(dateProp || '');
  const [title, setTitle] = useState(titleProp || '');
  const [phone, setPhone] = useState(phoneProp || '');
  const [department, setDepartment] = useState(departmentProp || 'Select Department');
  const [photo, setPhoto] = useState(null);

  const handleSubmit = async (e) => {
    try {
      if (type === 'update') {
        const updateArgs = {};

        // can't send form data over a patch request
        // only add key to object if a new value has been added (not empty or preexisting value)
        if (name !== '' || name !== nameProp) updateArgs.name = name;
        if (title !== '' || title !== titleProp) updateArgs.title = title;
        if (date !== '' || date !== dateProp) updateArgs.dob = date;
        if (email !== '' || email !== emailProp) updateArgs.email = email
        if (phone !== '' || phone !== phoneProp) updateArgs.phone = phone;
        if (department !== 'Select Department' || department !== departmentProp) updateArgs.department = department;
        if (photo) updateArgs.imageUrl = photo;

        await axios.patch(`http://localhost:8080/api/employee/${id}`, updateArgs);
      } else {
        const formData = new FormData();

        formData.append("name", name);
        formData.append("title", title);
        formData.append('dob', date);
        formData.append("email", email);
        formData.append("phone", phone);
        formData.append("department", department);
        formData.append('imageUrl', photo);

        // necessary config for form data
        const config = {
          headers: {
            'content-type': 'multipart/form-data'
          }
        };

        await axios.post('http://localhost:8080/api/employees', formData, config);
      }

      // reset the state on the parent component
      setFormSubmit(prevSubmit => !prevSubmit);
      // close modal
      toggleModal(prevToggle => !prevToggle);
    } catch (error) {
      console.log(error)
    }

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
        <Label for="photo">File</Label>
        <Input
          type="file"
          name="photo"
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