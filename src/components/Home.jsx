import React, { useEffect, useState, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchAllEmployees } from '../actions/employee.actions';
import { isEmpty } from 'lodash';
import { Container, Button, Modal, Row, Col, FormGroup, Label, Input } from 'reactstrap';
import ReactLoading from 'react-loading';

import AddEmployee from './AddEmployee';
import EmployeeCard from './EmployeeCard';

const Home = () => {
  const dispatch = useDispatch();
  const employees = useSelector(state => state.employees);
  const [isModalOpen, toggleModal] = useState(false);
  const [search, setSearch] = useState('');

  useEffect(() => {
    dispatch(fetchAllEmployees());
  }, []);

  if (isEmpty(employees.data)) {
    return <ReactLoading type={'spin'} color={'#0000'} height={667} width={375} />
  }

  const {
    count,
    employees: totalEmployees,
  } = employees.data;

  const handleSearch = async () => {
    await dispatch(fetchAllEmployees(search));
  }

  return (
    <Container>
      <Row>
        <Col xs={9}>
          <FormGroup>
            <Label for="employeeSearch" className="sr-only">Search directory by department, name, email or title</Label>
            <Input
              type="search"
              name="employeeSearch"
              placeholder="Search directory by department, name, email or title"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </FormGroup>
        </Col>
        <Col xs={3}>
          <Button onClick={() => handleSearch()}>Search</Button>
        </Col>
      </Row>
      <Button onClick={() => toggleModal(!isModalOpen)}>Add Employee</Button>
      <Modal isOpen={isModalOpen} toggle={() => toggleModal(!isModalOpen)}>
        <AddEmployee />
      </Modal>
      <hr />
      <p>Total Employees: {count}</p>
      <Row>
        {totalEmployees.map(({
          _id,
          name,
          dob,
          department,
          title,
          phone,
          email,
          imageUrl
        }) => (
            <Col xs={6} key={_id} className="d-flex justify-content-center">
              <Link to={`/employee/${_id}`}>
                <EmployeeCard
                  name={name}
                  date={dob}
                  department={department}
                  title={title}
                  email={email}
                  phone={phone}
                  imageUrl={imageUrl}
                />
              </Link>
            </Col>
          ))}
      </Row>
    </Container>
  );
}

export default Home;