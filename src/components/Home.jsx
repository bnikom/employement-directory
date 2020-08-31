import React, { useEffect, useState } from 'react';
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
  const [formSubmitted, setFormSubmit] = useState(false);

  // fetch employees on initial page load and when you submit a form
  useEffect(() => {
    dispatch(fetchAllEmployees());
  }, [formSubmitted, dispatch]);

  // show spinning wheel if no data
  if (isEmpty(employees.data)) {
    return <ReactLoading type={'spin'} color={'#0000'} height={667} width={375} />
  }

  const {
    count,
    employees: totalEmployees,
  } = employees.data;

  // fetch employees when from search query
  const handleSearch = async () => {
    await dispatch(fetchAllEmployees(search));
  }

  return (
    <Container>
      <Row>
        <Col xs={8}>
          <FormGroup>
            <Label className="sr-only" for="employeeSearch">Search directory by department, name, email or title</Label>
            <Input
              type="search"
              name="employeeSearch"
              placeholder="Search directory by department, name, email or title"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </FormGroup>
        </Col>
        <Col xs={4}>
          <Button outline color="secondary" className="w-100" onClick={() => handleSearch()}>Search</Button>
        </Col>
      </Row>
      <Row>
        <Col xs={{ size: 4, offset: 8 }}>
          <Button className="w-100" onClick={() => toggleModal(!isModalOpen)}>Add Employee</Button>
        </Col>
      </Row>
      <Modal isOpen={isModalOpen} toggle={() => toggleModal(!isModalOpen)}>
        <AddEmployee
          setFormSubmit={setFormSubmit}
          toggleModal={toggleModal}
        />
      </Modal>
      <hr />
      <p>Total Employees: {count}</p>
      <Row>
        {totalEmployees.map(({
          _id,
          dob,
          department,
          email,
          imageUrl,
          name,
          phone,
          title,
        }) => (
            <Col sm={12} md={6} lg={4} key={_id} className="d-flex justify-content-center mb-3">
              <Link to={`/employee/${_id}`}>
                <EmployeeCard
                  date={dob.replace('T00:00:00.000Z', '')}
                  department={department}
                  email={email}
                  photo={imageUrl}
                  name={name}
                  phone={phone}
                  title={title}
                />
              </Link>
            </Col>
          ))}
      </Row>
    </Container>
  );
}

export default Home;