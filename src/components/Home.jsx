import React, { useEffect, useState, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchAllEmployees } from '../actions/employee.actions';
import { isEmpty } from 'lodash';
import { Container, Button, Modal, Row, Col } from 'reactstrap';
import ReactLoading from 'react-loading';

import AddEmployee from './AddEmployee';
import EmployeeCard from './EmployeeCard';

const Home = () => {
  const dispatch = useDispatch();
  const employees = useSelector(state => state.employees);
  const [isModalOpen, toggleModal] = useState(false);

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

  return (
    <Container>
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
            <Col xs={6} key={_id}>
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